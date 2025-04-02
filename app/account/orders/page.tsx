"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle, XCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    // In a real app, this would fetch orders from an API
    // For demo purposes, we'll use mock data
    const mockOrders: Order[] = [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 500)
  }, [user, router])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
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

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <Link href={`/account/orders/${order.id}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="flex items-center flex-wrap gap-2 text-base sm:text-lg">
                          Order #{order.id}
                          <span>{getStatusBadge(order.status)}</span>
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Placed on {formatDate(order.date)}
                        </CardDescription>
                      </div>
                      <div className="sm:text-right">
                        <div className="font-medium">{order.total} AED</div>
                        <CardDescription className="text-xs sm:text-sm">{order.items.length} item(s)</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-2 text-xs sm:text-sm">
                            {order.status === "complete" ? "Your order has been completed" : "Your order has failed"}
                          </span>
                        </div>
                        <ChevronRight className="ml-auto h-5 w-5" />
                      </div>
                      <Separator />
                      <div className="text-xs sm:text-sm line-clamp-2">
                        <span className="font-medium">Items:</span> {order.items.map((item) => item.name).join(", ")}
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

