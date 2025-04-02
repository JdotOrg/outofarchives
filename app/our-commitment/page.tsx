import { Leaf, Recycle, Droplet, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OurCommitmentPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Our Commitment to Sustainability</h1>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="lead text-xl text-muted-foreground mb-8">
            At Out of Archives, sustainability isn't just a buzzword—it's at the core of everything we do. We believe
            that fashion can be both stylish and responsible, which is why we've built our brand around environmentally
            conscious practices and ethical production.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="bg-[#FAF3E1] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Leaf className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#c6701b]">Organic Materials</h3>
              </div>
              <p className="text-[#c6701b]/90">
                We use 100% organic cotton and other sustainable materials that are grown without harmful pesticides or
                synthetic fertilizers, reducing our environmental impact while creating high-quality, durable products.
              </p>
            </div>

            <div className="bg-[#FAF3E1] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Recycle className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#c6701b]">Circular Economy</h3>
              </div>
              <p className="text-[#c6701b]/90">
                We design our products with longevity in mind and offer a take-back program for worn Out of Archives
                items, which we then recycle or upcycle into new products, reducing waste and closing the production
                loop.
              </p>
            </div>

            <div className="bg-[#FAF3E1] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Droplet className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#c6701b]">Water Conservation</h3>
              </div>
              <p className="text-[#c6701b]/90">
                Our production processes use significantly less water than conventional methods. We partner with
                factories that implement water recycling systems and use eco-friendly dyeing techniques that minimize
                water usage and pollution.
              </p>
            </div>

            <div className="bg-[#FAF3E1] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Sun className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#c6701b]">Carbon Footprint</h3>
              </div>
              <p className="text-[#c6701b]/90">
                We're committed to reducing our carbon footprint at every stage of production. Our facilities use
                renewable energy where possible, and we offset the carbon emissions we can't eliminate through verified
                environmental projects.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Sustainability Journey</h2>

          <p>
            We recognize that sustainability is a journey, not a destination. While we're proud of what we've
            accomplished so far, we're constantly looking for ways to improve our practices and reduce our environmental
            impact even further.
          </p>

          <p>
            Each year, we publish a sustainability report that outlines our goals, achievements, and areas for
            improvement. We believe in transparency and accountability, which is why we share both our successes and
            challenges with our community.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Join Us in Making a Difference</h2>

          <p>
            When you purchase from Out of Archives, you're not just buying a product—you're supporting a movement toward
            more sustainable and ethical fashion. Together, we can prove that style and sustainability can go hand in
            hand.
          </p>

          <div className="bg-muted p-6 rounded-lg my-8">
            <h3 className="text-lg font-semibold mb-2">Did you know?</h3>
            <p className="text-sm">
              The fashion industry is responsible for 10% of annual global carbon emissions, more than all international
              flights and maritime shipping combined. By choosing sustainable brands like Out of Archives, you're
              helping to reduce this impact.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/products">Shop Sustainable Fashion</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

