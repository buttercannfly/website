'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Gift, DollarSign, HelpCircle, ArrowRight, LogOut, User, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { CreditsPurchaseModal } from '@/components/payment/credits-purchase-modal'

interface UserCredits {
  total: number
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [credits, setCredits] = useState<UserCredits | null>(null)
  const [loading, setLoading] = useState(false)
  const [purchasedCredits, setPurchasedCredits] = useState(0)

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
        // 假设购买的credits是总credits减去免费credits(10)
        setPurchasedCredits(Math.max(0, data.total - 10))
      }
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchCredits()
    }
  }, [session])

  // 处理支付成功后的回调
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentStatus = urlParams.get('payment')
    
    if (paymentStatus === 'success') {
      // 刷新credits数据
      fetchCredits()
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
                  <span className="text-gray-700">Free credits: {credits.total} / 10</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((credits.total / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                
                {/* Next Refresh Date */}
                <div className="text-sm text-gray-600">
                  Next refresh date: {new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                </div>
                
                {/* Purchased Credits */}
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Purchased credits: {purchasedCredits}</span>
                </div>
                
                {/* Buy Credits Button */}
                <CreditsPurchaseModal onPurchaseSuccess={fetchCredits}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Buy credits
                  </Button>
                </CreditsPurchaseModal>
                
                {/* How credits work link */}
                <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                  <HelpCircle className="h-4 w-4" />
                  <span className="text-sm">How credits work?</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Failed to load credits information
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
