"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ShoppingBag, Truck, CreditCard, Heart, Star } from "lucide-react"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { MascotShowcase } from "@/components/mascot-showcase"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-image.jpg" alt="Hero image" fill className="object-cover brightness-[0.85]" priority />
        </div>
        <div className="container relative z-10 px-4">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-4">
              Sustainable Streetwear from Dubai
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Unique designs inspired by our mascots, crafted with eco-friendly materials.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link href="/products">
                  Shop Now
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="py-16">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 */}
            <Card className="overflow-hidden group">
              <div className="relative h-80 bg-muted">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Menguin Hoodie"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4 text-orange-600" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Menguin Hoodie</h3>
                    <p className="text-sm text-muted-foreground">Hoodies • Menguin</p>
                  </div>
                  <p className="font-medium">199 AED</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-muted text-muted" />
                  <span className="text-xs text-muted-foreground ml-1">(42)</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="overflow-hidden group">
              <div className="relative h-80 bg-muted">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Penguin T-Shirt"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4 text-orange-600" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Penguin T-Shirt</h3>
                    <p className="text-sm text-muted-foreground">T-Shirts • Penguin</p>
                  </div>
                  <p className="font-medium">129 AED</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <span className="text-xs text-muted-foreground ml-1">(28)</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="overflow-hidden group">
              <div className="relative h-80 bg-muted">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Mascot Sticker Pack"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4 text-orange-600" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded">New</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Mascot Sticker Pack</h3>
                    <p className="text-sm text-muted-foreground">Stickers • Various</p>
                  </div>
                  <p className="font-medium">49 AED</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <Star className="h-4 w-4 fill-muted text-muted" />
                  <span className="text-xs text-muted-foreground ml-1">(15)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Our Mascots */}
      <section className="py-16 bg-muted">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Mascots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our unique mascots inspire our designs. Each has its own personality and story.
            </p>
          </div>

          <MascotShowcase />
        </div>
      </section>

      

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Unique Designs</h3>
              <p className="text-muted-foreground">Exclusive mascot-inspired designs you won't find anywhere else.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on all orders over 299 AED within the UAE.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Multiple secure payment options for your convenience.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Join Our Community */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#FAF3E1] text-[#c6701b]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-8">
            Subscribe to our newsletter for exclusive offers, new releases, and sustainability updates.
          </p>
          <NewsletterSignup />
        </div>
      </section>
    </main>
  )
}

