"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Trash2, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SignInDialog } from "@/components/auth/sign-in-dialog"

export default function WishlistPage() {
  const { user } = useAuth()
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()
  const { toast } = useToast()
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
      size: "M", // Default size
      color: "Black", // Default color
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromWishlist = (id: number, name: string) => {
    removeItem(id)

    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  const handleClearWishlist = () => {
    clearWishlist()
    setClearDialogOpen(false)

    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  // If not logged in, show sign-in prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

          <div className="text-center py-12 border rounded-xl">
            <div className="mb-6 flex justify-center">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Sign in to view your wishlist</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Please sign in to view and manage your wishlist items. Creating an account allows you to save your
              favorite products.
            </p>
            <Button onClick={() => setAuthDialogOpen(true)} className="bg-orange-600 hover:bg-orange-700">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </div>

          <SignInDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>

          {items.length > 0 && (
            <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Wishlist
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear your wishlist?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all items from your wishlist. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearWishlist} className="bg-red-600 hover:bg-red-700">
                    Clear Wishlist
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Add items to your wishlist to keep track of products you're interested in.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="border rounded-xl p-4 flex flex-col">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </Link>

                  {item.tag && <Badge className="absolute top-2 left-2 bg-orange-600">{item.tag}</Badge>}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-sm"
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </div>

                <div className="flex-1">
                  <Link href={`/products/${item.id}`} className="block">
                    <h3 className="font-medium hover:text-orange-600">{item.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center mt-1 mb-4">
                    <p className="text-sm text-muted-foreground">{item.mascot}</p>
                    <p className="font-semibold">{item.price} AED</p>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={() => handleAddToCart(item)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

