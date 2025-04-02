"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit to your API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-orange-600" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-[#c6701b]">Thank You!</h3>
        <p className="text-center text-[#c6701b]/90">
          You've been added to our mailing list. Check your inbox for a 10% discount code!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white border-orange-200 text-[#c6701b] placeholder:text-[#c6701b]/60"
      />
      <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
        Subscribe
      </Button>
    </form>
  )
}

