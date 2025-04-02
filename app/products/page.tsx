"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useEffect } from "react"
import { Filter, Grid3X3, List, Heart, SearchIcon } from "lucide-react"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMascots, setSelectedMascots] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [sortOption, setSortOption] = useState("featured")
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const [paginatedProducts, setPaginatedProducts] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)

  // Product data - in a real app, this would come from an API/backend
  const products = [
    {
      id: 1,
      name: "Archive Hoodie",
      price: 249,
      image: "/placeholder.svg?height=400&width=300",
      category: "Hoodie",
      tag: "Best Seller",
      mascot: "Menguin",
    },
    {
      id: 2,
      name: "Retro Tee",
      price: 149,
      image: "/placeholder.svg?height=400&width=300",
      category: "T-Shirt",
      tag: "New Arrival",
      mascot: "Menguin",
    },
    {
      id: 3,
      name: "Digital Dreams Hoodie",
      price: 279,
      image: "/placeholder.svg?height=400&width=300",
      category: "Hoodie",
      tag: "Limited Edition",
      mascot: "Menguin",
    },
    {
      id: 4,
      name: "Mascot Sticker Pack",
      price: 49,
      image: "/placeholder.svg?height=400&width=300",
      category: "Stickers",
      tag: "New Arrival",
      mascot: "Menguin",
    },
    {
      id: 5,
      name: "Pixel Art Tee",
      price: 159,
      image: "/placeholder.svg?height=400&width=300",
      category: "T-Shirt",
      mascot: "Menguin",
      inStock: false,
    },
    {
      id: 6,
      name: "Byte Basics Hoodie",
      price: 249,
      image: "/placeholder.svg?height=400&width=300",
      category: "Hoodie",
      mascot: "Menguin",
    },
    {
      id: 8,
      name: "Retro Gaming Stickers",
      price: 39,
      image: "/placeholder.svg?height=400&width=300",
      category: "Stickers",
      mascot: "Menguin",
    },
    {
      id: 9,
      name: "Minimalist Tee",
      price: 139,
      image: "/placeholder.svg?height=400&width=300",
      category: "T-Shirt",
      mascot: "Menguin",
    },
    {
      id: 10,
      name: "Archive Basics Tee",
      price: 129,
      image: "/placeholder.svg?height=400&width=300",
      category: "T-Shirt",
      mascot: "Menguin",
    },
    {
      id: 11,
      name: "Eco Friendly Hoodie",
      price: 269,
      image: "/placeholder.svg?height=400&width=300",
      category: "Hoodie",
      tag: "Sustainable",
      mascot: "Menguin",
    },
    {
      id: 12,
      name: "Mascot Collection Stickers",
      price: 45,
      image: "/placeholder.svg?height=400&width=300",
      category: "Stickers",
      mascot: "Menguin",
    },
    {
      id: 13,
      name: "Vintage Logo Tee",
      price: 159,
      image: "/placeholder.svg?height=400&width=300",
      category: "T-Shirt",
      mascot: "Menguin",
    },
    {
      id: 14,
      name: "Coder's Hoodie",
      price: 259,
      image: "/placeholder.svg?height=400&width=300",
      category: "Hoodie",
      mascot: "Menguin",
    },
    {
      id: 15,
      name: "Pixel Art Cap",
      price: 89,
      image: "/placeholder.svg?height=400&width=300",
      category: "Stickers",
      mascot: "Menguin",
    },
  ]

  // Get unique categories and mascots for filters
  const categories = Array.from(new Set(products.map((product) => product.category)))
  const mascots = Array.from(new Set(products.map((product) => product.mascot)))

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    const mascot = searchParams.get("mascot")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort")
    const min = searchParams.get("min")
    const max = searchParams.get("max")
    const page = searchParams.get("page")

    if (category) {
      setSelectedCategories([category])
    }

    if (mascot) {
      setSelectedMascots([mascot])
    }

    if (search) {
      setSearchTerm(search)
    }

    if (sort) {
      setSortOption(sort)
    }

    if (min) {
      setPriceRange((prev) => ({ ...prev, min }))
    }

    if (max) {
      setPriceRange((prev) => ({ ...prev, max }))
    }

    if (page) {
      setCurrentPage(Number.parseInt(page))
    }
  }, [searchParams])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply mascot filter
    if (selectedMascots.length > 0) {
      result = result.filter((product) => selectedMascots.includes(product.mascot))
    }

    // Apply price range filter
    if (priceRange.min) {
      result = result.filter((product) => product.price >= Number(priceRange.min))
    }

    if (priceRange.max) {
      result = result.filter((product) => product.price <= Number(priceRange.max))
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.mascot.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        // In a real app, you would sort by date
        // For demo, we'll just reverse the array to simulate newest first
        result = [...result].reverse()
        break
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      // featured is default, no sorting needed
    }

    setFilteredProducts(result)

    // Calculate total pages
    setTotalPages(Math.ceil(result.length / productsPerPage))

    // Reset to page 1 if filters change
    if (currentPage > Math.ceil(result.length / productsPerPage)) {
      setCurrentPage(1)
    }
  }, [selectedCategories, selectedMascots, priceRange, searchTerm, sortOption])

  // Apply pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex))
  }, [filteredProducts, currentPage])

  // Update URL with filters and pagination
  const updateUrlParams = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    }

    if (selectedMascots.length === 1) {
      params.set("mascot", selectedMascots[0])
    }

    if (searchTerm) {
      params.set("search", searchTerm)
    }

    if (sortOption !== "featured") {
      params.set("sort", sortOption)
    }

    if (priceRange.min) {
      params.set("min", priceRange.min)
    }

    if (priceRange.max) {
      params.set("max", priceRange.max)
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : "/products", { scroll: false })
  }

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  // Handle mascot filter change
  const handleMascotChange = (mascot: string) => {
    setSelectedMascots((prev) => {
      if (prev.includes(mascot)) {
        return prev.filter((m) => m !== mascot)
      } else {
        return [...prev, mascot]
      }
    })
  }

  // Handle price range change
  const handlePriceChange = (type: "min" | "max", value: string) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    updateUrlParams()
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value)
    setCurrentPage(1)
    updateUrlParams()
  }

  // Handle category button click
  const handleCategoryButtonClick = (category: string) => {
    if (category === "All Products") {
      setSelectedCategories([])
    } else {
      setSelectedCategories([category])
    }
    setCurrentPage(1)
    updateUrlParams()
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
    updateUrlParams()
  }

  // Apply filters button
  const applyFilters = () => {
    setCurrentPage(1)
    updateUrlParams()
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last page as they're always shown

      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return items
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:px-6 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-5 w-5" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
              <List className="h-5 w-5" />
              <span className="sr-only">List view</span>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>Narrow down products by category, price, and more.</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Category</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-mobile-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-mobile-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Mascot</h3>
                  <div className="space-y-1">
                    {mascots.map((mascot) => (
                      <div key={mascot} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mascot-mobile-${mascot}`}
                          checked={selectedMascots.includes(mascot)}
                          onCheckedChange={() => handleMascotChange(mascot)}
                        />
                        <Label htmlFor={`mascot-mobile-${mascot}`} className="text-sm">
                          {mascot}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:block w-[180px]">
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-auto flex">
            <Input
              placeholder="Search products..."
              className="w-full md:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="ghost" className="ml-1">
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap gap-2 mb-8">
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full ${selectedCategories.length === 0 ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => handleCategoryButtonClick("All Products")}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className={`rounded-full ${selectedCategories.includes(category) ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => handleCategoryButtonClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">No products found</h2>
          <p className="text-muted-foreground mb-8">Try adjusting your filters or search terms.</p>
          <Button
            onClick={() => {
              setSelectedCategories([])
              setSelectedMascots([])
              setPriceRange({ min: "", max: "" })
              setSearchTerm("")
              setSortOption("featured")
              setCurrentPage(1)
              router.push("/products")
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="flex flex-col sm:flex-row gap-6 border rounded-xl p-4">
              <div className="relative aspect-square sm:w-48 overflow-hidden rounded-lg">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.tag && (
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {product.tag}
                  </div>
                )}
                {product.inStock === false && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-px bg-red-600 rotate-45 transform origin-center"></div>
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.mascot}</p>
                  <p className="text-lg font-semibold mb-4">{product.price} AED</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 rounded-full bg-orange-600 hover:bg-orange-700"
                    disabled={product.inStock === false}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

