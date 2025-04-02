"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CreditCard, MapPin, Loader2, CheckCircle, XCircle, Plus, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isGuestCheckout = searchParams.get("guest") === "true"
  const { user, addAddress, removeAddress, updateAddress } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "failed" | "canceled">("idle")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showAddressPrompt, setShowAddressPrompt] = useState(false)
  const [showGuestCheckoutDialog, setShowGuestCheckoutDialog] = useState(false)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  const [saveAddress, setSaveAddress] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [phoneError, setPhoneError] = useState("")
  const [postalCodeError, setPostalCodeError] = useState("")

  // Guest checkout form state
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Dubai",
    postalCode: "",
    country: "United Arab Emirates",
  })

  // New address form for signed-in users
  const [newAddress, setNewAddress] = useState({
    name: "Home",
    address: "",
    city: "Dubai",
    postalCode: "",
    country: "United Arab Emirates",
    phone: "",
  })

  // Calculate shipping cost - 20 AED for orders under 299 AED, free for orders over 299 AED
  const shipping = subtotal < 299 ? 20 : 0
  const total = subtotal + shipping

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  // Set default address if available
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(user.addresses[0].id)
    }
  }, [user, selectedAddress])

  const validateUAEPhone = (phone: string) => {
    // UAE phone number format: +971xxxxxxxxx or 0xxxxxxxxx (total 9 digits after prefix)
    const uaePhoneRegex = /^(\+971|0)[0-9]{9}$/
    return uaePhoneRegex.test(phone)
  }

  const validateUAEPostalCode = (postalCode: string) => {
    // UAE postal codes are typically 5 digits
    const uaePostalCodeRegex = /^[0-9]{5}$/
    return uaePostalCodeRegex.test(postalCode)
  }

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGuestInfo((prev) => ({ ...prev, [name]: value }))

    // Validate phone number
    if (name === "phone") {
      if (!validateUAEPhone(value)) {
        setPhoneError("Please enter a valid UAE phone number (+971xxxxxxxxx or 0xxxxxxxxx)")
      } else {
        setPhoneError("")
      }
    }

    // Validate postal code
    if (name === "postalCode") {
      if (!validateUAEPostalCode(value)) {
        setPostalCodeError("Please enter a valid 5-digit UAE postal code")
      } else {
        setPostalCodeError("")
      }
    }
  }

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))

    // Validate phone number
    if (name === "phone") {
      if (!validateUAEPhone(value)) {
        setPhoneError("Please enter a valid UAE phone number (+971xxxxxxxxx or 0xxxxxxxxx)")
      } else {
        setPhoneError("")
      }
    }

    // Validate postal code
    if (name === "postalCode") {
      if (!validateUAEPostalCode(value)) {
        setPostalCodeError("Please enter a valid 5-digit UAE postal code")
      } else {
        setPostalCodeError("")
      }
    }
  }

  const handleCityChange = (value: string) => {
    setGuestInfo((prev) => ({ ...prev, city: value }))
  }

  const handleNewAddressCityChange = (value: string) => {
    setNewAddress((prev) => ({ ...prev, city: value }))
  }

  const handleNewAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate phone number and postal code
    if (!validateUAEPhone(newAddress.phone)) {
      setPhoneError("Please enter a valid UAE phone number (+971xxxxxxxxx or 0xxxxxxxxx)")
      return
    }

    if (!validateUAEPostalCode(newAddress.postalCode)) {
      setPostalCodeError("Please enter a valid 5-digit UAE postal code")
      return
    }

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
          phone: newAddress.phone,
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
          phone: newAddress.phone,
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
        name: "Home",
        address: "",
        city: "Dubai",
        postalCode: "",
        country: "United Arab Emirates",
        phone: "",
      })
      setPhoneError("")
      setPostalCodeError("")
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
        if (user?.addresses && user.addresses.length > 1) {
          const remainingAddresses = user.addresses.filter((addr) => addr.id !== addressId)
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
      country: address.country || "United Arab Emirates",
      phone: address.phone || "",
    })
    setShowNewAddressForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate guest info if it's a guest checkout
    if (isGuestCheckout) {
      if (!validateUAEPhone(guestInfo.phone)) {
        setPhoneError("Please enter a valid UAE phone number (+971xxxxxxxxx or 0xxxxxxxxx)")
        return
      }

      if (!validateUAEPostalCode(guestInfo.postalCode)) {
        setPostalCodeError("Please enter a valid 5-digit UAE postal code")
        return
      }
    }

    // For logged in users, check if they have an address selected
    if (!isGuestCheckout && user && !selectedAddress && user.addresses.length === 0) {
      toast({
        title: "Address required",
        description: "Please add a shipping address to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setIsProcessingOrder(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      })

      // Set order status to success
      setOrderStatus("success")

      // Clear cart
      clearCart()
    } catch (error) {
      console.error("Error placing order:", error)

      // Show error toast
      toast({
        title: "Failed to place order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })

      setOrderStatus("failed")
    } finally {
      setIsLoading(false)
      setIsProcessingOrder(false)
    }
  }

  // If order is successful, show success message
  if (orderStatus === "success") {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Complete</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Thank you for your purchase. Your order has been placed and will be processed soon. You will receive an
            email confirmation shortly.
          </p>
          <div className="flex gap-4">
            {user && (
              <Button asChild variant="outline">
                <Link href="/account/orders">View Orders</Link>
              </Button>
            )}
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // If order failed, show error message
  if (orderStatus === "failed") {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
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
      </div>
    )
  }

  // Processing order overlay
  if (isProcessingOrder) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-background p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="animate-spin h-12 w-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Processing Your Order</h2>
          <p className="text-muted-foreground">Please wait while we process your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            {isGuestCheckout && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-orange-600" />
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={guestInfo.firstName}
                      onChange={handleGuestInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={guestInfo.lastName}
                      onChange={handleGuestInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={guestInfo.email}
                      onChange={handleGuestInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={guestInfo.phone}
                      onChange={handleGuestInfoChange}
                      required
                    />
                    {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
                    <p className="text-xs text-muted-foreground">Format: +971xxxxxxxxx or 0xxxxxxxxx</p>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-orange-600" />
                Shipping Address
              </h2>

              {isGuestCheckout ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={guestInfo.address}
                      onChange={handleGuestInfoChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select value={guestInfo.city} onValueChange={handleCityChange}>
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
                        name="postalCode"
                        value={guestInfo.postalCode}
                        onChange={handleGuestInfoChange}
                        required
                      />
                      {postalCodeError && <p className="text-sm text-red-500">{postalCodeError}</p>}
                      <p className="text-xs text-muted-foreground">UAE postal codes are 5 digits</p>
                    </div>
                  </div>
                </div>
              ) : user?.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {user.addresses.map((address) => (
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
                                  <p>{address.phone}</p>
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
                          name: "Home",
                          address: "",
                          city: "Dubai",
                          postalCode: "",
                          country: "United Arab Emirates",
                          phone: "",
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
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressName">Address Name</Label>
                    <Input
                      id="addressName"
                      name="name"
                      placeholder="Home, Work, etc."
                      value={newAddress.name}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Street address, apartment, etc."
                      value={newAddress.address}
                      onChange={handleNewAddressChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select value={newAddress.city} onValueChange={handleNewAddressCityChange}>
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
                        name="postalCode"
                        value={newAddress.postalCode}
                        onChange={handleNewAddressChange}
                        required
                      />
                      {postalCodeError && <p className="text-sm text-red-500">{postalCodeError}</p>}
                      <p className="text-xs text-muted-foreground">UAE postal codes are 5 digits</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={newAddress.phone}
                      onChange={handleNewAddressChange}
                      required
                    />
                    {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
                    <p className="text-xs text-muted-foreground">Format: +971xxxxxxxxx or 0xxxxxxxxx</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveAddress"
                      checked={saveAddress}
                      onCheckedChange={(checked) => setSaveAddress(checked as boolean)}
                    />
                    <Label htmlFor="saveAddress" className="text-sm">
                      Save this address for future orders
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-orange-600" />
                Payment Method
              </h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                      <Image src="/payment/visa.png" alt="Visa" width={30} height={20} />
                    </div>
                    <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                      <Image src="/payment/mastercard.png" alt="Mastercard" width={30} height={20} />
                    </div>
                    <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                      <Image src="/payment/amex.svg" alt="American Express" width={30} height={20} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="apple-pay" id="apple-pay" />
                  <Label htmlFor="apple-pay" className="flex-1 cursor-pointer">
                    Apple Pay
                  </Label>
                  <div className="w-8 h-5 bg-white rounded border flex items-center justify-center">
                    <Image src="/payment/apple-pay.svg" alt="Apple Pay" width={30} height={20} />
                  </div>
                </div>
              </RadioGroup>

              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">
                  Payment will be processed securely via Telr payment gateway.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Order"
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-muted rounded-lg p-6 sticky top-20">
            <h2 className="font-medium mb-4">Order Summary</h2>

            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>{item.price * item.quantity} AED</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal} AED</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `${shipping} AED`}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-muted-foreground">Free shipping on orders over 299 AED</div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{total} AED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Address Dialog */}
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
                name="name"
                placeholder="Home, Work, etc."
                value={newAddress.name}
                onChange={handleNewAddressChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Street address, apartment, etc."
                value={newAddress.address}
                onChange={handleNewAddressChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={newAddress.city} onValueChange={handleNewAddressCityChange}>
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
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleNewAddressChange}
                  required
                />
                {postalCodeError && <p className="text-sm text-red-500">{postalCodeError}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={newAddress.phone}
                onChange={handleNewAddressChange}
                required
              />
              {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
              <p className="text-xs text-muted-foreground">Format: +971xxxxxxxxx or 0xxxxxxxxx</p>
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

