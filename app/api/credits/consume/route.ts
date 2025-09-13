import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

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

    const currentCredits = user.credits || 0

    if (currentCredits < amount) {
      return NextResponse.json({ 
        error: 'Insufficient credits',
        currentCredits,
        requiredCredits: amount
      }, { status: 400 })
    }

    // 扣除credits
    const newCredits = currentCredits - amount

    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits: newCredits })
      .eq('email', session.user.email)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      total: newCredits,
      message: `Successfully consumed ${amount} credits`
    })
  } catch (error) {
    console.error('Error consuming credits:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
