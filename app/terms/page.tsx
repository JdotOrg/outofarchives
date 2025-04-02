export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website and services.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to Out of Archives ("we," "our," or "us"). These Terms and Conditions govern your use of our
              website (outofarchives.ae) and the purchase of products from our online store.
            </p>
            <p>
              By accessing our website and/or making a purchase, you agree to be bound by these Terms and Conditions. If
              you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
            <p>
              <strong>"Website"</strong> refers to outofarchives.ae
            </p>
            <p>
              <strong>"User," "You," and "Your"</strong> refers to the individual accessing or using the Website.
            </p>
            <p>
              <strong>"Products"</strong> refers to the items available for purchase on our Website.
            </p>
            <p>
              <strong>"Order"</strong> refers to a request to purchase Products from our Website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
            <p>
              To make a purchase, you may need to create an account. You are responsible for maintaining the
              confidentiality of your account information and for all activities that occur under your account.
            </p>
            <p>
              You agree to provide accurate and complete information when creating an account and to update your
              information to keep it accurate and current.
            </p>
            <p>
              We reserve the right to terminate accounts and refuse service to anyone for any reason at our sole
              discretion.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">4. Products and Pricing</h2>
            <p>
              All product descriptions, images, and specifications are for reference only and may not exactly match the
              actual product.
            </p>
            <p>
              Prices are listed in AED (United Arab Emirates Dirham) and are subject to change without notice. We
              reserve the right to modify or discontinue any product without notice.
            </p>
            <p>
              In the event of a pricing error, we reserve the right to cancel any orders placed for products with
              incorrect pricing information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Orders and Payment</h2>
            <p>
              By placing an order, you are making an offer to purchase the products. All orders are subject to
              acceptance and availability.
            </p>
            <p>
              Payment must be made at the time of placing an order. We accept various payment methods as indicated on
              our Website.
            </p>
            <p>
              We reserve the right to refuse or cancel any order for any reason, including but not limited to product
              availability, errors in product or pricing information, or identification of fraudulent activity.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">6. Shipping and Delivery</h2>
            <p>Shipping and delivery terms are as specified in our Shipping & Returns policy.</p>
            <p>
              We are not responsible for delays in delivery due to customs processing, local delivery services, or other
              circumstances beyond our control.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">7. Returns and Refunds</h2>
            <p>Our return and refund policy is as specified in our Shipping & Returns policy.</p>
            <p>
              Returns are only accepted for damaged products and must be requested within 3 days of receiving your
              order.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
            <p>
              All content on our Website, including but not limited to text, graphics, logos, images, product designs,
              and mascot characters, is the property of Out of Archives and is protected by copyright, trademark, and
              other intellectual property laws.
            </p>
            <p>
              You may not use, reproduce, distribute, or create derivative works based on our content without our
              express written permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">9. Privacy Policy</h2>
            <p>
              Your use of our Website is also governed by our Privacy Policy, which is incorporated into these Terms and
              Conditions by reference.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Out of Archives shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or relating to your use of our Website or
              products.
            </p>
            <p>
              Our total liability for any claims arising under these Terms and Conditions shall not exceed the amount
              paid by you for the product(s) giving rise to such liability.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the United
              Arab Emirates. Any disputes arising under these Terms and Conditions shall be subject to the exclusive
              jurisdiction of the courts of Dubai, UAE.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">12. Changes to Terms and Conditions</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting on our Website. Your continued use of our Website after any changes indicates
              your acceptance of the modified Terms and Conditions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            <p>
              Email:{" "}
              <a href="mailto:legal@outofarchives.com" className="text-orange-600 hover:underline">
                legal@outofarchives.com
              </a>
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-12">Last Updated: March 20, 2025</p>
        </div>
      </div>
    </div>
  )
}

