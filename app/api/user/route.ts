import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin, User } from '@/lib/supabase'

// 更新用户remaining字段的通用函数
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

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 从URL参数获取cost，默认为1
    const url = new URL(request.url)
    const cost = parseFloat(url.searchParams.get('cost') || '1')

    // 从Supabase获取用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single()

    if (userError || !user) {
      console.error('Error fetching user:', userError)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 更新remaining字段
    try {
      const remainingUpdate = await updateUserRemaining(session.user.email, cost)
      console.log('Remaining updated successfully:', remainingUpdate)
    } catch (remainingError) {
      console.error('Error updating remaining:', remainingError)
      const errorMessage = remainingError instanceof Error ? remainingError.message : String(remainingError)
      
      if (errorMessage.includes('余额不足')) {
        return NextResponse.json({ 
          error: '余额不足',
          message: '您的余额不足，请充值后再试',
          code: 'INSUFFICIENT_BALANCE'
        }, { status: 400 })
      }
      
      // 其他错误不影响用户信息返回，但记录日志
      console.error('Failed to update remaining but continuing with user info response')
    }

    // 获取更新后的用户信息
    const { data: updatedUser, error: updatedUserError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single()

    if (updatedUserError || !updatedUser) {
      console.error('Error fetching updated user:', updatedUserError)
      // 如果获取更新后的用户信息失败，使用原始用户信息
    }

    const currentUser = updatedUser || user

    // 返回用户信息（不包含敏感数据）
    const userInfo = {
      id: currentUser.id,
      email: currentUser.email,
      type: currentUser.type,
      credits: currentUser.credits,
      remaining: currentUser.remaining,
      createdAt: currentUser.created_at
    }

    return NextResponse.json(userInfo)
  } catch (error) {
    console.error('Error fetching user info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, cost } = body

    // 更新用户类型
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ type })
      .eq('email', session.user.email)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating user:', updateError)
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }

    // 如果提供了cost参数，更新remaining字段
    if (cost !== undefined && cost > 0) {
      try {
        const remainingUpdate = await updateUserRemaining(session.user.email, cost)
        console.log('Remaining updated successfully in PUT:', remainingUpdate)
      } catch (remainingError) {
        console.error('Error updating remaining in PUT:', remainingError)
        const errorMessage = remainingError instanceof Error ? remainingError.message : String(remainingError)
        
        if (errorMessage.includes('余额不足')) {
          return NextResponse.json({ 
            error: '余额不足',
            message: '您的余额不足，请充值后再试',
            code: 'INSUFFICIENT_BALANCE'
          }, { status: 400 })
        }
      }
    }

    // 获取最终的用户信息
    const { data: finalUser, error: finalUserError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single()

    if (finalUserError || !finalUser) {
      console.error('Error fetching final user info:', finalUserError)
      // 如果获取最终用户信息失败，使用更新后的用户信息
      return NextResponse.json(updatedUser)
    }

    return NextResponse.json(finalUser)
  } catch (error) {
    console.error('Error updating user info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
