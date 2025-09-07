'use client'

import { useState } from 'react'

export default function DebugAuth() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const checkConfig = async () => {
    try {
      // 检查环境变量
      const response = await fetch('/api/debug/config')
      const data = await response.json()
      setDebugInfo(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const testProviders = async () => {
    try {
      const response = await fetch('/api/debug/providers')
      const data = await response.json()
      setDebugInfo(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const testNetwork = async () => {
    try {
      const response = await fetch('/api/debug/network')
      const data = await response.json()
      setDebugInfo(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Auth Debug Page</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Configuration Check</h2>
            <button
              onClick={checkConfig}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Check Environment Variables
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Provider Test</h2>
            <button
              onClick={testProviders}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Test OAuth Providers
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Network Test</h2>
            <button
              onClick={testNetwork}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Test GitHub Connectivity
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {debugInfo && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-800 font-semibold mb-2">Debug Info:</h3>
              <pre className="text-sm text-gray-700 overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-semibold">Common Issues:</h3>
            <ul className="text-yellow-700 text-sm mt-2 space-y-1">
              <li>• Missing .env.local file with OAuth credentials</li>
              <li>• Incorrect OAuth callback URLs</li>
              <li>• NEXTAUTH_SECRET not set</li>
              <li>• NEXTAUTH_URL not matching your domain</li>
              <li>• OAuth app not properly configured</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
