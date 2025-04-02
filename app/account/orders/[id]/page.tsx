"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle, XCircle, MapPin } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

type OrderStatus = "complete" | "failed"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size?: string
}

interface Order {
  id: string
  date: string
  total: number
  status: OrderStatus
  items: OrderItem[]
  shippingAddress?: {
    name: string
    address: string
    city: string
    postalCode: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrderDetailPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  const { addItem: addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    // In a real app, this would fetch the specific order from an API
    // For demo purposes, we'll use mock data
    const mockOrders: Record<string, Order> = {
      OA12345: {
        id: "OA12345",
        date: "2025-03-15",
        total: 527,
        status: "complete",
        items: [
          {
            id: 1,
            name: "Archive Hoodie",
            price: 249,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            size: "M",
          },
          {
            id: 2,
            name: "Retro Tee",
            price: 149,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            size: "L",
          },
          {
            id: 4,
            name: "Mascot Sticker Pack",
            price: 49,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St, Apt 4B",
          city: "Dubai",
          postalCode: "12345",
        },
        trackingNumber: "TRK123456789",
        estimatedDelivery: "2025-03-20",
      },
      OA12346: {
        id: "OA12346",
        date: "2025-03-01",
        total: 279,
        status: "complete",
        items: [
          {
            id: 3,
            name: "Digital Dreams Hoodie",
            price: 279,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            size: "L",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St, Apt 4B",
          city: "Dubai",
          postalCode: "12345",
        },
        trackingNumber: "TRK987654321",
        estimatedDelivery: "2025-03-10",
      },
      OA12347: {
        id: "OA12347",
        date: "2025-02-15",
        total: 139,
        status: "failed",
        items: [
          {
            id: 9,
            name: "Minimalist Tee",
            price: 139,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            size: "S",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St, Apt 4B",
          city: "Dubai",
          postalCode: "12345",
        },
      },
      OA12348: {
        id: "OA12348",
        date: "2025-02-01",
        total: 269,
        status: "complete",
        items: [
          {
            id: 11,
            name: "Eco Friendly Hoodie",
            price: 269,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            size: "XL",
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St, Apt 4B",
          city: "Dubai",
          postalCode: "12345",
        },
        estimatedDelivery: "2025-02-10",
      },
    }

    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrders[orderId]
      setOrder(foundOrder || null)
      setLoading(false)
    }, 500)
  }, [user, router, orderId])

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "complete":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Order Complete
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            Order Failed
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" asChild className="pl-0">
              <Link href="/account/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
          </div>
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" asChild className="pl-0">
              <Link href="/account/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Order not found</h3>
              <p className="text-muted-foreground mb-4">
                The order you're looking for doesn't exist or you don't have access to it.
              </p>
              <Button asChild>
                <Link href="/account/orders">View All Orders</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" asChild className="pl-0">
            <Link href="/account/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    Order #{order.id}
                    <span className="ml-2">{getStatusBadge(order.status)}</span>
                  </CardTitle>
                  <CardDescription>Placed on {formatDate(order.date)}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="font-medium">{order.total} AED</div>
                  <CardDescription>{order.items.length} item(s)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Order Status */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    {getStatusIcon(order.status)}
                    <h3 className="font-medium ml-2">Order Status</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.status === "complete" && "Your order has been completed successfully."}
                    {order.status === "failed" &&
                      "Your order has failed. Please contact customer support for assistance."}
                  </p>

                  {order.trackingNumber && order.status === "complete" && (
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                      </p>
                    </div>
                  )}

                  {order.estimatedDelivery && order.status === "complete" && (
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Estimated Delivery:</span> {formatDate(order.estimatedDelivery)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                      Shipping Address
                    </h3>
                    <div className="text-sm">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-border last:border-0"
                      >
                        <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                            {item.size && ` • ${item.size}`}
                          </div>
                        </div>
                        <div className="text-right self-end sm:self-auto">
                          <div className="font-medium">{item.price} AED</div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity > 1 && `${item.price} AED each`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div>
                  <h3 className="font-medium mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{order.total - (order.total >= 299 ? 0 : 20)} AED</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{order.total >= 299 ? "Free" : "20 AED"}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{order.total} AED</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  {order.status === "complete" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Add all items from this order to the cart
                        order.items.forEach((item) => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: item.quantity,
                            size: item.size,
                            category: "Clothing", // Default category
                            mascot: "Archive", // Default mascot
                          })
                        })

                        // Show success toast
                        toast({
                          title: "Items added to cart",
                          description: "All items from this order have been added to your cart.",
                        })

                        // Navigate to cart
                        router.push("/cart")
                      }}
                      className="w-full sm:w-auto"
                    >
                      Buy Again
                    </Button>
                  )}

                  <Button asChild className="w-full sm:w-auto sm:ml-auto">
                    <Link href="/contact">Need Help?</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

