"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ShoppingBag, User, X, Heart, LogOut, History, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"
import { SignInDialog } from "@/components/auth/sign-in-dialog"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const isSmallMobile = typeof window !== "undefined" ? window.innerWidth < 375 : false

  const { user, signOut } = useAuth()
  const { itemCount: cartItemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()
    setAuthDialogOpen(true)
  }

  const handleSignOut = (e: React.MouseEvent) => {
    if (e) e.preventDefault()
    signOut()
  }

  const toggleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()
    setSearchOpen(!searchOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchOpen(false)
    }
  }

  // Add a delay before closing the dropdown
  const handleMouseLeave = () => {
    setTimeout(() => {
      setProductsMenuOpen(false)
    }, 300)
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled
            ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b"
            : "bg-background",
        )}
      >
        <div className="container flex h-[70px] items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Mobile: Left - Hamburger Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] pt-10">
                <div className="flex flex-col gap-6">
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item, index) => (
                      <SheetClose asChild key={index}>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-orange-600",
                            pathname === item.href && "text-orange-600",
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}

                    <div className="space-y-3">
                      <p className="text-lg font-medium">Products</p>
                      <div className="pl-4 space-y-2">
                        <SheetClose asChild>
                          <Link href="/products" className="block text-base hover:text-orange-600">
                            View All
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/products/hoodies" className="block text-base hover:text-orange-600">
                            Hoodies
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/products/t-shirts" className="block text-base hover:text-orange-600">
                            T-Shirts
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/products/stickers" className="block text-base hover:text-orange-600">
                            Stickers
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </nav>

                  <div className="border-t pt-4">
                    {user ? (
                      <div className="space-y-3">
                        <SheetClose asChild>
                          <Link href="/account" className="flex items-center gap-2 text-lg font-medium">
                            <User className="h-5 w-5" />
                            My Account
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/account/orders" className="flex items-center gap-2 text-lg font-medium">
                            <History className="h-5 w-5" />
                            Order History
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/wishlist" className="flex items-center gap-2 text-lg font-medium">
                            <Heart className="h-5 w-5" />
                            Wishlist
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            className="flex w-full items-center justify-start gap-2 p-0 h-auto font-medium text-lg hover:text-orange-600"
                            onClick={handleSignOut}
                          >
                            <LogOut className="h-5 w-5" />
                            Logout
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <SheetClose asChild>
                        <Button
                          onClick={handleAuthClick}
                          className="w-full justify-start text-lg h-auto p-0 font-medium"
                          variant="ghost"
                        >
                          <User className="h-5 w-5 mr-2" />
                          Sign In / Sign Up
                        </Button>
                      </SheetClose>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop: Left - Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-600",
                  pathname === item.href && "text-orange-600",
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Products dropdown */}
            <div className="relative" onMouseEnter={() => setProductsMenuOpen(true)} onMouseLeave={handleMouseLeave}>
              <button
                className={cn(
                  "text-sm font-medium transition-colors hover:text-orange-600 flex items-center gap-1",
                  pathname.startsWith("/products") && "text-orange-600",
                  "focus:outline-none",
                )}
              >
                Products
                <ChevronDown className="h-4 w-4" />
              </button>

              {productsMenuOpen && (
                <div
                  className="absolute left-0 top-full mt-1 w-48 bg-background border rounded-md shadow-lg p-2 z-50"
                  onMouseEnter={() => setProductsMenuOpen(true)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-1">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setProductsMenuOpen(false)}
                    >
                      View All
                    </Link>
                    <Link
                      href="/products/hoodies"
                      className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setProductsMenuOpen(false)}
                    >
                      Hoodies
                    </Link>
                    <Link
                      href="/products/t-shirts"
                      className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setProductsMenuOpen(false)}
                    >
                      T-Shirts
                    </Link>
                    <Link
                      href="/products/stickers"
                      className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                      onClick={() => setProductsMenuOpen(false)}
                    >
                      Stickers
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Center - Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <div
              className={`relative ${isSmallMobile ? "h-[17px] w-[98px]" : "h-[53px] w-[166px]"} md:h-[59px] md:w-[183px] overflow-hidden`}
            >
              <Image src="/company_logo.png" alt="Out of Archives" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Right - Search (desktop only), Cart, Account */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search - Desktop only */}
            <div className="hidden md:block relative">
              <Button variant="ghost" size="icon" className="relative" onClick={toggleSearch} type="button">
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                <span className="sr-only">Search</span>
              </Button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-1 w-[400px] bg-background border rounded-md shadow-lg p-2 z-50">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="border-none shadow-none focus-visible:ring-0"
                      autoFocus
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="sm">
                      Search
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-orange-600 text-[10px] font-medium text-white flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-orange-600 text-[10px] font-medium text-white flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {/* Account - Hide on small mobile */}
            {!isSmallMobile &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        <span>Order History</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" className="relative" onClick={handleAuthClick}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
              ))}
          </div>
        </div>
      </header>

      <SignInDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  )
}

