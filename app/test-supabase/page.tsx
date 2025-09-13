'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface UserInfo {
  id: number
  email: string
  type: string
  credits: number
  createdAt: string
}

interface CreditsData {
  total: number
}

export default function TestSupabasePage() {
  const { data: session, status } = useSession()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [credits, setCredits] = useState<CreditsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [consumeAmount, setConsumeAmount] = useState('')

  const fetchUserInfo = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/user')
      if (response.ok) {
        const data = await response.json()
        setUserInfo(data)
      } else {
        setError('Failed to fetch user info')
      }
    } catch (err) {
      setError('Error fetching user info')
    } finally {
      setLoading(false)
    }
  }

  const fetchCredits = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/credits')
      if (response.ok) {
        const data = await response.json()
        setCredits(data)
      } else {
        setError('Failed to fetch credits')
      }
    } catch (err) {
      setError('Error fetching credits')
    } finally {
      setLoading(false)
    }
  }

  const purchaseCredits = async () => {
    if (!purchaseAmount || parseInt(purchaseAmount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseInt(purchaseAmount) }),
      })

      if (response.ok) {
        const data = await response.json()
        setCredits(data)
        setPurchaseAmount('')
        // 刷新用户信息
        await fetchUserInfo()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to purchase credits')
      }
    } catch (err) {
      setError('Error purchasing credits')
    } finally {
      setLoading(false)
    }
  }

  const consumeCredits = async () => {
    if (!consumeAmount || parseInt(consumeAmount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/credits/consume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseInt(consumeAmount) }),
      })

      if (response.ok) {
        const data = await response.json()
        setError(null)
        // 刷新credits和用户信息
        await fetchCredits()
        await fetchUserInfo()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to consume credits')
      }
    } catch (err) {
      setError('Error consuming credits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchUserInfo()
      fetchCredits()
    }
  }, [session])

  if (status === 'loading') {
    return <div className="container mx-auto p-8">Loading...</div>
  }

  if (!session) {
    return (
      <div className="container mx-auto p-8">
        <Alert>
          <AlertDescription>
            Please sign in to test Supabase integration.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Supabase Integration Test</h1>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Current user data from Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userInfo ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {userInfo.id}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Type:</strong> {userInfo.type}</p>
                <p><strong>Credits:</strong> {userInfo.credits}</p>
                <p><strong>Created:</strong> {new Date(userInfo.createdAt).toLocaleString()}</p>
              </div>
            ) : (
              <p>No user data available</p>
            )}
            <Button onClick={fetchUserInfo} disabled={loading}>
              Refresh User Info
            </Button>
          </CardContent>
        </Card>

        {/* Credits Card */}
        <Card>
          <CardHeader>
            <CardTitle>Credits Information</CardTitle>
            <CardDescription>Current credits from Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {credits ? (
              <div className="space-y-2">
                <p className="text-2xl font-bold text-blue-600">{credits.total}</p>
                <p className="text-sm text-gray-600">Total Credits</p>
              </div>
            ) : (
              <p>No credits data available</p>
            )}
            <Button onClick={fetchCredits} disabled={loading}>
              Refresh Credits
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Credits */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Credits</CardTitle>
          <CardDescription>Add credits to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="purchase-amount">Amount</Label>
              <Input
                id="purchase-amount"
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder="Enter amount to purchase"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={purchaseCredits} disabled={loading}>
                Purchase Credits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consume Credits */}
      <Card>
        <CardHeader>
          <CardTitle>Consume Credits</CardTitle>
          <CardDescription>Use credits from your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="consume-amount">Amount</Label>
              <Input
                id="consume-amount"
                type="number"
                value={consumeAmount}
                onChange={(e) => setConsumeAmount(e.target.value)}
                placeholder="Enter amount to consume"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={consumeCredits} disabled={loading}>
                Consume Credits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
