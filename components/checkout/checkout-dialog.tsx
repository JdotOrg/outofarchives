"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GuestCheckoutForm } from "@/components/checkout/guest-checkout-form"
import { UserCheckoutForm } from "@/components/checkout/user-checkout-form"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Image from "next/image"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
}

type OrderStatus = "processing" | "success" | "failed" | "canceled" | null

export function CheckoutDialog({ open, onOpenChange, total }: CheckoutDialogProps) {
  const [activeTab, setActiveTab] = useState<string>("guest")
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(null)
  const { user } = useAuth()

  // Calculate shipping cost based on total
  const shippingCost = total >= 299 ? 0 : 20
  const finalTotal = total + shippingCost

  const handleOrderComplete = () => {
    // Ensure we're not trying to access properties of null
    try {
      setOrderStatus("processing")

      setTimeout(() => {
        setOrderStatus("success")

        setTimeout(() => {
          onOpenChange(false)
          setOrderStatus(null)
        }, 3000)
      }, 2000)
    } catch (error) {
      console.error("Error in order completion:", error)
      setOrderStatus("failed")
    }
  }

  // For demo purposes, we'll add buttons to simulate different order statuses
  const simulateOrderFailed = () => {
    setOrderStatus("failed")
  }

  const simulateOrderCanceled = () => {
    setOrderStatus("canceled")
  }

  const resetOrderStatus = () => {
    setOrderStatus(null)
  }

  // Render order status screens
  if (orderStatus) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {orderStatus === "processing" && "Processing Order"}
              {orderStatus === "success" && "Order Confirmed"}
              {orderStatus === "failed" && "Order Failed"}
              {orderStatus === "canceled" && "Order Canceled"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-8 text-center">
            {orderStatus === "processing" && (
              <>
                <div className="animate-spin h-16 w-16 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-lg">Processing your order...</p>
                <p className="text-muted-foreground mt-2">Please wait while we process your payment.</p>
              </>
            )}

            {orderStatus === "success" && (
              <>
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <p className="text-lg">Your order has been confirmed!</p>
                <p className="text-muted-foreground mt-2">Order #OA12345 has been placed successfully.</p>
                <p className="text-muted-foreground">You will receive a confirmation email shortly.</p>
              </>
            )}

            {orderStatus === "failed" && (
              <>
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <p className="text-lg">Payment failed</p>
                <p className="text-muted-foreground mt-2">There was an issue processing your payment.</p>
                <p className="text-muted-foreground">Please try again or use a different payment method.</p>
                <Button className="mt-6" onClick={resetOrderStatus}>
                  Try Again
                </Button>
              </>
            )}

            {orderStatus === "canceled" && (
              <>
                <AlertCircle className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                <p className="text-lg">Order canceled</p>
                <p className="text-muted-foreground mt-2">Your order has been canceled.</p>
                <p className="text-muted-foreground">No charges have been made to your account.</p>
                <Button className="mt-6" onClick={resetOrderStatus}>
                  Back to Checkout
                </Button>
              </>
            )}
          </div>

          {/* For demo purposes only - buttons to simulate different statuses */}
          {process.env.NODE_ENV === "development" && orderStatus === "processing" && (
            <div className="flex gap-2 justify-center mt-4 border-t pt-4">
              <Button size="sm" variant="outline" onClick={simulateOrderFailed}>
                Simulate Failure
              </Button>
              <Button size="sm" variant="outline" onClick={simulateOrderCanceled}>
                Simulate Cancel
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Checkout</DialogTitle>
        </DialogHeader>

        {user ? (
          <UserCheckoutForm total={finalTotal} shippingCost={shippingCost} onOrderComplete={handleOrderComplete} />
        ) : (
          <Tabs defaultValue="guest" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guest">Guest Checkout</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="guest">
              <GuestCheckoutForm total={finalTotal} shippingCost={shippingCost} onOrderComplete={handleOrderComplete} />
            </TabsContent>
            <TabsContent value="signin">
              <div className="py-6 text-center">
                <p className="mb-4">Sign in to access your saved addresses and faster checkout.</p>
                <div className="flex justify-center gap-4 mt-6">
                  <Button variant="outline" onClick={() => setActiveTab("guest")}>
                    Continue as Guest
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">Sign In</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Secure Payment Powered by Telr</p>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <div className="flex items-center justify-center h-8 w-12 bg-white rounded border">
                <Image src="/payment/visa.svg" alt="Visa" width={30} height={20} />
              </div>
              <div className="flex items-center justify-center h-8 w-12 bg-white rounded border">
                <Image src="/payment/mastercard.svg" alt="Mastercard" width={30} height={20} />
              </div>
              <div className="flex items-center justify-center h-8 w-12 bg-white rounded border">
                <Image src="/payment/apple-pay.svg" alt="Apple Pay" width={30} height={20} />
              </div>
              <div className="flex items-center justify-center h-8 w-12 bg-white rounded border">
                <Image src="/payment/tabby.svg" alt="Tabby" width={30} height={20} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

