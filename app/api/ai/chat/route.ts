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

  console.log('🌐 [AI-API] Calling external AI API:', aiHost)
  console.log('🌐 [AI-API] Request body:', JSON.stringify(requestBody, null, 2))

  const response = await fetch(aiHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${aiToken}`
    },
    body: JSON.stringify(requestBody)
  })

  console.log('🌐 [AI-API] Response status:', response.status)
  console.log('🌐 [AI-API] Response headers:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ [AI-API] Error response:', errorText)
    throw new Error(`AI API error: ${errorText}`)
  }

  console.log('✅ [AI-API] External AI API call successful')
  return response
}

export async function POST(req: NextRequest) {
  let stream = true // 默认值
  
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

    // 确保消息内容被正确清理
    const conversationMessages = messages.map((msg: any) => ({
      ...msg,
      content: msg.content ? msg.content.trim() : msg.content
    }))

    // 调用外部 AI API
    const aiResponse = await callExternalAI(conversationMessages, model)

    // 如果请求流式响应，手动转发流数据
    if (stream) {
      console.log('🌊 [STREAM] Starting to forward streaming response')
      
      const stream = new ReadableStream({
        start(controller) {
          const reader = aiResponse.body?.getReader()
          if (!reader) {
            console.error('❌ [STREAM] No response body reader available')
            controller.close()
            return
          }

          let chunkCount = 0
          function pump(): Promise<void> {
            if (!reader) {
              controller.close()
              return Promise.resolve()
            }
            
            return reader.read().then(({ done, value }) => {
              if (done) {
                console.log(`🌊 [STREAM] Stream completed after ${chunkCount} chunks`)
                controller.close()
                return
              }
              
              chunkCount++
              console.log(`🌊 [STREAM] Forwarding chunk ${chunkCount}, size: ${value.length}`)
              
              // 直接转发原始数据块
              controller.enqueue(value)
              return pump()
            }).catch((error) => {
              console.error('❌ [STREAM] Stream pump error:', error)
              controller.error(error)
            })
          }

          return pump()
        }
      })

      return new NextResponse(stream, {
        status: aiResponse.status,
        statusText: aiResponse.statusText,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    } else {
      // 非流式响应，解析 JSON
      const data = await aiResponse.json()
      return NextResponse.json(data)
    }

  } catch (error) {
    console.error('AI chat API error:', error)
    
    // 如果是流式请求，返回流式错误响应
    if (stream) {
      const errorStream = new ReadableStream({
        start(controller) {
          const errorMessage = `data: {"error": "Internal server error: ${error instanceof Error ? error.message : String(error)}"}\n\n`
          controller.enqueue(new TextEncoder().encode(errorMessage))
          controller.close()
        }
      })
      
      return new NextResponse(errorStream, {
        status: 500,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      })
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
