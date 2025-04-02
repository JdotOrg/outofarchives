"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })

      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out through any of
            our contact channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-orange-600" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                <a href="mailto:hello@outofarchives.com" className="hover:text-orange-600">
                  hello@outofarchives.com
                </a>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-orange-600" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                <a href="tel:+97145555555" className="hover:text-orange-600">
                  +971 4 555 5555
                </a>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" required value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" required value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" required value={formData.subject} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" rows={5} required value={formData.message} onChange={handleChange} />
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="relative h-[400px] md:h-auto rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785100219583!2d55.30371491501104!3d25.18546998389592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6833175d99d1%3A0x9a2f8e68c0e5a3e!2sDubai%20Design%20District!5e0!3m2!1sen!2sae!4v1616000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/outofarchives.ae" className="text-muted-foreground hover:text-orange-600">
              Instagram
            </a>
            <a href="https://facebook.com/outofarchives.ae" className="text-muted-foreground hover:text-orange-600">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

