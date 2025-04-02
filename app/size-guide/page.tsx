import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Size Guide</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect fit with our detailed size charts for all our products.
          </p>
        </div>

        <Tabs defaultValue="hoodies" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
            <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
            <TabsTrigger value="socks">Socks</TabsTrigger>
            <TabsTrigger value="measuring">How to Measure</TabsTrigger>
          </TabsList>

          {/* Hoodies Size Chart */}
          <TabsContent value="hoodies" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Hoodies Size Chart</h2>
                <p className="text-muted-foreground mb-6">
                  Our hoodies are designed with a regular fit. If you prefer a looser fit, we recommend sizing up.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">Chest (cm)</th>
                        <th className="border p-2 text-left">Length (cm)</th>
                        <th className="border p-2 text-left">Sleeve (cm)</th>
                        <th className="border p-2 text-left">Recommended Height (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">XS</td>
                        <td className="border p-2">96-100</td>
                        <td className="border p-2">64-66</td>
                        <td className="border p-2">60-62</td>
                        <td className="border p-2">160-170</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">S</td>
                        <td className="border p-2">100-104</td>
                        <td className="border p-2">66-68</td>
                        <td className="border p-2">62-64</td>
                        <td className="border p-2">165-175</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">M</td>
                        <td className="border p-2">104-108</td>
                        <td className="border p-2">68-70</td>
                        <td className="border p-2">64-66</td>
                        <td className="border p-2">170-180</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">L</td>
                        <td className="border p-2">108-112</td>
                        <td className="border p-2">70-72</td>
                        <td className="border p-2">66-68</td>
                        <td className="border p-2">175-185</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">XL</td>
                        <td className="border p-2">112-116</td>
                        <td className="border p-2">72-74</td>
                        <td className="border p-2">68-70</td>
                        <td className="border p-2">180-190</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">XXL</td>
                        <td className="border p-2">116-120</td>
                        <td className="border p-2">74-76</td>
                        <td className="border p-2">70-72</td>
                        <td className="border p-2">185-195</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Hoodie Fit Notes:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Our hoodies are designed with a comfortable, regular fit</li>
                    <li>The measurements above refer to the garment dimensions, not body measurements</li>
                    <li>For a more oversized look, we recommend going up one size</li>
                    <li>Fabric may shrink slightly after washing (approximately 1-2%)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* T-Shirts Size Chart */}
          <TabsContent value="tshirts" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">T-Shirts Size Chart</h2>
                <p className="text-muted-foreground mb-6">
                  Our t-shirts have a regular fit. For a more relaxed style, consider sizing up.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">Chest (cm)</th>
                        <th className="border p-2 text-left">Length (cm)</th>
                        <th className="border p-2 text-left">Shoulder (cm)</th>
                        <th className="border p-2 text-left">Recommended Height (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">XS</td>
                        <td className="border p-2">92-96</td>
                        <td className="border p-2">65-67</td>
                        <td className="border p-2">40-42</td>
                        <td className="border p-2">160-170</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">S</td>
                        <td className="border p-2">96-100</td>
                        <td className="border p-2">67-69</td>
                        <td className="border p-2">42-44</td>
                        <td className="border p-2">165-175</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">M</td>
                        <td className="border p-2">100-104</td>
                        <td className="border p-2">69-71</td>
                        <td className="border p-2">44-46</td>
                        <td className="border p-2">170-180</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">L</td>
                        <td className="border p-2">104-108</td>
                        <td className="border p-2">71-73</td>
                        <td className="border p-2">46-48</td>
                        <td className="border p-2">175-185</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">XL</td>
                        <td className="border p-2">108-112</td>
                        <td className="border p-2">73-75</td>
                        <td className="border p-2">48-50</td>
                        <td className="border p-2">180-190</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">XXL</td>
                        <td className="border p-2">112-116</td>
                        <td className="border p-2">75-77</td>
                        <td className="border p-2">50-52</td>
                        <td className="border p-2">185-195</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">T-Shirt Fit Notes:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Our t-shirts are made from 100% organic cotton for a soft, comfortable feel</li>
                    <li>The measurements above refer to the garment dimensions, not body measurements</li>
                    <li>Fabric may shrink slightly after washing (approximately 1-2%)</li>
                    <li>
                      We recommend washing inside out in cold water and air drying to maintain shape and print quality
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Socks Size Chart */}
          <TabsContent value="socks" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Socks Size Chart</h2>
                <p className="text-muted-foreground mb-6">
                  One Size.
                </p>

                

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Socks Fit Notes:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Our socks are made with a blend of organic cotton and recycled materials for comfort and
                      durability
                    </li>
                    <li>The elastic cuff provides a secure fit without being too tight</li>
                    <li>If you're between sizes, we recommend sizing up for a more comfortable fit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* How to Measure */}
          <TabsContent value="measuring" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">How to Measure Yourself</h2>
                <p className="text-muted-foreground mb-6">
                  Follow these simple steps to get accurate measurements for finding your perfect size.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=400"
                      alt="How to measure"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Chest / Bust</h3>
                      <p className="text-muted-foreground">
                        Measure around the fullest part of your chest/bust, keeping the measuring tape horizontal.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Waist</h3>
                      <p className="text-muted-foreground">
                        Measure around your natural waistline, keeping the tape comfortably loose.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Hips</h3>
                      <p className="text-muted-foreground">
                        Measure around the fullest part of your hips, approximately 8 inches below your waistline.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Length</h3>
                      <p className="text-muted-foreground">
                        For tops, measure from the highest point of your shoulder to your desired length.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Tips for Accurate Measurements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Use a soft measuring tape for best results</li>
                    <li>Keep the measuring tape level and not too tight or too loose</li>
                    <li>It's helpful to have someone assist you for more accurate measurements</li>
                    <li>Wear lightweight clothes when measuring, or measure directly over your underwear</li>
                    <li>Stand straight with your feet together when taking measurements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Still Not Sure About Your Size?</h2>
          <p className="text-muted-foreground mb-4">
            If you're between sizes or have any questions about finding your perfect fit, please don't hesitate to
            contact our customer service team.
          </p>
          <p className="text-muted-foreground">
            Email us at{" "}
            <a href="mailto:support@outofarchives.com" className="text-orange-600 hover:underline">
              support@outofarchives.com
            </a>{" "}
            with your measurements, and we'll be happy to help you choose the right size.
          </p>
        </div>
      </div>
    </div>
  )
}

