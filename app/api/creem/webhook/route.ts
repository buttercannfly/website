import { NextRequest, NextResponse } from 'next/server'
import { creemClient, CreemWebhookPayload } from '@/lib/creem'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-creem-signature') || ''

    // 验证Webhook签名
    console.log('Verifying webhook signature...')
    console.log('Signature from header:', signature)
    console.log('Body length:', body.length)
    
    if (!creemClient.verifyWebhookSignature(body, signature)) {
      console.error('Invalid Creem webhook signature')
      console.error('Expected signature format: sha256=<hex_string>')
      console.error('Received signature:', signature)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    
    console.log('Webhook signature verified successfully')

    const payload: CreemWebhookPayload = JSON.parse(body)

    console.log('Creem webhook received:', payload)

    // 处理不同类型的Webhook事件
    switch (payload.event) {
      case 'payment.completed':
        await handlePaymentCompleted(payload)
        break
      case 'payment.failed':
        await handlePaymentFailed(payload)
        break
      case 'payment.cancelled':
        await handlePaymentCancelled(payload)
        break
      default:
        console.log('Unhandled webhook event:', payload.event)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Creem webhook error:', error)
    return NextResponse.json({ 
      error: 'Webhook processing failed' 
    }, { status: 500 })
  }
}

/**
 * 处理支付成功事件
 */
async function handlePaymentCompleted(payload: CreemWebhookPayload) {
  try {
    const { userId, productId, paymentId, amount } = payload

    // 根据产品ID获取积分数量
    const creditsToAdd = getCreditsForProduct(productId)
    if (creditsToAdd <= 0) {
      console.error('Invalid product ID for credits:', productId)
      return
    }

    // 获取用户信息（包括ID）
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, credits')
      .eq('email', userId)
      .single()

    if (userError || !user) {
      console.error('User not found for payment completion:', userId)
      return
    }

    // 检查是否已经处理过这个支付（防止重复处理）
    const { data: existingPayment } = await supabaseAdmin
      .from('payments')
      .select('id')
      .eq('payment_id', paymentId)
      .single()

    if (existingPayment) {
      console.log(`Payment ${paymentId} already processed, skipping...`)
      return
    }

    // 开始数据库事务
    // 1. 更新用户积分
    const currentCredits = user.credits || 0
    const newCredits = currentCredits + creditsToAdd

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits: newCredits })
      .eq('email', userId)

    if (updateError) {
      console.error('Failed to update credits after payment:', updateError)
      return
    }

    // 2. 记录支付信息
    const { error: paymentRecordError } = await supabaseAdmin
      .from('payments')
      .insert({
        user_id: user.id,
        credits: creditsToAdd,
        payment_id: paymentId,
        verified: true
      })

    if (paymentRecordError) {
      console.error('Failed to record payment:', paymentRecordError)
      // 如果记录支付失败，可以考虑回滚credits更新
      // 这里为了简单起见，只记录错误
    }

    console.log(`Successfully processed payment ${paymentId}:`)
    console.log(`- User: ${userId} (ID: ${user.id})`)
    console.log(`- Credits added: ${creditsToAdd}`)
    console.log(`- Previous credits: ${currentCredits}`)
    console.log(`- New total credits: ${newCredits}`)
    console.log(`- Amount: $${amount}`)

  } catch (error) {
    console.error('Error handling payment completion:', error)
  }
}

/**
 * 处理支付失败事件
 */
async function handlePaymentFailed(payload: CreemWebhookPayload) {
  try {
    const { userId, paymentId } = payload
    
    console.log('Payment failed for user:', userId, 'Payment ID:', paymentId)
    
    // 获取用户信息
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', userId)
      .single()

    if (user) {
      // 记录失败的支付（用于统计和分析）
      await supabaseAdmin
        .from('payments')
        .insert({
          user_id: user.id,
          credits: 0, // 失败支付没有credits
          payment_id: paymentId,
          verified: false // 标记为未验证/失败
        })
    }
    
    // 这里可以添加其他失败处理逻辑
    // 比如发送失败通知邮件、记录失败原因等
    
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

/**
 * 处理支付取消事件
 */
async function handlePaymentCancelled(payload: CreemWebhookPayload) {
  try {
    const { userId, paymentId } = payload
    
    console.log('Payment cancelled for user:', userId, 'Payment ID:', paymentId)
    
    // 获取用户信息
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', userId)
      .single()

    if (user) {
      // 记录取消的支付
      await supabaseAdmin
        .from('payments')
        .insert({
          user_id: user.id,
          credits: 0, // 取消支付没有credits
          payment_id: paymentId,
          verified: false // 标记为未验证/取消
        })
    }
    
    // 这里可以添加其他取消处理逻辑
    
  } catch (error) {
    console.error('Error handling payment cancellation:', error)
  }
}

/**
 * 根据产品ID获取对应的积分数量
 */
function getCreditsForProduct(productId: string): number {
  const productMap: Record<string, number> = {
    'aipex': 10, // AIPex Credits 包
    'prod_3Y5uBhxL8Gu76Ts2tODWbs': 10 // Creem 产品ID对应的积分数量
  }
  
  return productMap[productId] || 0
}
