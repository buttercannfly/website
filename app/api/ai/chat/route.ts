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

  const response = await fetch(aiHost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${aiToken}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`AI API error: ${errorText}`)
  }

  return response
}

export async function POST(req: NextRequest) {
  try {
    // 验证用户身份
    const user = await verifyToken(req.headers.get('authorization'))
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 解析请求体
    const body = await req.json()
    const { messages, model, stream = true } = body

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

    // 如果请求流式响应，直接转发响应
    if (stream) {
      return new NextResponse(aiResponse.body, {
        status: aiResponse.status,
        statusText: aiResponse.statusText,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      })
    } else {
      // 非流式响应，解析 JSON
      const data = await aiResponse.json()
      return NextResponse.json(data)
    }

  } catch (error) {
    console.error('AI chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
