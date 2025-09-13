/**
 * Creem Payment Platform Configuration
 * 支付平台Creem的配置和API集成
 */

export interface CreemConfig {
  apiKey: string
  webhookSecret: string
  environment: 'test' | 'prod'
  baseUrl: string
  products: Record<string, string>
}

export interface CreemProduct {
  id: string
  name: string
  description: string
  price: number
  credits: number
  currency: string
}

export interface CreemPaymentRequest {
  productId: string
  userId: string
  userEmail: string
  returnUrl: string
  cancelUrl: string
}

export interface CreemPaymentResponse {
  success: boolean
  paymentUrl?: string
  paymentId?: string
  error?: string
}

export interface CreemWebhookPayload {
  event: string
  paymentId: string
  status: 'completed' | 'failed' | 'cancelled'
  amount: number
  currency: string
  userId: string
  productId: string
  timestamp: string
}

// Creem API配置
export const getCreemConfig = (): CreemConfig => {
  const environment = (process.env.CREEM_ENV as 'test' | 'prod') || 'test'
  
  return {
    apiKey: process.env.CREEM_API_KEY || '',
    webhookSecret: process.env.CREEM_WEBHOOK_SECRET || '',
    environment,
    baseUrl: environment === 'prod' 
      ? 'https://api.creem.com' 
      : 'https://api-test.creem.com',
    products: {
      'aipex': process.env.CREEM_BASIC_PRODUCT_ID || 'prod_3Y5uBhxL8Gu76Ts2tODWbs'
    }
  }
}

// 预定义的积分产品
export const CREDITS_PRODUCTS: CreemProduct[] = [
  {
    id: 'aipex',
    name: 'AIPex Credits',
    description: 'AIPex Credits - Perfect for getting started',
    price: 4.49,
    credits: 100, // 根据您的需求调整积分数量
    currency: 'USD'
  }
]

// Creem API客户端
export class CreemClient {
  private config: CreemConfig

  constructor() {
    this.config = getCreemConfig()
  }

  /**
   * 创建支付订单
   */
  async createPayment(request: CreemPaymentRequest): Promise<CreemPaymentResponse> {
    try {
      const product = CREDITS_PRODUCTS.find(p => p.id === request.productId)
      if (!product) {
        return {
          success: false,
          error: 'Product not found'
        }
      }

      const response = await fetch(`${this.config.baseUrl}/v1/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
          currency: product.currency,
          product_id: this.config.products[request.productId] || request.productId,
          customer_email: request.userEmail,
          customer_id: request.userId,
          return_url: request.returnUrl,
          cancel_url: request.cancelUrl,
          metadata: {
            credits: product.credits,
            product_name: product.name
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Payment creation failed'
        }
      }

      return {
        success: true,
        paymentUrl: data.payment_url,
        paymentId: data.payment_id
      }
    } catch (error) {
      console.error('Creem payment creation error:', error)
      return {
        success: false,
        error: 'Network error'
      }
    }
  }

  /**
   * 验证Webhook签名
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // 这里应该实现实际的签名验证逻辑
    // 根据Creem的文档实现HMAC验证
    return true // 临时返回true，实际实现需要根据Creem的签名算法
  }

  /**
   * 获取支付状态
   */
  async getPaymentStatus(paymentId: string): Promise<{ status: string; amount?: number }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get payment status')
      }

      return {
        status: data.status,
        amount: data.amount
      }
    } catch (error) {
      console.error('Creem payment status error:', error)
      throw error
    }
  }
}

// 导出默认实例
export const creemClient = new CreemClient()
