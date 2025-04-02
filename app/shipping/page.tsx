import { Truck, Package, RefreshCw, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Shipping & Returns</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Information about our shipping methods, delivery times, and return policy.
          </p>
        </div>

        <div className="space-y-16">
          {/* Shipping Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Shipping Information</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-orange-600" />
                    Standard Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    <p className="mb-2">Delivery within 3-5 business days</p>
                    <p className="font-medium">
                      Free for orders over 299 AED
                      <br />
                      20 AED for orders below 299 AED
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5 text-orange-600" />
                    Order Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    <p>All orders are processed within 1-2 business days after payment confirmation.</p>
                    <p className="mt-2">
                      You will receive a shipping confirmation email with tracking information once your order has been
                      shipped.
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Shipping Details</h3>
              <div className="space-y-4">
                <p>
                  <strong>Delivery Areas:</strong> We currently ship to all areas within the UAE. International shipping
                  is available for select countries.
                </p>
                <p>
                  <strong>Tracking:</strong> Once your order is shipped, you will receive a confirmation email with
                  tracking information. You can track your order status through the link provided.
                </p>
                <p>
                  <strong>Delivery Times:</strong> Please note that delivery times may vary depending on your location
                  and any potential customs clearance for international orders. The estimated delivery timeframe does
                  not include weekends and public holidays.
                </p>
                <p>
                  <strong>Address Accuracy:</strong> Please ensure that your shipping address is accurate and complete.
                  We are not responsible for delays or non-delivery due to incorrect address information.
                </p>
              </div>
            </div>
          </section>

          {/* Returns Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Return Policy</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <RefreshCw className="mr-2 h-5 w-5 text-orange-600" />
                    Return Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    <p>
                      Returns are only accepted for damaged products. The product must be in its original condition with
                      all tags and packaging.
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-orange-600" />
                    Return Timeframe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    <p>
                      Return requests must be submitted within 3 days of receiving your order. No returns will be
                      accepted after this period.
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Return Process</h3>
              <div className="space-y-4">
                <p>
                  <strong>1. Contact Customer Service:</strong> If you receive a damaged product, please contact our
                  customer service team at{" "}
                  <a href="mailto:support@outofarchives.com" className="text-orange-600 hover:underline">
                    support@outofarchives.com
                  </a>{" "}
                  within 3 days of receiving your order.
                </p>
                <p>
                  <strong>2. Provide Documentation:</strong> Include your order number and clear photos of the damaged
                  product in your email.
                </p>
                <p>
                  <strong>3. Return Authorization:</strong> Our team will review your request and provide you with
                  return instructions if approved.
                </p>
                <p>
                  <strong>4. Refund Process:</strong> Once we receive and inspect the returned item, we will process
                  your refund to the original payment method. Please allow 7-10 business days for the refund to appear
                  in your account.
                </p>
                <p className="font-medium mt-6">
                  Please note: We do not accept returns for any reason other than damaged products. All sales are final
                  for correctly shipped, non-damaged items.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about shipping or returns, please contact our customer service team.
            </p>
            <p>
              <a href="mailto:support@outofarchives.com" className="text-orange-600 hover:underline">
                support@outofarchives.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

