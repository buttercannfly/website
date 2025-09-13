import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin, CreditsData } from '@/lib/supabase'

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

    // 检查是否需要每日刷新免费credits
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD格式
    const lastRefreshDate = user.last_refresh_date || user.created_at?.split('T')[0]
    
    let totalCredits = user.credits || 0
    let nextRefreshDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    // 如果今天还没有刷新过，则刷新免费credits
    if (lastRefreshDate !== today) {
      // 计算免费credits（总credits减去购买的credits）
      const purchasedCredits = Math.max(0, totalCredits - 5) // 假设免费credits是5个
      const newTotalCredits = purchasedCredits + 5 // 重置为5个免费credits + 购买的credits
      
      // 更新数据库
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ 
          credits: newTotalCredits,
          last_refresh_date: today
        })
        .eq('email', session.user.email)
      
      if (updateError) {
        console.error('Error updating daily refresh:', updateError)
      } else {
        totalCredits = newTotalCredits
        console.log(`Daily refresh completed for user ${session.user.email}. New credits: ${totalCredits}`)
      }
    }

    return NextResponse.json({
      total: totalCredits,
      nextRefreshDate: nextRefreshDate
    })
  } catch (error) {
    console.error('Error fetching credits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { amount } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // 获取当前用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single()

    if (userError || !user) {
      console.error('Error fetching user:', userError)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 更新用户的credits
    const currentCredits = user.credits || 0
    const newTotalCredits = currentCredits + amount

    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits: newTotalCredits })
      .eq('email', session.user.email)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
    }

    // 返回更新后的总credits
    return NextResponse.json({
      total: newTotalCredits
    })
  } catch (error) {
    console.error('Error purchasing credits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

