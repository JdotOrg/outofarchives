"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, MapPin, CreditCard } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GuestCheckoutFormProps {
  total: number
  shippingCost: number
  onOrderComplete?: () => void
}

export function GuestCheckoutForm({ total, shippingCost, onOrderComplete }: GuestCheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "Dubai",
    postalCode: "",
    saveInfo: false,
  })
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, saveInfo: checked }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (onOrderComplete) {
        onOrderComplete()
      }
    }, 1500)
  }

  return (
    <div className="space-y-6 py-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-orange-600" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-orange-600" />
            Shipping Address
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
              <Input id="apartment" value={formData.apartment} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
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
                <Input id="postalCode" value={formData.postalCode} onChange={handleChange} required />
              </div>
            </div>
          </div>
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

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="saveInfo" checked={formData.saveInfo} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="saveInfo" className="text-sm font-normal">
              Save my information for faster checkout next time
            </Label>
          </div>

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
              <span>{total - shippingCost} AED</span>
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
            <span>{total} AED</span>
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
        </div>
      </form>
    </div>
  )
}

