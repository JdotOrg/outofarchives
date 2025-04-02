"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export default function HoodiesPage() {
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  // In a real app, this would be fetched from an API
  useEffect(() => {
    // Filter products that are hoodies
    const hoodieProducts = [
      {
        id: 1,
        name: "Archive Hoodie",
        price: 249,
        image: "/placeholder.svg?height=400&width=300",
        category: "Hoodie",
        tag: "Best Seller",
        mascot: "Pixel Panda",
      },
      {
        id: 3,
        name: "Digital Dreams Hoodie",
        price: 279,
        image: "/placeholder.svg?height=400&width=300",
        category: "Hoodie",
        tag: "Limited Edition",
        mascot: "Digital Dolphin",
      },
      {
        id: 6,
        name: "Byte Basics Hoodie",
        price: 249,
        image: "/placeholder.svg?height=400&width=300",
        category: "Hoodie",
        mascot: "Byte Bear",
      },
      {
        id: 11,
        name: "Eco Friendly Hoodie",
        price: 269,
        image: "/placeholder.svg?height=400&width=300",
        category: "Hoodie",
        tag: "Sustainable",
        mascot: "Eco Eagle",
      },
    ]

    setProducts(hoodieProducts)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hoodies</h1>
            <p className="text-muted-foreground">Our collection of premium hoodies featuring unique mascot designs</p>
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

