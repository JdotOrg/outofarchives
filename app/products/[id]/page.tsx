"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Minus, Plus, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  description: string
  features: string[]
  sizes: string[]
  images: string[]
  category: string
  mascot: string
  inStock?: boolean
  tag?: string
  compareAtPrice?: number
  image?: string
}

interface RelatedProduct {
  id: number
  name: string
  price: number
  image: string
  category: string
  mascot: string
  inStock?: boolean
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addedToCartOpen, setAddedToCartOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { addItem: addToCart } = useCart()
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const params = useParams()
  const productId = Number(params.id)

  useEffect(() => {
    // Reset state when product ID changes
    setSelectedSize("")
    setQuantity(1)
    setLoading(true)

    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    const mockProducts: Record<number, Product> = {
      1: {
        id: 1,
        name: "Archive Hoodie",
        price: 249,
        description:
          "Our signature Archive Hoodie features a relaxed fit with premium cotton blend fabric for ultimate comfort. Each piece is inspired by the rich history of computing and features subtle details that tech enthusiasts will appreciate.",
        features: [
          "80% cotton, 20% polyester",
          "Relaxed fit",
          "Drawstring hood",
          "Front kangaroo pocket",
          "Ribbed cuffs and hem",
          "Machine washable",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600&text=Archive+Hoodie+2",
          "/placeholder.svg?height=600&width=600&text=Archive+Hoodie+3",
        ],
        category: "hoodies",
        mascot: "Menguin",
        tag: "New Arrival",
        compareAtPrice: 299,
        image: "/placeholder.svg?height=600&width=600",
      },
      2: {
        id: 2,
        name: "Retro Tee",
        price: 149,
        description:
          "Our Retro Tee celebrates the golden era of computing with a vintage-inspired design. Made from 100% organic cotton for a soft feel and sustainable approach to fashion.",
        features: [
          "100% organic cotton",
          "Regular fit",
          "Crew neck",
          "Screen-printed graphics",
          "Pre-shrunk fabric",
          "Machine washable",
        ],
        sizes: ["S", "M", "L", "XL"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Retro+Tee",
          "/placeholder.svg?height=600&width=600&text=Retro+Tee+2",
          "/placeholder.svg?height=600&width=600&text=Retro+Tee+3",
        ],
        category: "t-shirts",
        mascot: "Menguin",
        image: "/placeholder.svg?height=600&width=600&text=Retro+Tee",
      },
      3: {
        id: 3,
        name: "Digital Dreams Hoodie",
        price: 279,
        description:
          "The Digital Dreams Hoodie features a futuristic design inspired by the digital landscape. Made with our premium heavyweight fabric for durability and warmth.",
        features: [
          "70% cotton, 30% polyester",
          "Heavyweight fabric (400 gsm)",
          "Oversized fit",
          "Embroidered details",
          "Hidden media pocket with headphone routing",
          "Machine washable",
        ],
        sizes: ["S", "M", "L", "XL"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Digital+Dreams",
          "/placeholder.svg?height=600&width=600&text=Digital+Dreams+2",
          "/placeholder.svg?height=600&width=600&text=Digital+Dreams+3",
        ],
        category: "hoodies",
        mascot: "Pixelbot",
        inStock: false,
        image: "/placeholder.svg?height=600&width=600&text=Digital+Dreams",
      },
      4: {
        id: 4,
        name: "Mascot Sticker Pack",
        price: 49,
        description:
          "Decorate your laptop, water bottle, or notebook with our exclusive mascot sticker pack. Featuring all your favorite Out of Archives mascots in high-quality vinyl.",
        features: [
          "Set of 6 stickers",
          "Waterproof vinyl",
          "UV resistant",
          "Durable adhesive",
          "Die-cut precision",
          "Approximately 2-3 inches each",
        ],
        sizes: ["One Size"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Sticker+Pack",
          "/placeholder.svg?height=600&width=600&text=Sticker+Pack+2",
          "/placeholder.svg?height=600&width=600&text=Sticker+Pack+3",
        ],
        category: "stickers",
        mascot: "Various",
        image: "/placeholder.svg?height=600&width=600&text=Sticker+Pack",
      },
      5: {
        id: 5,
        name: "Vintage Computing Tee",
        price: 139,
        description:
          "A tribute to the pioneers of computing, this tee features vintage computer designs that celebrate the technology that changed the world.",
        features: [
          "100% combed cotton",
          "Medium weight (180 gsm)",
          "Relaxed fit",
          "Vintage wash finish",
          "Ribbed crew neck",
          "Machine washable",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Vintage+Computing",
          "/placeholder.svg?height=600&width=600&text=Vintage+Computing+2",
          "/placeholder.svg?height=600&width=600&text=Vintage+Computing+3",
        ],
        category: "t-shirts",
        mascot: "Bitbot",
        image: "/placeholder.svg?height=600&width=600&text=Vintage+Computing",
      },
      6: {
        id: 6,
        name: "Code Breaker Hoodie",
        price: 259,
        description:
          "The Code Breaker Hoodie features subtle code patterns and programming references that only true developers will recognize.",
        features: [
          "80% cotton, 20% recycled polyester",
          "Medium weight (350 gsm)",
          "Standard fit",
          "Hidden code patterns in design",
          "Interior pocket for small devices",
          "Machine washable",
        ],
        sizes: ["S", "M", "L", "XL"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Code+Breaker",
          "/placeholder.svg?height=600&width=600&text=Code+Breaker+2",
          "/placeholder.svg?height=600&width=600&text=Code+Breaker+3",
        ],
        category: "hoodies",
        mascot: "Bitbot",
        image: "/placeholder.svg?height=600&width=600&text=Code+Breaker",
      },
      7: {
        id: 7,
        name: "Pixel Art Sticker Set",
        price: 39,
        description:
          "Celebrate the art of pixels with this nostalgic sticker set featuring classic pixel art designs from the early days of gaming and computing.",
        features: [
          "Set of 8 stickers",
          "High-quality vinyl",
          "Weather-resistant",
          "Removable without residue",
          "Pixel-perfect designs",
          "Approximately 1-2 inches each",
        ],
        sizes: ["One Size"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Pixel+Art+Stickers",
          "/placeholder.svg?height=600&width=600&text=Pixel+Art+Stickers+2",
          "/placeholder.svg?height=600&width=600&text=Pixel+Art+Stickers+3",
        ],
        category: "stickers",
        mascot: "Pixelbot",
        image: "/placeholder.svg?height=600&width=600&text=Pixel+Art+Stickers",
      },
      8: {
        id: 8,
        name: "Developer Tee",
        price: 129,
        description:
          "A minimalist tee designed for developers, with subtle code references and a clean aesthetic that works both in and out of the office.",
        features: [
          "95% cotton, 5% elastane",
          "Lightweight (160 gsm)",
          "Slim fit",
          "Subtle code pattern on sleeve",
          "Pre-washed to prevent shrinkage",
          "Machine washable",
        ],
        sizes: ["S", "M", "L", "XL"],
        images: [
          "/placeholder.svg?height=600&width=600&text=Developer+Tee",
          "/placeholder.svg?height=600&width=600&text=Developer+Tee+2",
          "/placeholder.svg?height=600&width=600&text=Developer+Tee+3",
        ],
        category: "t-shirts",
        mascot: "Menguin",
        image: "/placeholder.svg?height=600&width=600&text=Developer+Tee",
      },
    }

    // Get related products (different from current product)
    const mockRelatedProducts: RelatedProduct[] = Object.values(mockProducts)
      .filter((p) => p.id !== productId)
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.images[0],
        category: p.category,
        mascot: p.mascot,
        inStock: p.inStock,
      }))
      .slice(0, 4) // Limit to 4 related products

    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts[productId]
      setProduct(foundProduct || null)
      setRelatedProducts(mockRelatedProducts)
      if (foundProduct && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0])
      }
      setLoading(false)
    }, 500)
  }, [productId])

  const isWishlisted = product ? isInWishlist(product.id) : false

  const handleAddToCart = () => {
    if (!product) return

    if (product.category !== "stickers" && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: product.category !== "stickers" ? selectedSize : undefined,
    })

    setAddedToCartOpen(true)
  }

  const handleToggleWishlist = () => {
    if (!product) return

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
        mascot: product.mascot,
      })
      toast({
        title: "Added to wishlist",
        description: user ? `${product.name} has been added to your wishlist.` : "Sign in to view your wishlist items.",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Out of Archives Product",
          text: `Check out ${product?.name} on Out of Archives!`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this product with others.",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const inStock = product.inStock !== false
  const sizes = product.sizes

  const toggleWishlist = () => {
    if (!product) return

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "/placeholder.svg",
        category: product.category,
        mascot: product.mascot,
      })
      toast({
        title: "Added to wishlist",
        description: user ? `${product.name} has been added to your wishlist.` : "Sign in to view your wishlist items.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
          {product.tag && (
            <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {product.tag}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2">
            <p className="text-xl md:text-2xl font-bold">{product.price} AED</p>
            {product.compareAtPrice && (
              <p className="ml-2 text-muted-foreground line-through">{product.compareAtPrice} AED</p>
            )}
          </div>

          <div className="mt-4 space-y-6">
            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="size">Size</Label>
                <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setSizeGuideOpen(true)}>
                  Size Guide
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`h-10 px-3 rounded-md ${selectedSize === size ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity" className="mb-2 block">
                Quantity
              </Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  className="h-10 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn("w-full", isWishlisted && "text-orange-600 border-orange-600 hover:bg-orange-50")}
                onClick={toggleWishlist}
              >
                {isWishlisted ? (
                  <>
                    <Heart className="mr-2 h-4 w-4 fill-orange-600" /> Wishlisted
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                  </>
                )}
              </Button>
            </div>

            {/* Share Button */}
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleShare}>
              <Share className="mr-2 h-4 w-4" /> Share
            </Button>

            {/* Product Description */}
            <div className="mt-6 pt-6 border-t">
              <h2 className="font-medium mb-2">Description</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-4">
              <h2 className="font-medium mb-2">Details</h2>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Material: 100% Cotton</li>
                <li>Mascot: {product.mascot}</li>
                <li>Category: {product.category}</li>
                <li>Made in UAE</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-sm md:text-base line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.price} AED</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Added to Cart Dialog */}
      <Dialog open={addedToCartOpen} onOpenChange={setAddedToCartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Added to Cart</DialogTitle>
            <DialogDescription>{product.name} has been added to your cart.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-muted-foreground">
                {product.category !== "stickers" && `Size: ${selectedSize}`}
                {product.category !== "stickers" && " • "}
                Qty: {quantity}
              </p>
              <p className="font-medium mt-1">{product.price} AED</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button variant="outline" onClick={() => setAddedToCartOpen(false)} className="sm:flex-1">
              Continue Shopping
            </Button>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 sm:flex-1">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

