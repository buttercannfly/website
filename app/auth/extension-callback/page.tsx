'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function ExtensionCallback() {
  const { data: session, status } = useSession()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      // 如果没有session，重定向到登录页面
      window.location.href = '/auth/signin?source=extension'
      return
    }

    // 处理登录成功
    const handleAuthSuccess = async () => {
      try {
        console.log('Processing extension auth success for user:', session.user)
        
        // 生成extension token
        const response = await fetch('/api/auth/extension-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          
          // 使用URL参数传递token给插件
          const tokenData = encodeURIComponent(JSON.stringify({
            token: data.token,
            user: data.user
          }))
          
          // 重定向到插件可以监听的URL
          const redirectUrl = `${window.location.origin}/auth/extension-success?token=${tokenData}`
          console.log('Redirecting to:', redirectUrl)
          
          window.location.href = redirectUrl
          
          // 显示成功消息
          setTimeout(() => {
            window.close()
          }, 2000)
        } else {
          console.error('Failed to generate extension token')
        }
      } catch (error) {
        console.error('Error processing auth success:', error)
      } finally {
        setIsProcessing(false)
      }
    }

    handleAuthSuccess()
  }, [session, status])

  if (status === 'loading' || isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Connecting to extension...</p>
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
            Your AIPex extension is now connected.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            This window will close automatically...
          </p>
        </div>
      </div>
    </div>
  )
}
