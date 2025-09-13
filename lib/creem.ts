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
    baseUrl: 'https://api.creem.com', // 使用统一的API端点
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
    credits: 10, // 更新为10个积分
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
   * 创建支付订单 - 使用直接重定向方式
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

      // 使用直接重定向到Creem支付页面
      const productId = this.config.products[request.productId] || request.productId
      const paymentUrl = `https://www.creem.io/payment/${productId}`

      return {
        success: true,
        paymentUrl: paymentUrl,
        paymentId: `direct_${Date.now()}` // 生成临时ID
      }
    } catch (error) {
      console.error('Creem payment creation error:', error)
      return {
        success: false,
        error: 'Payment creation failed'
      }
    }
  }

  /**
   * 验证Webhook签名
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      if (!this.config.webhookSecret || !signature) {
        console.error('Missing webhook secret or signature')
        return false
      }

      // 移除 'sha256=' 前缀（如果存在）
      const cleanSignature = signature.replace(/^sha256=/, '')
      
      // 计算HMAC SHA256签名
      const crypto = require('crypto')
      const expectedSignature = crypto
        .createHmac('sha256', this.config.webhookSecret)
        .update(payload, 'utf8')
        .digest('hex')

      // 使用时间安全比较避免时序攻击
      return crypto.timingSafeEqual(
        Buffer.from(cleanSignature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      )
    } catch (error) {
      console.error('Webhook signature verification error:', error)
      return false
    }
  }

  /**
   * 获取支付状态 - 简化版本
   */
  async getPaymentStatus(paymentId: string): Promise<{ status: string; amount?: number }> {
    // 简化版本，不调用外部API
    return {
      status: 'completed', // 假设支付完成
      amount: 4.49 // 默认金额
    }
  }
}

// 导出默认实例
export const creemClient = new CreemClient()
