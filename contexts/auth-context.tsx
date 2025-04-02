"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type Address = {
  id: string
  name: string
  address: string
  city: string
  country: string
  postalCode: string
  phone?: string
}

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  addresses: Address[]
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  signOut: () => void
  googleAuth: () => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
  deleteAccount: () => Promise<boolean>
  addAddress: (address: Omit<Address, "id">) => Promise<boolean>
  updateAddress: (address: Address) => Promise<boolean>
  removeAddress: (addressId: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
  googleAuth: async () => false,
  resetPassword: async () => false,
  deleteAccount: async () => false,
  addAddress: async () => false,
  updateAddress: async () => false,
  removeAddress: async () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  // Simulate loading user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful sign in
    const mockUser: User = {
      id: "user123",
      firstName: "John",
      lastName: "Doe",
      email,
      addresses: [
        {
          id: "address1",
          name: "Home",
          address: "123 Main St, Apt 4B",
          city: "Dubai",
          country: "United Arab Emirates",
          postalCode: "12345",
          phone: "+971555555555",
        },
      ],
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    // Show welcome toast
    toast({
      title: "Welcome back!",
      description: `You've successfully signed in as ${email}`,
    })

    return true
  }

  // Mock sign up function
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful sign up
    const mockUser: User = {
      id: "user123",
      firstName,
      lastName,
      email,
      addresses: [],
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    // Show welcome toast
    toast({
      title: "Welcome to Out of Archives!",
      description: `Your account has been created successfully.`,
    })

    return true
  }

  // Mock sign out function
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")

    // Show logout toast
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    })
  }

  // Mock Google authentication
  const googleAuth = async () => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful Google sign in
    const mockUser: User = {
      id: "user456",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      addresses: [],
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    // Show welcome toast
    toast({
      title: "Welcome!",
      description: "You've successfully signed in with Google.",
    })

    return true
  }

  // Mock reset password function
  const resetPassword = async (email: string) => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return true
  }

  // Mock delete account function
  const deleteAccount = async () => {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser(null)
    localStorage.removeItem("user")
    return true
  }

  // Mock add address function
  const addAddress = async (address: Omit<Address, "id">) => {
    if (!user) return false

    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newAddress: Address = {
      ...address,
      id: `address${user.addresses.length + 1}`,
    }

    const updatedUser = {
      ...user,
      addresses: [...user.addresses, newAddress],
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  // Mock update address function
  const updateAddress = async (address: Address) => {
    if (!user) return false

    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedAddresses = user.addresses.map((addr) => (addr.id === address.id ? address : addr))

    const updatedUser = {
      ...user,
      addresses: updatedAddresses,
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  // Mock remove address function
  const removeAddress = async (addressId: string) => {
    if (!user) return false

    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedAddresses = user.addresses.filter((addr) => addr.id !== addressId)

    const updatedUser = {
      ...user,
      addresses: updatedAddresses,
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        googleAuth,
        resetPassword,
        deleteAccount,
        addAddress,
        updateAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

