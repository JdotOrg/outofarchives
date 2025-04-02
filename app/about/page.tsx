import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Out of Archives</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Out of Archives began as a passion project between friends who shared a love for digital culture,
              minimalist design, and sustainable fashion. What started in a small apartment in Dubai has grown into a
              brand that celebrates the intersection of digital aesthetics and everyday wear.
            </p>
            <p className="text-muted-foreground mb-6">
              Our name reflects our mission: to bring digital artifacts and aesthetics out of the archives and into the
              physical world, creating wearable pieces that tell a story.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/products">Explore Our Collection</Link>
            </Button>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image src="/about-us-1.jpg" alt="Person browsing on phone" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square rounded-xl overflow-hidden">
            <Image src="/about-us-2.jpg" alt="Person reading a book" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground mb-4">
              We believe that clothing is more than just fabric—it's a medium for expression and identity. Each piece in
              our collection is designed with intention, balancing aesthetic appeal with functionality and comfort.
            </p>
            <p className="text-muted-foreground mb-4">
              Our designs draw inspiration from digital culture, minimalist art, and the evolving relationship between
              technology and humanity. We aim to create pieces that feel both timeless and contemporary.
            </p>
            <p className="text-muted-foreground mb-6">
              Sustainability is at the core of our practice. We use ethically sourced materials and work with
              manufacturers who share our values of fair labor and environmental responsibility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mascots</h2>
            <p className="text-muted-foreground mb-4">
              Our unique mascots are the heart of our brand identity. Each character represents different aspects of
              digital culture and brings personality to our collections.
            </p>
            <p className="text-muted-foreground mb-6">
              From Pixel Panda to Byte Bear, our mascots are designed to be both playful and meaningful, creating a
              connection between the digital world and physical fashion.
            </p>
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image src="/our-story.jpg" alt="Person holding a tote bag" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}

