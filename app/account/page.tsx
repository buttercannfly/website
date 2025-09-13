'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, User, Mail, Calendar, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

interface UserCredits {
  total: number
  used: number
  remaining: number
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [credits, setCredits] = useState<UserCredits | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) {
      // 获取用户 credits 数据
      setLoading(true)
      fetch('/api/credits')
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.error('Failed to fetch credits:', data.error)
          } else {
            setCredits(data)
          }
        })
        .catch(err => {
          console.error('Failed to fetch credits:', err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and view your credits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{session.user?.name}</h3>
                  <p className="text-gray-600">{session.user?.email}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credits Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Credits
              </CardTitle>
              <CardDescription>
                Your AI usage credits and consumption history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Loading credits...</span>
                </div>
              ) : credits ? (
                <div className="space-y-6">
                  {/* Credits Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{credits.total}</div>
                      <div className="text-sm text-blue-600">Total Credits</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{credits.used}</div>
                      <div className="text-sm text-orange-600">Used Credits</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{credits.remaining}</div>
                      <div className="text-sm text-green-600">Remaining</div>
                    </div>
                  </div>

                  {/* Usage Progress */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Usage Progress</span>
                      <span>{Math.round((credits.used / credits.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(credits.used / credits.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Credit Status */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Credit Status</h4>
                      <p className="text-sm text-gray-600">
                        {credits.remaining > 100 ? 'You have plenty of credits remaining' : 
                         credits.remaining > 0 ? 'Credits running low' : 'No credits remaining'}
                      </p>
                    </div>
                    <Badge variant={credits.remaining > 100 ? 'default' : credits.remaining > 0 ? 'secondary' : 'destructive'}>
                      {credits.remaining > 100 ? 'Good' : credits.remaining > 0 ? 'Low' : 'Empty'}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        // 模拟购买 100 credits
                        fetch('/api/credits', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ amount: 100 }),
                        })
                        .then(res => res.json())
                        .then(data => {
                          if (data.error) {
                            console.error('Failed to purchase credits:', data.error)
                          } else {
                            setCredits(data)
                          }
                        })
                        .catch(err => {
                          console.error('Failed to purchase credits:', err)
                        })
                      }}
                    >
                      <Coins className="h-4 w-4 mr-2" />
                      Buy More Credits
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Usage Settings
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Failed to load credits information
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Additional details about your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-600">{session.user?.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium">Member Since</div>
                  <div className="text-sm text-gray-600">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
