"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export default function StickersPage() {
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  // In a real app, this would be fetched from an API
  useEffect(() => {
    // Filter products that are stickers
    const stickerProducts = [
      {
        id: 4,
        name: "Mascot Sticker Pack",
        price: 49,
        image: "/placeholder.svg?height=400&width=300",
        category: "Stickers",
        tag: "New Arrival",
        mascot: "Menguin",
      },
      {
        id: 8,
        name: "Retro Gaming Stickers",
        price: 39,
        image: "/placeholder.svg?height=400&width=300",
        category: "Stickers",
        mascot: "Menguin",
      },
      {
        id: 12,
        name: "Mascot Collection Stickers",
        price: 45,
        image: "/placeholder.svg?height=400&width=300",
        category: "Stickers",
        mascot: "Menguin",
      },
    ]

    setProducts(stickerProducts)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Stickers</h1>
            <p className="text-muted-foreground">Our collection of premium stickers featuring unique mascot designs</p>
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

