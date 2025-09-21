'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserInfo {
  id: number
  email: string
  type: string
  credits: number
  remaining: number
  createdAt: string
}

export default function TestRemainingPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [cost, setCost] = useState('1')
  const [message, setMessage] = useState('')

  // 获取用户信息
  const fetchUserInfo = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user')
      if (response.ok) {
        const data = await response.json()
        setUserInfo(data)
        setMessage('用户信息获取成功')
      } else {
        const error = await response.json()
        setMessage(`获取用户信息失败: ${error.message || error.error}`)
      }
    } catch (error) {
      setMessage(`请求失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // 消费remaining余额
  const consumeRemaining = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/remaining', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cost: parseFloat(cost) }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setMessage(`消费成功: ${JSON.stringify(data, null, 2)}`)
        // 重新获取用户信息
        await fetchUserInfo()
      } else {
        const error = await response.json()
        setMessage(`消费失败: ${error.message || error.error}`)
      }
    } catch (error) {
      setMessage(`请求失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // 重置remaining余额
  const resetRemaining = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/remaining', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remaining: 10 }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setMessage(`重置成功: ${JSON.stringify(data, null, 2)}`)
        // 重新获取用户信息
        await fetchUserInfo()
      } else {
        const error = await response.json()
        setMessage(`重置失败: ${error.message || error.error}`)
      }
    } catch (error) {
      setMessage(`请求失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // 带cost参数获取用户信息
  const fetchUserWithCost = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/user?cost=${cost}`)
      if (response.ok) {
        const data = await response.json()
        setUserInfo(data)
        setMessage('用户信息获取成功（已消费余额）')
      } else {
        const error = await response.json()
        setMessage(`获取用户信息失败: ${error.message || error.error}`)
      }
    } catch (error) {
      setMessage(`请求失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Remaining Balance 测试页面</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* 用户信息显示 */}
        <Card>
          <CardHeader>
            <CardTitle>用户信息</CardTitle>
            <CardDescription>当前用户的详细信息和余额</CardDescription>
          </CardHeader>
          <CardContent>
            {userInfo ? (
              <div className="space-y-2">
                <p><strong>ID:</strong> {userInfo.id}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Type:</strong> {userInfo.type}</p>
                <p><strong>Credits:</strong> {userInfo.credits}</p>
                <p><strong>Remaining:</strong> {userInfo.remaining}</p>
                <p><strong>Created:</strong> {new Date(userInfo.createdAt).toLocaleString()}</p>
              </div>
            ) : (
              <p>加载中...</p>
            )}
          </CardContent>
        </Card>

        {/* 操作面板 */}
        <Card>
          <CardHeader>
            <CardTitle>操作面板</CardTitle>
            <CardDescription>测试remaining字段的各种操作</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cost">消费金额</Label>
              <Input
                id="cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="输入要消费的金额"
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={fetchUserInfo} 
                disabled={loading}
                className="w-full"
              >
                获取用户信息
              </Button>
              
              <Button 
                onClick={fetchUserWithCost} 
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                获取用户信息（消费余额）
              </Button>
              
              <Button 
                onClick={consumeRemaining} 
                disabled={loading}
                className="w-full"
                variant="destructive"
              >
                消费Remaining余额
              </Button>
              
              <Button 
                onClick={resetRemaining} 
                disabled={loading}
                className="w-full"
                variant="secondary"
              >
                重置Remaining为10
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 消息显示 */}
      {message && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>操作结果</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">
              {message}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
