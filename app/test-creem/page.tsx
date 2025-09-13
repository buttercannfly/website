'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CreditsPurchaseModal } from '@/components/payment/credits-purchase-modal'
import { CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function TestCreemPage() {
  const { data: session, status } = useSession()
  const [testResults, setTestResults] = useState<any[]>([])

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    try {
      const result = await testFunction()
      setTestResults(prev => [...prev, {
        name: testName,
        status: 'success',
        result: result,
        timestamp: new Date().toISOString()
      }])
    } catch (error) {
      setTestResults(prev => [...prev, {
        name: testName,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }])
    }
  }

  const testCreemConfig = async () => {
    const response = await fetch('/api/debug/config')
    const config = await response.json()
    return config
  }

  const testCreatePayment = async () => {
    if (!session?.user?.email) {
      throw new Error('User not authenticated')
    }

    const response = await fetch('/api/creem/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: 'aipex' }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Payment creation failed')
    }

    return data
  }

  const clearResults = () => {
    setTestResults([])
  }

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
              Please sign in to test Creem payment integration.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Creem Payment Integration Test</h1>
          <p className="text-gray-600">Test the Creem payment platform integration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Controls</CardTitle>
                <CardDescription>Run tests to verify Creem integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => runTest('Configuration Test', testCreemConfig)}
                  className="w-full"
                  variant="outline"
                >
                  Test Configuration
                </Button>

                <Button
                  onClick={() => runTest('Create Payment Test', testCreatePayment)}
                  className="w-full"
                  variant="outline"
                >
                  Test Payment Creation
                </Button>

                <CreditsPurchaseModal>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Test Payment Modal
                  </Button>
                </CreditsPurchaseModal>

                <Button
                  onClick={clearResults}
                  variant="outline"
                  className="w-full"
                >
                  Clear Results
                </Button>
              </CardContent>
            </Card>

            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Email:</span> {session.user.email}
                  </div>
                  <div>
                    <span className="font-medium">Name:</span> {session.user.name || 'N/A'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Results */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>
                  {testResults.length} test(s) completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No tests run yet. Click a test button to get started.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {testResults.map((test, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {test.status === 'success' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="font-medium">{test.name}</span>
                          <Badge variant={test.status === 'success' ? 'default' : 'destructive'}>
                            {test.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          {new Date(test.timestamp).toLocaleString()}
                        </div>

                        {test.status === 'success' ? (
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <pre className="text-xs overflow-x-auto">
                              {JSON.stringify(test.result, null, 2)}
                            </pre>
                          </div>
                        ) : (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-red-800 text-sm">{test.error}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Configuration Test</h4>
                <p className="text-sm text-gray-600">
                  Verifies that Creem environment variables are properly configured.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">2. Payment Creation Test</h4>
                <p className="text-sm text-gray-600">
                  Tests the API endpoint for creating payment orders with Creem.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">3. Payment Modal Test</h4>
                <p className="text-sm text-gray-600">
                  Opens the payment modal to test the user interface.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
