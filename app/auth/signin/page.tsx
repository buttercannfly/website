'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [providers, setProviders] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingProviders, setLoadingProviders] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams?.get('source')
  const callbackUrl = searchParams?.get('callbackUrl')

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoadingProviders(true)
        setError(null)
        const res = await getProviders()
        console.log('Providers loaded:', res)
        setProviders(res)
      } catch (err) {
        console.error('Error loading providers:', err)
        setError('Failed to load authentication providers. Please check your configuration.')
      } finally {
        setLoadingProviders(false)
      }
    }
    fetchProviders()
  }, [])

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true)
    try {
      if (source === 'extension') {
        // 对于插件登录，使用自定义回调处理
        await signIn(providerId, { 
          callbackUrl: '/auth/extension-callback',
          redirect: true 
        })
      } else {
        // 普通网站登录
        await signIn(providerId, { 
          callbackUrl: callbackUrl || '/',
          redirect: true 
        })
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  }

  if (loadingProviders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading authentication providers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Configuration Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="text-sm text-gray-500">
              <p>Please check:</p>
              <ul className="list-disc list-inside mt-2 text-left">
                <li>Environment variables are set correctly</li>
                <li>OAuth providers are configured</li>
                <li>NEXTAUTH_SECRET is defined</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!providers || Object.keys(providers).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <div className="text-yellow-500 text-6xl mb-4">🔧</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Providers Available</h2>
            <p className="text-gray-600 mb-4">No authentication providers are configured.</p>
            <div className="text-sm text-gray-500">
              <p>Please configure at least one OAuth provider:</p>
              <ul className="list-disc list-inside mt-2 text-left">
                <li>Google OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)</li>
                <li>GitHub OAuth (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {source === 'extension' ? 'Sign in to AIPex Extension' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {source === 'extension' 
              ? 'Connect your account to use AIPex extension features'
              : 'Choose your preferred sign-in method'
            }
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          {Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              onClick={() => handleSignIn(provider.id)}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  {provider.id === 'google' && (
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {provider.id === 'github' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  Continue with {provider.name}
                </>
              )}
            </button>
          ))}
        </div>

        {source === 'extension' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              After signing in, you'll be redirected back to the AIPex extension.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
