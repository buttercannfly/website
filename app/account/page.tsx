'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, DollarSign, HelpCircle, ArrowRight, LogOut, User, CreditCard, Home, Chrome } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface UserRemaining {
  remaining: number
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
  const [remaining, setRemaining] = useState<UserRemaining | null>(null)
  const [loading, setLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)


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
    if (!session) return
    
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/user/remaining')
        const data = await res.json()
        
        if (data.error) {
          console.error('Failed to fetch remaining:', data.error)
        } else {
          setRemaining(data)
        }
      } catch (err) {
        console.error('Failed to fetch remaining:', err)
      } finally {
        setLoading(false)
      }
    }

    const fetchHistory = async () => {
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

    fetchData()
    fetchHistory()
  }, [session])

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
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <Chrome className="h-6 w-6" />
            AIpex
          </Link>
        </div>
        
        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 bg-amber-50 rounded-lg">
            <User className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-900">Account</span>
          </div>
          <Link href="/tab/group" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-medium">Tab Management</span>
          </Link>
          <Link href="/sidebar/best" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-medium">Sidebar Extension</span>
          </Link>
          <Link href="/alternatives/google" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-medium">Search Alternatives</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account</h1>
          
          {/* Remaining Balance Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Remaining Balance</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading remaining balance...</span>
              </div>
            ) : remaining ? (
              <div className="space-y-4">
                {/* Remaining Balance */}
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Remaining balance: {remaining.remaining}</span>
                </div>
                
                
                
                {/* Buy Credits Button */}
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handlePurchaseCredits}
                  disabled={isProcessing}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Buy 10 credits'}
                </Button>
                
                {/* How remaining balance works link */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                        <HelpCircle className="h-4 w-4" />
                        <span className="text-sm">How remaining balance works?</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Each task you perform costs 1 credit from your remaining balance.<br/>For example: opening a new page, clicking elements, or taking screenshots.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Failed to load remaining balance information
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
