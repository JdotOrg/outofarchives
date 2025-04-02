"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export default function TShirtsPage() {
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  // In a real app, this would be fetched from an API
  useEffect(() => {
    // Filter products that are t-shirts
    const tshirtProducts = [
      {
        id: 2,
        name: "Retro Tee",
        price: 149,
        image: "/placeholder.svg?height=400&width=300",
        category: "T-Shirt",
        tag: "New Arrival",
        mascot: "Byte Bear",
      },
      {
        id: 5,
        name: "Pixel Art Tee",
        price: 159,
        image: "/placeholder.svg?height=400&width=300",
        category: "T-Shirt",
        mascot: "Pixel Panda",
      },
      {
        id: 9,
        name: "Minimalist Tee",
        price: 139,
        image: "/placeholder.svg?height=400&width=300",
        category: "T-Shirt",
        mascot: "Minimal Mouse",
      },
      {
        id: 10,
        name: "Archive Basics Tee",
        price: 129,
        image: "/placeholder.svg?height=400&width=300",
        category: "T-Shirt",
        mascot: "Pixel Panda",
      },
    ]

    setProducts(tshirtProducts)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">T-Shirts</h1>
            <p className="text-muted-foreground">Our collection of premium t-shirts featuring unique mascot designs</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/products")}>
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

