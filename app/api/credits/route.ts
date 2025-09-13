import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 模拟用户 credits 数据
    // 在实际应用中，这里应该从数据库获取真实的用户 credits 数据
    const credits = {
      total: 1000,
      used: Math.floor(Math.random() * 200), // 随机生成已使用的 credits
      remaining: 0,
      lastUpdated: new Date().toISOString()
    }
    
    credits.remaining = credits.total - credits.used

    return NextResponse.json(credits)
  } catch (error) {
    console.error('Error fetching credits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { amount } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // 模拟购买 credits
    // 在实际应用中，这里应该处理支付逻辑并更新数据库
    const newCredits = {
      total: 1000 + amount,
      used: Math.floor(Math.random() * 200),
      remaining: 0,
      lastUpdated: new Date().toISOString()
    }
    
    newCredits.remaining = newCredits.total - newCredits.used

    return NextResponse.json(newCredits)
  } catch (error) {
    console.error('Error purchasing credits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

