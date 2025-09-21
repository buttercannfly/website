import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

// 更新用户remaining字段
async function updateUserRemaining(userEmail: string, cost: number = 1) {
  try {
    // 获取当前用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('remaining')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      console.error('Error fetching user for remaining update:', userError)
      throw new Error('User not found')
    }

    const currentRemaining = user.remaining || 0

    // 检查余额是否足够
    if (currentRemaining <= 0) {
      throw new Error('余额不足')
    }

    // 计算新的remaining值，确保不小于0
    const newRemaining = Math.max(0, currentRemaining - cost)

    // 更新数据库
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ remaining: newRemaining })
      .eq('email', userEmail)

    if (updateError) {
      console.error('Error updating remaining:', updateError)
      throw new Error('Failed to update remaining balance')
    }

    console.log(`[Remaining Update] User ${userEmail}: ${currentRemaining} -> ${newRemaining} (cost: ${cost})`)
    return {
      success: true,
      previousRemaining: currentRemaining,
      newRemaining: newRemaining,
      cost: cost
    }
  } catch (error) {
    console.error('Error updating user remaining:', error)
    throw error
  }
}

// GET - 获取用户remaining余额
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 从Supabase获取用户remaining信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('remaining')
      .eq('email', session.user.email)
      .single()

    if (userError || !user) {
      console.error('Error fetching user remaining:', userError)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      remaining: user.remaining || 0
    })
  } catch (error) {
    console.error('Error fetching remaining balance:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - 更新用户remaining字段（消费余额）
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { cost = 1 } = body

    if (cost <= 0) {
      return NextResponse.json({ error: 'Invalid cost amount' }, { status: 400 })
    }

    // 更新remaining字段
    const result = await updateUserRemaining(session.user.email, cost)

    return NextResponse.json({
      message: `Successfully consumed ${cost} from remaining balance`,
      ...result
    })
  } catch (error) {
    console.error('Error consuming remaining balance:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    if (errorMessage.includes('余额不足')) {
      return NextResponse.json({ 
        error: '余额不足',
        message: '您的余额不足，请充值后再试',
        code: 'INSUFFICIENT_BALANCE'
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to update remaining balance',
      message: '更新余额时发生错误',
      code: 'UPDATE_ERROR'
    }, { status: 500 })
  }
}

// PUT - 重置或设置用户remaining字段
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { remaining } = body

    if (remaining === undefined || remaining < 0) {
      return NextResponse.json({ error: 'Invalid remaining amount' }, { status: 400 })
    }

    // 更新数据库
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ remaining })
      .eq('email', session.user.email)
      .select('remaining')
      .single()

    if (updateError) {
      console.error('Error updating remaining:', updateError)
      return NextResponse.json({ error: 'Failed to update remaining balance' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully updated remaining balance to ${remaining}`,
      remaining: updatedUser.remaining
    })
  } catch (error) {
    console.error('Error updating remaining balance:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
