import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { creemClient, CREDITS_PRODUCTS } from '@/lib/creem'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // 验证产品ID是否有效 (目前只支持aipex产品)
    if (productId !== 'aipex') {
      return NextResponse.json({ error: 'Invalid product ID. Only "aipex" is supported.' }, { status: 400 })
    }

    const product = CREDITS_PRODUCTS.find(p => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 400 })
    }

    // 构建返回URL - Creem会直接返回所有支付参数到callback页面
    const returnUrl = process.env.NEXT_PUBLIC_CREEM_SUCCESS_URL || `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/callback`
    const cancelUrl = process.env.NEXT_PUBLIC_CREEM_CANCEL_URL || `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/callback`

    // 创建支付请求
    const paymentRequest = {
      productId,
      userId: session.user.email,
      userEmail: session.user.email,
      returnUrl,
      cancelUrl
    }

    const paymentResponse = await creemClient.createPayment(paymentRequest)

    if (!paymentResponse.success) {
      return NextResponse.json({ 
        error: paymentResponse.error || 'Failed to create payment' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentResponse.paymentUrl,
      paymentId: paymentResponse.paymentId,
      product: {
        id: product.id,
        name: product.name,
        credits: product.credits,
        price: product.price,
        currency: product.currency
      }
    })

  } catch (error) {
    console.error('Creem payment creation error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
