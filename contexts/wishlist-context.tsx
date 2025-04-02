"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react"

type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
  category: string
  mascot: string
  tag?: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (itemId: number) => void
  clearWishlist: () => void
  isInWishlist: (itemId: number) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
  itemCount: 0,
})

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = typeof window !== "undefined" ? localStorage.getItem("wishlist") : null
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem("wishlist", JSON.stringify(items))
      } else {
        localStorage.removeItem("wishlist")
      }
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error)
    }
  }, [items])

  const addItem = (item: WishlistItem) => {
    setItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems
      } else {
        return [...prevItems, item]
      }
    })
  }

  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const clearWishlist = () => {
    setItems([])
  }

  const isInWishlist = (itemId: number) => {
    return items.some((item) => item.id === itemId)
  }

  // Calculate item count
  const itemCount = useMemo(() => items.length, [items])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<WishlistContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist,
      itemCount,
    }),
    [items, itemCount],
  )

  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

