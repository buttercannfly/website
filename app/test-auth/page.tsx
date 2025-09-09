'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function TestAuth() {
  const { data: session, status } = useSession()
  const [extensionToken, setExtensionToken] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      // 测试生成extension token
      fetch('/api/auth/extension-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            setExtensionToken(data.token)
          }
        })
        .catch(err => console.error('Failed to get extension token:', err))
    }
  }, [session])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Auth Test Page</h1>
        
        {session ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h2 className="text-lg font-semibold text-green-800">Signed In</h2>
              <div className="mt-2">
                <img
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                  className="w-12 h-12 rounded-full mx-auto"
                />
                <p className="text-sm text-green-700 mt-2">
                  {session.user?.name}
                </p>
                <p className="text-sm text-green-600">
                  {session.user?.email}
                </p>
              </div>
            </div>

            {extensionToken && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-sm font-semibold text-blue-800">Extension Token</h3>
                <p className="text-xs text-blue-600 mt-1 break-all">
                  {extensionToken}
                </p>
              </div>
            )}

            <button
              onClick={() => signOut()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h2 className="text-lg font-semibold text-yellow-800">Not Signed In</h2>
              <p className="text-sm text-yellow-700 mt-2">
                Click the button below to sign in.
              </p>
            </div>

            <button
              onClick={() => signIn()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
