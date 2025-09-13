import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: session.user?.email, // 使用email作为id
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
        provider: session.provider
      }
    })
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    if (!process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET) as any
      
      // 返回完整的用户信息，确保包含provider信息
      const userInfo = {
        id: decoded.userId || decoded.email,
        name: decoded.name,
        email: decoded.email,
        image: decoded.image,
        provider: decoded.provider
      }
      
      return NextResponse.json({ 
        valid: true, 
        user: userInfo 
      })
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
