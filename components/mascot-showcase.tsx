"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MascotShowcase() {
  const mascot = {
    id: 1,
    name: "Menguin",
    description:
      "Our adorable mascot - a cat in a penguin costume, representing our brand's playful and unique identity.",
    image: "/mascot/menguin.png",
    features: [
      "Cute and memorable design",
      "Represents our brand values",
      "Featured on our exclusive products",
      "Symbol of our commitment to quality and creativity",
    ],
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        <Image src={mascot.image || "/placeholder.svg"} alt={mascot.name} fill className="object-contain" />
      </div>

      <div>
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h3 className="text-xl font-medium mb-2">{mascot.name}</h3>
            <p className="text-muted-foreground">{mascot.description}</p>

            <div className="mt-4">
              <h4 className="font-medium mb-2">About Menguin</h4>
              <ul className="space-y-2">
                {mascot.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

