"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Plus, MapPin, CreditCard, Trash, Edit } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface UserCheckoutFormProps {
  total: number
  onOrderComplete?: () => void
}

export function UserCheckoutForm({ total, onOrderComplete }: UserCheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const { user, addAddress, removeAddress, updateAddress } = useAuth()
  const { toast } = useToast()
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "Dubai",
    postalCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "failed" | "canceled">("idle")

  // Calculate shipping cost based on subtotal
  const subtotal = total
  const shippingCost = subtotal < 299 ? 30 : 0
  const finalTotal = subtotal + shippingCost

  // Get saved addresses from user context
  const savedAddresses = user?.addresses || []

  // Set default address if available
  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(savedAddresses[0].id)
    }
  }, [savedAddresses, selectedAddress])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful order
      setOrderStatus("success")

      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and will be processed soon.",
        variant: "default",
      })

      if (onOrderComplete) {
        onOrderComplete()
      }
    } catch (error) {
      setOrderStatus("failed")

      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (editingAddress) {
        // Update existing address
        const success = await updateAddress({
          id: editingAddress.id,
          name: newAddress.name,
          address: newAddress.address,
          city: newAddress.city,
          country: "United Arab Emirates",
          postalCode: newAddress.postalCode,
        })

        if (success) {
          toast({
            title: "Address updated",
            description: "Your address has been updated successfully.",
          })
        }
      } else {
        // Add new address
        const success = await addAddress({
          name: newAddress.name,
          address: newAddress.address,
          city: newAddress.city,
          country: "United Arab Emirates",
          postalCode: newAddress.postalCode,
        })

        if (success) {
          toast({
            title: "Address added",
            description: "Your new address has been added successfully.",
          })

          // Set the newly added address as selected
          const newAddressId = `address${user?.addresses.length || 1}`
          setSelectedAddress(newAddressId)
        }
      }

      // Reset form and close dialog
      setShowNewAddressForm(false)
      setEditingAddress(null)
      setNewAddress({
        name: "",
        address: "",
        city: "Dubai",
        postalCode: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const success = await removeAddress(addressId)
      if (success && selectedAddress === addressId) {
        // If the deleted address was selected, select another one if available
        if (savedAddresses.length > 1) {
          const remainingAddresses = savedAddresses.filter((addr) => addr.id !== addressId)
          setSelectedAddress(remainingAddresses[0].id)
        } else {
          setSelectedAddress("")
        }
      }

      toast({
        title: "Address removed",
        description: "The address has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove address. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditAddress = (address: any) => {
    setEditingAddress(address)
    setNewAddress({
      name: address.name,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode,
    })
    setShowNewAddressForm(true)
  }

  // If order is completed, show success message
  if (orderStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Thank you for your purchase. Your order has been placed and will be processed soon. You will receive an email
          confirmation shortly.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/account/orders">View Orders</Link>
          </Button>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  // If order failed, show error message
  if (orderStatus === "failed") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Failed</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          There was an error processing your order. Please try again or contact customer support.
        </p>
        <Button onClick={() => setOrderStatus("idle")}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-orange-600" />
            Shipping Address
          </h3>

          {savedAddresses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {savedAddresses.map((address) => (
                <Card
                  key={address.id}
                  className={`cursor-pointer transition-all ${selectedAddress === address.id ? "border-orange-600 ring-1 ring-orange-600" : "hover:border-orange-300"}`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <CardContent className="p-4 relative">
                    <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-1">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                        <div className="grid gap-1 w-full pr-8">
                          <Label htmlFor={address.id} className="font-medium flex items-center">
                            {address.name}
                            {address.name.toLowerCase() === "home" && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Primary
                              </Badge>
                            )}
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            <p>{address.address}</p>
                            <p>
                              {address.city}, {address.postalCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-orange-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditAddress(address)
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit address</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAddress(address.id)
                        }}
                      >
                        <Trash className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete address</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card
                className="cursor-pointer border-dashed hover:border-orange-300 flex items-center justify-center"
                onClick={() => {
                  setEditingAddress(null)
                  setNewAddress({
                    name: "",
                    address: "",
                    city: "Dubai",
                    postalCode: "",
                  })
                  setShowNewAddressForm(true)
                }}
              >
                <CardContent className="p-4 text-center flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium">Add New Address</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-6 border rounded-lg border-dashed">
              <p className="text-muted-foreground mb-4">You don't have any saved addresses yet.</p>
              <Button onClick={() => setShowNewAddressForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CreditCard className="mr-2 h-4 w-4 text-orange-600" />
            Payment Method
          </h3>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                Credit/Debit Card
              </Label>
              <div className="flex gap-1">
                <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                  <img src="/payment/visa.svg" alt="Visa" className="h-3" />
                </div>
                <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                  <img src="/payment/mastercard.svg" alt="Mastercard" className="h-3" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="apple-pay" id="apple-pay" />
              <Label htmlFor="apple-pay" className="flex-1 cursor-pointer">
                Apple Pay
              </Label>
              <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                <img src="/payment/apple-pay.svg" alt="Apple Pay" className="h-3" />
              </div>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="tabby" id="tabby" />
              <Label htmlFor="tabby" className="flex-1 cursor-pointer">
                Tabby - Pay Later
              </Label>
              <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                <img src="/payment/tabby.svg" alt="Tabby" className="h-3" />
              </div>
            </div>
          </RadioGroup>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm text-muted-foreground">
              Payment will be processed securely via Telr payment gateway.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{subtotal} AED</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `${shippingCost} AED`}</span>
            </div>
            {shippingCost > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over 299 AED</p>}
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{finalTotal} AED</span>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={isLoading || !selectedAddress}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Order"
            )}
          </Button>
        </div>
      </form>

      <Dialog open={showNewAddressForm} onOpenChange={setShowNewAddressForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNewAddressSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="addressName">Address Name</Label>
              <Input
                id="addressName"
                placeholder="Home, Work, etc."
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Street address, apartment, etc."
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select value={newAddress.city} onValueChange={(value) => setNewAddress({ ...newAddress, city: value })}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dubai">Dubai</SelectItem>
                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="Sharjah">Sharjah</SelectItem>
                  <SelectItem value="Ajman">Ajman</SelectItem>
                  <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                  <SelectItem value="Fujairah">Fujairah</SelectItem>
                  <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewAddressForm(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingAddress ? "Update Address" : "Save Address"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

