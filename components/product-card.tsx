"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    tag?: string
    mascot: string
    inStock?: boolean
  }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const isWishlisted = isInWishlist(product.id)

  // Default to in stock if not specified
  const inStock = product.inStock !== false

  const toggleWishlist = (e: React.MouseEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: user ? `${product.name} has been added to your wishlist.` : "Sign in to view your wishlist items.",
      })
    }
  }

  return (
    <div className={cn("group relative", className)}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name || "Product"}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              !inStock && "opacity-60",
            )}
          />

          {product.tag && (
            <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {product.tag}
            </div>
          )}

          {!inStock && (
            <Badge variant="destructive" className="absolute top-2 left-2 bg-red-600 text-white text-xs">
              Out of Stock
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-sm z-10 h-8 w-8"
            onClick={toggleWishlist}
            type="button"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted ? "fill-orange-600 text-orange-600" : "text-gray-600",
              )}
            />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-px bg-red-600 rotate-45 transform origin-center"></div>
            </div>
          )}
        </div>
        <div className="mt-2 px-1">
          <h3 className={cn("font-medium text-sm sm:text-base line-clamp-1", !inStock && "text-muted-foreground")}>
            {product.name}
          </h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{product.mascot}</p>
            <p className={cn("font-semibold text-sm sm:text-base", !inStock && "text-muted-foreground")}>
              {product.price} AED
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

