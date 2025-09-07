import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Generate a JWT token for the extension
    const extensionToken = jwt.sign(
      { 
        userId: session.user?.email, // 使用email作为userId
        email: session.user?.email,
        provider: session.provider
      },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: '7d' }
    )

    return NextResponse.json({ 
      token: extensionToken,
      user: {
        id: session.user?.email, // 使用email作为id
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
        provider: session.provider
      }
    })
  } catch (error) {
    console.error('Extension token generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
