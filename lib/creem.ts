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
   * 生成签名 - 使用Creem官方标准方法
   * 根据官方文档：https://docs.creem.io/learn/checkout-session/return-url
   */
  generateSignature(params: any, apiKey: string): string {
    const crypto = require('crypto')
    
    // 按照官方文档要求，使用 | 分隔符连接参数，并添加 salt
    const data = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .concat(`salt=${apiKey}`)
      .join('|')
    
    console.log('Signature data string:', data)
    
    // 使用 SHA256 hash，不是 HMAC
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  /**
   * 验证Return URL签名 - 使用Creem官方标准方法
   */
  verifyReturnUrlSignature(params: any, signature: string): boolean {
    try {
      if (!this.config.apiKey || !signature) {
        console.error('Missing API key or signature')
        return false
      }

      console.log('Verifying signature for params:', params)
      console.log('Received signature:', signature)
      
      // 使用官方方法生成期望的签名
      const expectedSignature = this.generateSignature(params, this.config.apiKey)
      
      console.log('Expected signature:', expectedSignature)
      console.log('Signatures match:', expectedSignature === signature)

      return expectedSignature === signature
    } catch (error) {
      console.error('Return URL signature verification error:', error)
      return false
    }
  }

  /**
   * 验证Webhook签名 - 保持原有的HMAC方法（用于webhook）
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      if (!this.config.webhookSecret || !signature) {
        console.error('Missing webhook secret or signature')
        return false
      }

      // 移除 'sha256=' 前缀（如果存在）
      const cleanSignature = signature.replace(/^sha256=/, '')
      
      // 计算HMAC SHA256签名（webhook使用HMAC）
      const crypto = require('crypto')
      const expectedSignature = crypto
        .createHmac('sha256', this.config.webhookSecret)
        .update(payload, 'utf8')
        .digest('hex')

      console.log('Expected webhook signature:', expectedSignature)
      console.log('Received webhook signature:', cleanSignature)

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
