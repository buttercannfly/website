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

// 检查用户 remaining balance（不扣除）
async function checkUserRemaining(userEmail: string, requiredAmount: number = 1) {
  try {
    // 获取当前用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('remaining')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      console.error('Error fetching user for remaining check:', userError)
      throw new Error('User not found')
    }

    const currentRemaining = user.remaining || 0

    if (currentRemaining < requiredAmount) {
      throw new Error('Insufficient balance')
    }

    return {
      success: true,
      currentRemaining: currentRemaining,
      requiredAmount: requiredAmount,
      sufficient: true
    }
  } catch (error) {
    console.error('Error checking user remaining:', error)
    throw error
  }
}

// 扣除用户 remaining balance
async function consumeUserRemaining(userEmail: string, amount: number = 1) {
  try {
    // 获取当前用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('remaining')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      console.error('Error fetching user for remaining consumption:', userError)
      throw new Error('User not found')
    }

    const currentRemaining = user.remaining || 0

    if (currentRemaining <= 0) {
      throw new Error('Insufficient balance')
    }

    // 计算新的remaining值，确保不小于0
    const newRemaining = Math.max(0, currentRemaining - amount)

    // 更新数据库
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ remaining: newRemaining })
      .eq('email', userEmail)
      .select('remaining')
      .single()

    if (updateError) {
      console.error('Error updating remaining:', updateError)
      throw new Error('Failed to update remaining balance')
    }

    console.log(`[Remaining Consumption] User ${userEmail}: ${currentRemaining} -> ${newRemaining} (consumed ${amount})`)
    return {
      success: true,
      previousRemaining: currentRemaining,
      newRemaining: newRemaining,
      consumed: amount
    }
  } catch (error) {
    console.error('Error consuming user remaining:', error)
    throw error
  }
}

// OpenRouter模型定价配置 (每M token的费用)
const OPENROUTER_PRICING: Record<string, { input: number; output: number }> = {
  // Anthropic Claude 模型
  'anthropic/claude-3.5-haiku': { input: 0.96, output: 4.80 },
  'anthropic/claude-3.5-sonnet': { input: 3.60, output: 18.00 },
  'anthropic/claude-3.7-sonnet': { input: 3.60, output: 18.00 },
  'anthropic/claude-sonnet-4': { input: 3.60, output: 18.00 },
  'anthropic/claude-3-haiku': { input: 0.30, output: 1.50 },
  // DeepSeek 模型
  'deepseek/deepseek-chat-v3.1': { input: 0.30, output: 1.20 },
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
              
              // 扣除remaining余额（使用实际计算的cost）
              if (userEmail && cost && cost > 0) {
                try {
                  const remainingResult = await consumeUserRemaining(userEmail, cost)
                  console.log(`[Remaining Deduction] User ${userEmail} consumed ${cost} remaining balance:`, remainingResult)
                } catch (remainingError) {
                  console.error(`[Remaining Deduction] Failed to deduct remaining for user ${userEmail}:`, remainingError)
                  // 不抛出错误，避免影响响应
                }
              }
            } else {
              // 如果不是OpenRouter模型或无法计算cost，使用默认cost 1
              const defaultCost = 1
              if (userEmail) {
                try {
                  const remainingResult = await consumeUserRemaining(userEmail, defaultCost)
                  console.log(`[Remaining Deduction] User ${userEmail} consumed default ${defaultCost} remaining balance:`, remainingResult)
                } catch (remainingError) {
                  console.error(`[Remaining Deduction] Failed to deduct remaining for user ${userEmail}:`, remainingError)
                  // 不抛出错误，避免影响响应
                }
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
    stream: originalBody.stream !== undefined ? originalBody.stream : true
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
        userId: 12,
        email: '1710085142@qq.com',
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

    // 在AI请求开始前检查用户余额
    if (!isLocalDevelopment()) {
      try {
        // 预估cost，对于OpenRouter模型使用最低预估，对于其他模型使用默认值1
        const estimatedCost = model && isOpenRouterModel(model) ? 0.01 : 1
        await checkUserRemaining(user.email, estimatedCost)
        console.log(`[AI API] User ${user.email} has sufficient remaining balance for estimated cost ${estimatedCost}`)
      } catch (balanceError) {
        console.error(`[AI API] Insufficient balance for user ${user.email}:`, balanceError)
        const errorMessage = balanceError instanceof Error ? balanceError.message : String(balanceError)
        
        if (errorMessage.includes('Insufficient balance')) {
          return NextResponse.json({ 
            error: 'Insufficient balance',
            message: 'Your balance is insufficient, please top up and try again',
            code: 'INSUFFICIENT_BALANCE'
          }, { status: 400 })
        }
        
        // 其他错误也返回错误响应，避免继续处理
        return NextResponse.json({ 
          error: 'Balance check failed',
          message: 'Unable to verify user balance',
          code: 'BALANCE_CHECK_ERROR'
        }, { status: 500 })
      }
    }

    // 本地开发环境跳过remaining检查，生产环境在请求完成后扣除
    let creditConsumptionResult = null
    if (isLocalDevelopment()) {
      // 本地开发环境模拟remaining消费结果
      creditConsumptionResult = {
        success: true,
        previousRemaining: 1000,
        newRemaining: 999,
        consumed: 1
      }
      console.log(`[AI API] Local development mode - skipping credit consumption, simulating result:`, creditConsumptionResult)
    } else {
      console.log(`[AI API] Will consume remaining balance after AI request completion`)
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
          'X-User-Remaining': creditConsumptionResult?.newRemaining?.toString() || '0',
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
      let actualCost = null
      if (model && isOpenRouterModel(model) && data.usage) {
        const cost = calculateOpenRouterCost(model, data.usage.prompt_tokens, data.usage.completion_tokens)
        if (cost !== null) {
          actualCost = cost
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
      
      // 扣除remaining余额
      // if (!isLocalDevelopment()) {
        const costToDeduct = actualCost || 1 // 使用实际计算的cost，如果没有则使用默认值1
        try {
          const remainingResult = await consumeUserRemaining(user.email, costToDeduct)
          console.log(`[Remaining Deduction] User ${user.email} consumed ${costToDeduct} remaining balance:`, remainingResult)
          creditConsumptionResult = remainingResult
        } catch (remainingError) {
          console.error(`[Remaining Deduction] Failed to deduct remaining for user ${user.email}:`, remainingError)
          const errorMessage = remainingError instanceof Error ? remainingError.message : String(remainingError)
          
          if (errorMessage.includes('Insufficient balance')) {
            return NextResponse.json({ 
              error: 'Insufficient balance',
              message: 'Your balance is insufficient, please top up and try again',
              code: 'INSUFFICIENT_BALANCE'
            }, { status: 400 })
          }
          
          // 其他错误不影响响应，但记录日志
          console.error('Failed to deduct remaining but continuing with response')
        }
      // }
      
      return NextResponse.json({
        ...data,
        _metadata: {
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString(),
          credits: {
            consumed: creditConsumptionResult?.consumed || 0,
            remaining: creditConsumptionResult?.newRemaining || 0
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
