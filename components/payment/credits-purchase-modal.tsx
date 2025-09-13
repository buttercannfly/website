'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, CreditCard, Loader2 } from 'lucide-react'
import { CREDITS_PRODUCTS } from '@/lib/creem'

interface CreditsPurchaseModalProps {
  children: React.ReactNode
  onPurchaseSuccess?: () => void
}

export function CreditsPurchaseModal({ children, onPurchaseSuccess }: CreditsPurchaseModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (productId: string) => {
    try {
      setIsProcessing(true)
      setError(null)

      const response = await fetch('/api/creem/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      if (data.success && data.paymentUrl) {
        // 重定向到Creem支付页面
        window.location.href = data.paymentUrl
      } else {
        throw new Error('Invalid payment response')
      }

    } catch (err) {
      console.error('Purchase error:', err)
      setError(err instanceof Error ? err.message : 'Purchase failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const getPopularBadge = (productId: string) => {
    if (productId === 'standard') {
      return <Badge className="bg-green-100 text-green-800">Most Popular</Badge>
    }
    return null
  }

  const getBestValueBadge = (productId: string) => {
    if (productId === 'premium') {
      return <Badge className="bg-blue-100 text-blue-800">Best Value</Badge>
    }
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Buy Credits</DialogTitle>
          <DialogDescription className="text-center">
            Choose a credit package that fits your needs. All packages include instant delivery.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {CREDITS_PRODUCTS.map((product) => (
            <Card 
              key={product.id} 
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedProduct === product.id 
                  ? 'ring-2 ring-green-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProduct(product.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center items-center gap-2 mb-2">
                  {getPopularBadge(product.id)}
                  {getBestValueBadge(product.id)}
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.credits} Credits
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Instant delivery</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>No expiration</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Secure payment</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={selectedProduct === product.id ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePurchase(product.id)
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing && selectedProduct === product.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Buy Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Payment Information:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Secure payment processing by Creem</li>
            <li>• Credits are added instantly after successful payment</li>
            <li>• All payments are processed securely and encrypted</li>
            <li>• You can cancel anytime before completing payment</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
