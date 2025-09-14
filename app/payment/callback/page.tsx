'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'

interface PaymentCallbackData {
  checkout_id: string | null
  order_id: string | null
  customer_id: string | null
  product_id: string | null
  signature: string | null
  payment_status?: string | null
}

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [processing, setProcessing] = useState(true)
  const [status, setStatus] = useState<'processing' | 'success' | 'error' | 'cancelled'>('processing')
  const [message, setMessage] = useState('Processing your payment...')

  useEffect(() => {
    const processPaymentCallback = async () => {
      try {
        // 提取所有Creem返回的参数
        const paymentData: PaymentCallbackData = {
          checkout_id: searchParams?.get('checkout_id') || null,
          order_id: searchParams?.get('order_id') || null,
          customer_id: searchParams?.get('customer_id') || null,
          product_id: searchParams?.get('product_id') || null,
          signature: searchParams?.get('signature') || null,
          payment_status: searchParams?.get('payment') || null
        }

        console.log('Payment callback received:', paymentData)

        // 检查是否有必要的参数
        if (!paymentData.checkout_id && !paymentData.order_id) {
          console.error('Missing payment identifiers')
          setStatus('error')
          setMessage('Invalid payment callback - missing identifiers')
          setTimeout(() => router.push('/account'), 3000)
          return
        }

        // 发送支付回调到后端进行验证和处理
        const response = await fetch('/api/payment/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData)
        })

        const result = await response.json()

        if (response.ok && result.success) {
          setStatus('success')
          if (result.alreadyProcessed) {
            setMessage('Payment was already processed! Redirecting to your account...')
          } else {
            setMessage('Payment processed successfully! Redirecting to your account...')
          }
          
          // 延迟跳转，让用户看到成功消息
          setTimeout(() => {
            router.push('/account')
          }, 2000)
        } else {
          setStatus('error')
          setMessage(result.message || 'Failed to process payment')
          
          // 延迟跳转到账户页面
          setTimeout(() => {
            router.push('/account')
          }, 4000)
        }

      } catch (error) {
        console.error('Payment callback processing error:', error)
        setStatus('error')
        setMessage('An error occurred while processing your payment')
        
        setTimeout(() => {
          router.push('/account')
        }, 3000)
      } finally {
        setProcessing(false)
      }
    }

    processPaymentCallback()
  }, [router, searchParams])

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-500" />
      case 'cancelled':
        return <XCircle className="h-16 w-16 text-orange-500" />
      default:
        return <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
    }
  }

  const getStatusTitle = () => {
    switch (status) {
      case 'processing':
        return 'Processing Payment'
      case 'success':
        return 'Payment Successful!'
      case 'error':
        return 'Payment Error'
      case 'cancelled':
        return 'Payment Cancelled'
      default:
        return 'Processing Payment'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'cancelled':
        return 'text-orange-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className={`text-2xl ${getStatusColor()}`}>
            {getStatusTitle()}
          </CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status === 'processing' && (
            <p className="text-gray-600">
              Please wait while we verify your payment...
            </p>
          )}
          
          {status === 'success' && (
            <div className="space-y-2">
              <p className="text-green-600 font-medium">+10 Credits Added</p>
              <p className="text-sm text-gray-500">
                Your credits have been added to your account
              </p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-2">
              <p className="text-red-600">
                {message.includes('signature') ? 'Payment verification failed' : 'Please contact support if this issue persists'}
              </p>
              {message.includes('signature') && (
                <p className="text-xs text-gray-500">
                  The payment could not be verified. This may be a security issue.
                </p>
              )}
            </div>
          )}
          
          {status === 'cancelled' && (
            <p className="text-orange-600">
              No charges were made to your account
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
