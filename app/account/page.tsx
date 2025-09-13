'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, DollarSign, HelpCircle, ArrowRight, LogOut, User, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface UserCredits {
  total: number
  nextRefreshDate?: string
}

interface PaymentHistory {
  id: number
  date: string
  credits: number
  paymentId: string
  verified: boolean
  status: 'completed' | 'failed' | 'pending'
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [credits, setCredits] = useState<UserCredits | null>(null)
  const [loading, setLoading] = useState(false)
  const [purchasedCredits, setPurchasedCredits] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)

  const fetchCredits = async () => {
    if (!session) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/credits')
      const data = await res.json()
      
      if (data.error) {
        console.error('Failed to fetch credits:', data.error)
      } else {
        setCredits(data)
        // 假设购买的credits是总credits减去免费credits(5)
        setPurchasedCredits(Math.max(0, data.total - 5))
      }
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPaymentHistory = async () => {
    if (!session) return
    
    setHistoryLoading(true)
    try {
      const res = await fetch('/api/credits', {
        method: 'PUT'
      })
      const data = await res.json()
      
      if (data.error) {
        console.error('Failed to fetch payment history:', data.error)
      } else {
        setPaymentHistory(data.payments || [])
      }
    } catch (err) {
      console.error('Failed to fetch payment history:', err)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handlePurchaseCredits = async () => {
    try {
      setIsProcessing(true)

      const response = await fetch('/api/creem/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: 'aipex' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      if (data.success && data.paymentUrl) {
        // 直接跳转到Creem支付页面
        window.location.href = data.paymentUrl
      } else {
        throw new Error('Invalid payment response')
      }

    } catch (err) {
      console.error('Purchase error:', err)
      alert(err instanceof Error ? err.message : 'Purchase failed')
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchCredits()
      fetchPaymentHistory()
    }
  }, [session])

  // 处理支付成功后的回调
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentStatus = urlParams.get('payment')
    
    if (paymentStatus === 'success') {
      // 刷新credits和支付历史数据
      fetchCredits()
      fetchPaymentHistory()
      // 清除URL参数
      window.history.replaceState({}, '', '/account')
    }
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to view your account information and credits.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => signIn()} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Browserfly</h1>
        </div>
        
        <nav className="space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-amber-50 rounded-lg">
            <User className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-900">Account</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account</h1>
          
          {/* Credits Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Credits</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading credits...</span>
              </div>
            ) : credits ? (
              <div className="space-y-4">
                {/* Free Credits */}
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Total credits: {credits.total} </span>
                </div>
                
                {/* Progress Bar for Free Credits */}

                
                {/* Next Refresh Date */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-sm text-gray-600 cursor-help">
                        Next refresh date: {credits.nextRefreshDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You get 5 free credits every day that refresh at midnight.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {/* Purchased Credits */}
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Purchased credits: {purchasedCredits}</span>
                </div>
                
                {/* Buy Credits Button */}
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handlePurchaseCredits}
                  disabled={isProcessing}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Buy credits'}
                </Button>
                
                {/* How credits work link */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                        <HelpCircle className="h-4 w-4" />
                        <span className="text-sm">How credits work?</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Each task you perform costs 1 credit.<br/>For example: opening a new page, clicking elements, or taking screenshots.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Failed to load credits information
              </div>
            )}
          </div>
          
          {/* Payment History Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment History</h2>
            
            {historyLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading payment history...</span>
              </div>
            ) : paymentHistory.length > 0 ? (
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        payment.status === 'completed' ? 'bg-green-500' : 
                        payment.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {payment.credits > 0 ? `+${payment.credits} Credits` : 'Payment Failed'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} {new Date(payment.date).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        payment.status === 'completed' ? 'text-green-600' : 
                        payment.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                      {payment.paymentId && (
                        <div className="text-xs text-gray-400">
                          ID: {payment.paymentId.slice(-8)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No payment history yet</p>
                <p className="text-sm">Your payment history will appear here after making purchases</p>
              </div>
            )}
          </div>
          
          {/* Divider */}
          <hr className="border-gray-200 my-8" />
          
          {/* Sign Out Button */}
          <Button 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => signOut()}
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
