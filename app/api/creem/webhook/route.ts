import { NextRequest, NextResponse } from 'next/server'
import { creemClient, CreemWebhookPayload } from '@/lib/creem'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-creem-signature') || ''

    // 验证Webhook签名
    if (!creemClient.verifyWebhookSignature(body, signature)) {
      console.error('Invalid Creem webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

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
    const { userId, productId } = payload

    // 根据产品ID获取积分数量
    const creditsToAdd = getCreditsForProduct(productId)
    if (creditsToAdd <= 0) {
      console.error('Invalid product ID for credits:', productId)
      return
    }

    // 获取用户当前积分
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('credits')
      .eq('email', userId)
      .single()

    if (userError || !user) {
      console.error('User not found for payment completion:', userId)
      return
    }

    // 更新用户积分
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

    console.log(`Successfully added ${creditsToAdd} credits to user ${userId}. New total: ${newCredits}`)

    // 这里可以添加其他逻辑，比如发送确认邮件、记录交易历史等

  } catch (error) {
    console.error('Error handling payment completion:', error)
  }
}

/**
 * 处理支付失败事件
 */
async function handlePaymentFailed(payload: CreemWebhookPayload) {
  console.log('Payment failed for user:', payload.userId, 'Payment ID:', payload.paymentId)
  
  // 这里可以添加支付失败的处理逻辑
  // 比如发送失败通知邮件、记录失败原因等
}

/**
 * 处理支付取消事件
 */
async function handlePaymentCancelled(payload: CreemWebhookPayload) {
  console.log('Payment cancelled for user:', payload.userId, 'Payment ID:', payload.paymentId)
  
  // 这里可以添加支付取消的处理逻辑
}

/**
 * 根据产品ID获取对应的积分数量
 */
function getCreditsForProduct(productId: string): number {
  const productMap: Record<string, number> = {
    'aipex': 100 // 根据您的需求调整积分数量
  }
  
  return productMap[productId] || 0
}
