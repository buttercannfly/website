import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin, User } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

    // 返回用户信息（不包含敏感数据）
    const userInfo = {
      id: user.id,
      email: user.email,
      type: user.type,
      credits: user.credits,
      createdAt: user.created_at
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
    const { type } = body

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

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
