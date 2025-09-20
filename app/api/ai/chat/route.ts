import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '@/lib/supabase'

// 生成调试用的curl命令
function generateCurlCommand(url: string, token: string, body: any): string {
  const escapedBody = JSON.stringify(body).replace(/"/g, '\\"')
  return `curl -X POST "${url}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d "${escapedBody}"`
}

// 验证 JWT token
async function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Server configuration error')
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET) as any
    return {
      userId: decoded.userId || decoded.email,
      email: decoded.email,
      provider: decoded.provider
    }
  } catch (jwtError) {
    console.error('JWT verification failed:', jwtError)
    return null
  }
}

// 记录usage信息到数据库
async function recordUsage(userEmail: string, promptTokens: number, completionTokens: number, model: string, cost: number | null) {
  try {
    // 获取用户ID
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      console.error('Error fetching user for usage recording:', userError)
      throw new Error('User not found')
    }

    // 插入usage记录
    const { data: usageRecord, error: usageError } = await supabaseAdmin
      .from('usage')
      .insert({
        user_id: user.id,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        model: model,
        cost: cost
      })
      .select()

    if (usageError) {
      console.error('Error recording usage:', usageError)
      throw new Error('Failed to record usage')
    }

    console.log(`[Usage Recording] Recorded usage for user ${userEmail}:`, {
      user_id: user.id,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      model: model,
      cost: cost
    })

    return usageRecord
  } catch (error) {
    console.error('Error recording usage:', error)
    // 不抛出错误，避免影响主要的AI调用流程
  }
}

// 扣除用户 credit
async function consumeUserCredit(userEmail: string, amount: number = 1) {
  try {
    // 获取当前用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      console.error('Error fetching user for credit consumption:', userError)
      throw new Error('User not found')
    }

    const currentCredits = user.credits || 0

    if (currentCredits < amount) {
      throw new Error(`Insufficient credits. Current: ${currentCredits}, Required: ${amount}`)
    }

    // 扣除credits
    const newCredits = currentCredits - amount

    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits: newCredits })
      .eq('email', userEmail)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating credits:', updateError)
      throw new Error('Failed to update credits')
    }

    console.log(`[Credit Consumption] User ${userEmail}: ${currentCredits} -> ${newCredits} (consumed ${amount})`)
    return {
      success: true,
      previousCredits: currentCredits,
      newCredits: newCredits,
      consumed: amount
    }
  } catch (error) {
    console.error('Error consuming user credit:', error)
    throw error
  }
}

// OpenRouter模型定价配置 (每M token的费用)
const OPENROUTER_PRICING: Record<string, { input: number; output: number }> = {
  // Anthropic Claude 模型
  'anthropic/claude-3.5-haiku': { input: 0.80, output: 4.00 },
  'anthropic/claude-3.5-sonnet': { input: 3.00, output: 15.00 },
  'anthropic/claude-3.7-sonnet': { input: 3.00, output: 15.00 },
  'anthropic/claude-sonnet-4': { input: 3.00, output: 15.00 },
  'anthropic/claude-3-haiku': { input: 0.25, output: 1.25 },
  // DeepSeek 模型
  'deepseek/deepseek-chat-v3.1': { input: 0.25, output: 1 },
  }

// 检查是否为OpenRouter模型名称
function isOpenRouterModel(modelName: string): boolean {
  // OpenRouter模型名称经典格式是包含斜杠，如 "deepseek/deepseek-chat-v3.1"
  return modelName.includes('/')
}

// 计算OpenRouter模型费用
function calculateOpenRouterCost(modelName: string, promptTokens: number, completionTokens: number): number | null {
  const pricing = OPENROUTER_PRICING[modelName]
  if (!pricing) {
    return null // 模型不在定价列表中
  }
  
  // 将token数转换为M token (除以1,000,000)
  const promptTokensM = promptTokens / 1000000
  const completionTokensM = completionTokens / 1000000
  
  // 计算费用
  const inputCost = promptTokensM * pricing.input
  const outputCost = completionTokensM * pricing.output
  const totalCost = inputCost + outputCost
  
  return Math.round(totalCost * 10000) / 10000 // 保留4位小数
}

// 处理流式响应并提取费用信息（仅用于控制台打印和数据库记录）
async function processStreamWithCostTracking(aiResponse: Response, modelName?: string, userEmail?: string) {
  if (!aiResponse.body) {
    throw new Error('No response body available')
  }
  
  const reader = aiResponse.body.getReader()

  const decoder = new TextDecoder()
  let promptTokens = 0
  let completionTokens = 0
  let totalTokens = 0
  let cost: number | null = null

  const stream = new ReadableStream({
    start(controller) {
      async function pump(): Promise<void> {
        return reader.read().then(async ({ done, value }) => {
          if (done) {
            // 流结束时，如果检测到OpenRouter模型，计算费用并记录到数据库
            if (modelName && isOpenRouterModel(modelName) && promptTokens > 0 && completionTokens > 0) {
              cost = calculateOpenRouterCost(modelName, promptTokens, completionTokens)
              console.log(`[Cost Tracking] Model: ${modelName}, Prompt: ${promptTokens}, Completion: ${completionTokens}, Cost: $${cost}`)
              
              // 记录usage信息到数据库
              if (userEmail) {
                await recordUsage(userEmail, promptTokens, completionTokens, modelName, cost)
              }
            }
            
            controller.close()
            return
          }

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                
                // 提取usage信息（仅用于费用计算，不修改响应）
                if (data.usage) {
                  promptTokens = data.usage.prompt_tokens || 0
                  completionTokens = data.usage.completion_tokens || 0
                  totalTokens = data.usage.total_tokens || 0
                }
              } catch (e) {
                // 忽略JSON解析错误，继续处理其他数据
              }
            }
            
            // 转发所有原始数据（包括usage数据块）
            controller.enqueue(new TextEncoder().encode(line + '\n'))
          }

          return pump()
        })
      }

      return pump()
    }
  })

  return stream
}

// 调用外部 AI API
async function callExternalAI(messages: any[], model?: string, originalBody?: any) {
  const aiHost = process.env.AI_HOST
  const aiToken = process.env.AI_TOKEN
  const defaultModel = process.env.AI_MODEL

  // 检查必需的环境变量
  if (!aiHost) {
    throw new Error('AI_HOST environment variable is not set')
  }
  if (!aiToken) {
    throw new Error('AI_TOKEN environment variable is not set')
  }
  if (!defaultModel) {
    throw new Error('AI_MODEL environment variable is not set')
  }

  // 确定最终使用的模型
  let finalModel: string
  if (!model) {
    // 如果没有提供模型，使用默认模型
    finalModel = defaultModel
    console.log(`[AI API] No model provided, using default model: ${finalModel}`)
  } else if (isOpenRouterModel(model)) {
    // 如果是OpenRouter模型，使用用户指定的模型
    finalModel = model
    console.log(`[AI API] Using OpenRouter model: ${finalModel}`)
  } else {
    // 如果不是OpenRouter模型，使用默认模型
    finalModel = defaultModel
    console.log(`[AI API] Model "${model}" is not an OpenRouter model, falling back to default: ${finalModel}`)
  }

  // 合并原始请求体和新的字段，只更新 model 字段
  const requestBody = {
    ...originalBody,
    model: finalModel,
    messages,
    stream: true
  }

  // 生成调试用的curl命令
  const curlCommand = generateCurlCommand(aiHost, aiToken, requestBody)
  console.log('\n=== AI API Request Debug Info ===')
  console.log('URL:', aiHost)
  console.log('Method: POST')
  console.log('Headers:')
  console.log('  Content-Type: application/json')
  console.log('  Authorization: Bearer ' + aiToken.substring(0, 10) + '...')
  console.log('Body:', JSON.stringify(requestBody, null, 2))
  console.log('\n=== Equivalent cURL Command ===')
  console.log(curlCommand)
  console.log('=== End Debug Info ===\n')

  // 创建 AbortController 用于超时控制
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 45000) // 45秒超时

  try {
    const response = await fetch(aiHost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiToken}`
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AI API error: ${errorText}`)
    }

    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('AI API request timed out after 45 seconds')
    }
    throw error
  }
}

// 检查是否为本地开发环境
function isLocalDevelopment(): boolean {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_LOCAL_DEV === 'true' ||
         process.env.SKIP_AUTH === 'true'
}

export async function POST(req: NextRequest) {
  let stream = true // 默认值
  const startTime = Date.now()
  
  try {
    // 本地开发环境跳过认证
    let user = null
    if (!isLocalDevelopment()) {
      // 验证用户身份
      user = await verifyToken(req.headers.get('authorization'))
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    } else {
      // 本地开发环境使用默认用户
      user = {
        userId: 'local-dev-user',
        email: 'dev@localhost',
        provider: 'local'
      }
      console.log('[AI API] Local development mode - skipping authentication')
    }

    // 解析请求体
    const body = await req.json()
    const { messages, model, stream: requestStream = true, sessionId, isFirstCall = true } = body
    stream = requestStream

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    // 模型参数是可选的，如果提供则必须是字符串
    if (model && typeof model !== 'string') {
      return NextResponse.json({ error: 'Model parameter must be a string' }, { status: 400 })
    }

    // 验证消息数量限制
    if (messages.length > 50) {
      return NextResponse.json({ error: 'Too many messages' }, { status: 400 })
    }

    // 确保消息内容被正确清理
    const conversationMessages = messages.map((msg: any) => ({
      ...msg,
      content: msg.content ? msg.content.trim() : msg.content
    }))

    console.log(`[AI API] Starting request for user ${user.userId}, model: ${model}, messages: ${messages.length}, sessionId: ${sessionId}, isFirstCall: ${isFirstCall}`)

    // 只在第一次调用时扣除用户 credit，本地开发环境跳过
    let creditConsumptionResult = null
    if (isFirstCall && !isLocalDevelopment()) {
      try {
        creditConsumptionResult = await consumeUserCredit(user.email, 1)
        console.log(`[AI API] Credit consumed successfully for user ${user.email}:`, creditConsumptionResult)
      } catch (creditError) {
        console.error(`[AI API] Failed to consume credit for user ${user.email}:`, creditError)
        const errorMessage = creditError instanceof Error ? creditError.message : String(creditError)
        
        // 如果是因为积分不足，返回特定的错误信息
        if (errorMessage.includes('Insufficient credits')) {
          return NextResponse.json({ 
            error: 'Insufficient credits',
            message: 'You do not have enough credits to use this service. Please purchase more credits.',
            code: 'INSUFFICIENT_CREDITS'
          }, { status: 400 }) // 与现有系统保持一致
        }
        
        // 其他错误返回通用错误信息
        return NextResponse.json({ 
          error: 'Credit consumption failed',
          message: 'Unable to process your request due to a credit system error.',
          code: 'CREDIT_ERROR'
        }, { status: 500 })
      }
    } else if (isLocalDevelopment()) {
      // 本地开发环境模拟credit消费结果
      creditConsumptionResult = {
        success: true,
        previousCredits: 1000,
        newCredits: 999,
        consumed: 1
      }
      console.log(`[AI API] Local development mode - skipping credit consumption, simulating result:`, creditConsumptionResult)
    } else {
      console.log(`[AI API] Skipping credit consumption for subsequent call in session ${sessionId}`)
    }

    // 调用外部 AI API
    const aiResponse = await callExternalAI(conversationMessages, model, body)

    // 如果请求流式响应，使用带费用跟踪的流处理
    if (stream) {
      const responseTime = Date.now() - startTime
      console.log(`[AI API] Response received in ${responseTime}ms, processing stream with cost tracking`)
      
      // 处理流式响应并跟踪费用
      const processedStream = await processStreamWithCostTracking(aiResponse, model, user.email)
      
      return new NextResponse(processedStream, {
        status: aiResponse.status,
        statusText: aiResponse.statusText,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'X-Response-Time': `${responseTime}ms`,
          'X-User-Credits': creditConsumptionResult?.newCredits?.toString() || '0',
          'X-Credits-Consumed': creditConsumptionResult?.consumed?.toString() || '0'
        }
      })
    } else {
      // 非流式响应，解析 JSON
      const data = await aiResponse.json()
      const responseTime = Date.now() - startTime
      console.log(`[AI API] Non-streaming response completed in ${responseTime}ms`)
      
      // 计算费用（如果是OpenRouter模型）
      let costInfo = null
      if (model && isOpenRouterModel(model) && data.usage) {
        const cost = calculateOpenRouterCost(model, data.usage.prompt_tokens, data.usage.completion_tokens)
        if (cost !== null) {
          costInfo = {
            model: model,
            usage: data.usage,
            cost: cost,
            currency: 'USD'
          }
          console.log(`[Cost Tracking] Model: ${model}, Prompt: ${data.usage.prompt_tokens}, Completion: ${data.usage.completion_tokens}, Cost: $${cost}`)
          
          // 记录usage信息到数据库
          await recordUsage(user.email, data.usage.prompt_tokens, data.usage.completion_tokens, model, cost)
        }
      }
      
      return NextResponse.json({
        ...data,
        _metadata: {
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString(),
          credits: {
            consumed: creditConsumptionResult?.consumed || 0,
            remaining: creditConsumptionResult?.newCredits || 0
          },
          ...(costInfo && { cost: costInfo })
        }
      })
    }

  } catch (error) {
    const responseTime = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    console.error(`[AI API] Error after ${responseTime}ms:`, error)
    
    // 根据错误类型返回不同的状态码
    let statusCode = 500
    if (errorMessage.includes('timed out')) {
      statusCode = 504 // Gateway Timeout
    } else if (errorMessage.includes('Unauthorized')) {
      statusCode = 401
    } else if (errorMessage.includes('Invalid')) {
      statusCode = 400
    }
    
    // 如果是流式请求，返回流式错误响应
    if (stream) {
      const errorStream = new ReadableStream({
        start(controller) {
          const errorData = {
            error: errorMessage,
            code: statusCode,
            timestamp: new Date().toISOString(),
            responseTime: `${responseTime}ms`
          }
          const streamErrorMessage = `data: ${JSON.stringify(errorData)}\n\n`
          controller.enqueue(new TextEncoder().encode(streamErrorMessage))
          controller.close()
        }
      })
      
      return new NextResponse(errorStream, {
        status: statusCode,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Response-Time': `${responseTime}ms`
        }
      })
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        code: statusCode,
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`
      }, 
      { status: statusCode }
    )
  }
}
