"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
  category: string
  mascot: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem("cart", JSON.stringify(items))
      } else {
        localStorage.removeItem("cart")
      }
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color,
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, item]
      }
    })
  }

  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

  // Calculate shipping cost - 20 AED for orders under 299 AED, free for orders over 299 AED
  const shipping = subtotal < 299 ? 20 : 0

  // Calculate total
  const total = useMemo(() => {
    return subtotal + shipping
  }, [subtotal, shipping])

  // Calculate item count
  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<CartContextType>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      total,
    }),
    [items, itemCount, subtotal, total],
  )

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

