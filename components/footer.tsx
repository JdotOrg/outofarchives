import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-xl">Out of Archives</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Sustainable streetwear from Dubai featuring unique mascot designs and timeless basics.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://instagram.com/outofarchives.ae" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://facebook.com/outofarchives.ae" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/hoodies"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/products/t-shirts"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/products/stickers"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Stickers
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/our-commitment"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Our Commitment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-orange-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Out of Archives. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="h-6 w-10 relative">
                <Image src="/payment/visa.png" alt="Visa" fill className="object-contain" />
              </div>
              <div className="h-6 w-10 relative">
                <Image src="/payment/mastercard.png" alt="Mastercard" fill className="object-contain" />
              </div>
              <div className="h-6 w-10 relative">
                <Image src="/payment/apple-pay.svg" alt="Apple Pay" fill className="object-contain" />
              </div>
              <div className="h-6 w-10 relative">
                <Image src="/payment/amex.svg" alt="American Express" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

