'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ExtensionSuccess() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查URL参数中是否有token
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    
    if (tokenParam) {
      try {
        const tokenData = JSON.parse(decodeURIComponent(tokenParam))
        console.log('Received token from URL:', tokenData)
        
        setToken(tokenData.token)
        
        // Store token in localStorage for extension to access
        localStorage.setItem('extension_auth_token', tokenData.token)
        localStorage.setItem('extension_user', JSON.stringify(tokenData.user))
        
        console.log('Token stored in localStorage:', {
          hasToken: !!localStorage.getItem('extension_auth_token'),
          hasUser: !!localStorage.getItem('extension_user')
        })
        
        setIsLoading(false)
        
        // 关闭窗口
        setTimeout(() => {
          window.close()
        }, 2000)
        
        return
      } catch (error) {
        console.error('Error parsing token from URL:', error)
      }
    }

    // 如果没有URL参数，使用原来的逻辑
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?source=extension')
      return
    }

    // Generate extension token
    const generateToken = async () => {
      try {
        console.log('Generating extension token for user:', session.user)
        
        const response = await fetch('/api/auth/extension-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setToken(data.token)
          
          // Store token in localStorage for extension to access
          localStorage.setItem('extension_auth_token', data.token)
          localStorage.setItem('extension_user', JSON.stringify(data.user))
          
          console.log('Token stored in localStorage:', {
            hasToken: !!localStorage.getItem('extension_auth_token'),
            hasUser: !!localStorage.getItem('extension_user')
          })
          
          // Notify extension that login is complete
          setTimeout(() => {
            window.close()
          }, 3000)
        } else {
          console.error('Failed to generate extension token')
        }
      } catch (error) {
        console.error('Error generating extension token:', error)
      } finally {
        setIsLoading(false)
      }
    }

    generateToken()
  }, [session, status, router])

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Setting up your extension...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-12 w-12 text-green-600">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Successfully Connected!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your AIPex extension is now connected to your account.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            This window will close automatically...
          </p>
        </div>
        
        {session?.user && (
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-3">
              {session.user.image && (
                <img
                  className="h-10 w-10 rounded-full"
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                />
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {session.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
