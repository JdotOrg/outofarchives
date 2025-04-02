"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SignInDialog } from "@/components/auth/sign-in-dialog"

// Define available promo codes
const PROMO_CODES = {
  WELCOME10: { discount: 0.1, description: "10% off your order" },
  SUMMER20: { discount: 0.2, description: "20% off your order" },
  FREESHIP: { discount: 0, freeShipping: true, description: "Free shipping on your order" },
}

export default function CartPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string
    discount: number
    freeShipping?: boolean
  } | null>(null)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [orderSuccessDialog, setOrderSuccessDialog] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  // Calculate shipping cost - 20 AED for orders under 299 AED, free for orders over 299 AED
  // Apply free shipping if promo code provides it
  const baseShipping = subtotal < 299 ? 20 : 0
  const shipping = appliedPromo?.freeShipping ? 0 : baseShipping

  // Calculate discount amount
  const discountAmount = appliedPromo?.discount ? Math.round(subtotal * appliedPromo.discount) : 0

  // Calculate final total
  const total = subtotal + shipping - discountAmount

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()

    if (!user) {
      setShowCheckoutDialog(true)
    } else {
      // Navigate to checkout page
      router.push("/checkout")
    }
  }

  const handleGuestCheckout = () => {
    setShowCheckoutDialog(false)
    router.push("/checkout?guest=true")
  }

  const handleSignIn = () => {
    setShowCheckoutDialog(false)
    setAuthDialogOpen(true)
  }

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return

    setIsApplyingPromo(true)

    // Simulate API call to validate promo code
    setTimeout(() => {
      const code = promoCode.toUpperCase()
      const validPromo = PROMO_CODES[code as keyof typeof PROMO_CODES]

      if (validPromo) {
        setAppliedPromo({
          code,
          discount: validPromo.discount,
          freeShipping: validPromo.freeShipping,
        })

        toast({
          title: "Promo code applied",
          description: validPromo.description,
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h2 className="font-medium">Cart Items ({items.length})</h2>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                    <div className="relative h-32 sm:h-32 sm:w-32 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between mb-2">
                        <Link href={`/products/${item.id}`} className="font-medium hover:text-orange-600">
                          {item.name}
                        </Link>
                        <p className="font-semibold">{item.price} AED</p>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <p>
                          {item.category} • {item.mascot}
                        </p>
                        <p>Size: {item.size}</p>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity - 1)
                              toast({
                                title: "Quantity updated",
                                description: `${item.name} quantity decreased to ${item.quantity - 1}.`,
                              })
                            }}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity + 1)
                              toast({
                                title: "Quantity updated",
                                description: `${item.name} quantity increased to ${item.quantity + 1}.`,
                              })
                            }}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-auto"
                          onClick={() => {
                            removeItem(item.id)
                            toast({
                              title: "Item removed",
                              description: `${item.name} has been removed from your cart.`,
                            })
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="bg-muted rounded-lg p-6 sticky top-20">
                <h2 className="font-medium mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{subtotal} AED</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{discountAmount} AED</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `${shipping} AED`}</span>
                  </div>
                  {baseShipping > 0 && !appliedPromo?.freeShipping && (
                    <div className="text-xs text-muted-foreground">Free shipping on orders over 299 AED</div>
                  )}
                  {appliedPromo?.freeShipping && (
                    <div className="text-xs text-green-600">Free shipping applied with promo code</div>
                  )}

                  {/* Promo Code */}
                  <div className="pt-2">
                    <div className="flex gap-2 mb-1">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="h-9"
                        disabled={!!appliedPromo}
                      />
                      {appliedPromo ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAppliedPromo(null)}
                          className="whitespace-nowrap"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleApplyPromo}
                          disabled={isApplyingPromo || !promoCode.trim()}
                          className="whitespace-nowrap"
                        >
                          <Tag className="h-4 w-4 mr-1" />
                          Apply
                        </Button>
                      )}
                    </div>
                    {appliedPromo && <p className="text-xs text-green-600">Promo code {appliedPromo.code} applied!</p>}
                  </div>

                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{total} AED</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleCheckout}>
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-xs text-center text-muted-foreground">Taxes calculated at checkout</div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">We Accept</h3>
                  <div className="flex items-center space-x-4">
                    <div className="h-6 w-12 relative">
                      <Image src="/payment/visa.png" alt="Visa" fill className="object-contain" />
                    </div>
                    <div className="h-6 w-12 relative">
                      <Image src="/payment/mastercard.png" alt="Mastercard" fill className="object-contain" />
                    </div>
                    <div className="h-6 w-12 relative">
                      <Image src="/payment/apple-pay.svg" alt="Apple Pay" fill className="object-contain" />
                    </div>
                    <div className="h-6 w-12 relative">
                      <Image src="/payment/amex.svg" alt="American Express" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout Options</DialogTitle>
            <DialogDescription>Sign in for a faster checkout experience or continue as a guest.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Button onClick={handleSignIn} className="w-full bg-orange-600 hover:bg-orange-700">
              Sign In
            </Button>
            <Button onClick={handleGuestCheckout} variant="outline" className="w-full">
              Continue as Guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign In Dialog */}
      <SignInDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} redirectUrl="/checkout" />
    </div>
  )
}

