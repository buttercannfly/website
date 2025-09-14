import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

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

// 调用外部 AI API
async function callExternalAI(messages: any[], model: string = 'deepseek-chat') {
  const aiHost = process.env.AI_HOST || 'https://api.deepseek.com/chat/completions'
  const aiToken = process.env.AI_TOKEN || 'sk-b675935eaa034e27bbd388b806f52a39'

  const requestBody = {
    model,
    messages,
    stream: true
  }

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

export async function POST(req: NextRequest) {
  let stream = true // 默认值
  const startTime = Date.now()
  
  try {
    // 验证用户身份
    const user = await verifyToken(req.headers.get('authorization'))
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 解析请求体
    const body = await req.json()
    const { messages, model, stream: requestStream = true } = body
    stream = requestStream

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
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

    console.log(`[AI API] Starting request for user ${user.userId}, model: ${model}, messages: ${messages.length}`)

    // 调用外部 AI API
    const aiResponse = await callExternalAI(conversationMessages, model)

    // 如果请求流式响应，直接转发响应
    if (stream) {
      const responseTime = Date.now() - startTime
      console.log(`[AI API] Response received in ${responseTime}ms, forwarding stream`)
      
      return new NextResponse(aiResponse.body, {
        status: aiResponse.status,
        statusText: aiResponse.statusText,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'X-Response-Time': `${responseTime}ms`
        }
      })
    } else {
      // 非流式响应，解析 JSON
      const data = await aiResponse.json()
      const responseTime = Date.now() - startTime
      console.log(`[AI API] Non-streaming response completed in ${responseTime}ms`)
      
      return NextResponse.json({
        ...data,
        _metadata: {
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString()
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
