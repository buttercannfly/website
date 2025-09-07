'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function ManualSync() {
  const { data: session } = useSession()
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateToken = async () => {
    if (!session) {
      setResult({ error: 'Not logged in' })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/extension-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      if (response.ok) {
        // Store in localStorage for extension to pick up
        localStorage.setItem('extension_auth_token', data.token)
        localStorage.setItem('extension_user', JSON.stringify(data.user))
        
        setResult({
          success: true,
          message: 'Token generated and stored in localStorage',
          user: data.user
        })
      } else {
        setResult({ error: data.error || 'Failed to generate token' })
      }
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manual Sync for Extension</h1>
        
        {session ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h2 className="text-lg font-semibold text-green-800">Logged In</h2>
              <p className="text-sm text-green-700 mt-2">
                {session.user?.name} ({session.user?.email})
              </p>
            </div>

            <button
              onClick={generateToken}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate Extension Token'}
            </button>

            {result && (
              <div className={`p-4 rounded-md ${
                result.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <h3 className={`font-semibold ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? 'Success!' : 'Error'}
                </h3>
                <p className={`text-sm mt-2 ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message || result.error}
                </p>
                {result.user && (
                  <div className="mt-2 text-xs text-green-600">
                    <p>User: {result.user.name}</p>
                    <p>Email: {result.user.email}</p>
                    <p>Provider: {result.user.provider}</p>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-gray-500">
              <p>Instructions:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Click "Generate Extension Token"</li>
                <li>Go to your extension</li>
                <li>Click "Already logged in? Sync here"</li>
                <li>Your extension should now show your user info</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h2 className="text-lg font-semibold text-yellow-800">Not Logged In</h2>
            <p className="text-sm text-yellow-700 mt-2">
              Please log in first at <a href="/auth/signin" className="underline">/auth/signin</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
