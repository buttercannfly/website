import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { creemClient } from '@/lib/creem'

interface PaymentCallbackData {
  checkout_id: string | null
  order_id: string | null
  customer_id: string | null
  product_id: string | null
  signature: string | null
  payment_status?: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const paymentData: PaymentCallbackData = await request.json()
    
    console.log('Payment callback API received:', paymentData)

    // 验证必要的参数
    if (!paymentData.checkout_id && !paymentData.order_id) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing payment identifiers' 
      }, { status: 400 })
    }

    // 验证Creem Return URL签名
    if (paymentData.signature) {
      // 构建用于签名验证的参数对象（按照官方文档要求）
      const signatureParams = {
        checkout_id: paymentData.checkout_id,
        order_id: paymentData.order_id,
        customer_id: paymentData.customer_id,
        product_id: paymentData.product_id,
        // 注意：request_id 是可选的，如果有的话也要包含
        // subscription_id 也是可选的
      }
      
      console.log('Verifying Return URL signature for params:', signatureParams)
      console.log('Received signature:', paymentData.signature)
      
      if (!creemClient.verifyReturnUrlSignature(signatureParams, paymentData.signature)) {
        console.error('Invalid Creem Return URL signature')
        return NextResponse.json({
          success: false,
          message: 'Invalid payment signature'
        }, { status: 401 })
      }
      
      console.log('Return URL signature verification successful')
    } else {
      console.warn('No signature provided - skipping signature verification')
    }

    // 检查是否已经处理过这个支付
    const { data: existingPayment } = await supabaseAdmin
      .from('payments')
      .select('id, verified')
      .or(`payment_id.eq.${paymentData.checkout_id},payment_id.eq.${paymentData.order_id}`)
      .single()

    if (existingPayment) {
      console.log('Payment already processed:', existingPayment)
      return NextResponse.json({
        success: true,
        message: 'Payment already processed',
        alreadyProcessed: true
      })
    }

    // 根据产品ID获取原始价格（用于添加到remaining字段）
    const getOriginalPriceForProduct = (productId: string): number => {
      const productMap: Record<string, number> = {
        // 内部产品ID映射
        'aipex_basic': 5.90,     // AIPex Basic 原始价格
        'aipex_standard': 12.90, // AIPex Standard 原始价格  
        'aipex_premium': 129.00, // AIPex Premium 原始价格
        'aipex': 5.90,           // 默认使用Basic价格
        
        // Creem 实际产品ID映射（根据你的线上配置）
        'prod_3Y5uBhxL8Gu76Ts2tODWbs': 5.90,  // CREEM_BASIC_PRODUCT_ID
        'prod_xJQ96KLb6r2nZM3hvdMCa': 12.90, // CREEM_STANDARD_PRODUCT_ID  
        'prod_2o9UYfe0MsWbp9m8TZGpx6': 129.00 // CREEM_PREMIUM_PRODUCT_ID
      }
      
      console.log(`Looking up original price for product ID: ${productId}`)
      const price = productMap[productId] || 0
      console.log(`Found original price: $${price}`)
      
      return price
    }

    const originalPriceToAdd = getOriginalPriceForProduct(paymentData.product_id || '')
    
    if (originalPriceToAdd <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid product ID'
      }, { status: 400 })
    }

    // 获取用户信息
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, remaining')
      .eq('email', session.user.email)
      .single()

    if (userError || !user) {
      console.error('User not found:', userError)
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 })
    }

    // 更新用户余额（添加原始价格到remaining字段）
    const currentRemaining = user.remaining || 0
    const newRemaining = currentRemaining + originalPriceToAdd

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ remaining: newRemaining })
      .eq('email', session.user.email)

    if (updateError) {
      console.error('Failed to update remaining:', updateError)
      return NextResponse.json({
        success: false,
        message: 'Failed to update remaining'
      }, { status: 500 })
    }

    // 记录支付信息
    const { error: paymentRecordError } = await supabaseAdmin
      .from('payments')
      .insert({
        user_id: user.id,
        credits: 0, // credits字段不再使用，设为0
        payment_id: paymentData.checkout_id || paymentData.order_id,
        verified: true
      })

    if (paymentRecordError) {
      console.error('Failed to record payment:', paymentRecordError)
      // 即使记录支付失败，credits已经更新，仍然返回成功
    }

    console.log(`Payment callback processed successfully:`)
    console.log(`- User: ${session.user.email} (ID: ${user.id})`)
    console.log(`- Original price added to remaining: $${originalPriceToAdd}`)
    console.log(`- Previous remaining: $${currentRemaining}`)
    console.log(`- New total remaining: $${newRemaining}`)
    console.log(`- Payment ID: ${paymentData.checkout_id || paymentData.order_id}`)

    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully',
      remainingAdded: originalPriceToAdd,
      totalRemaining: newRemaining
    })

  } catch (error) {
    console.error('Payment callback processing error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}
