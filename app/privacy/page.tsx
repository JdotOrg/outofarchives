export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              At Out of Archives ("we," "our," or "us"), we respect your privacy and are committed to protecting your
              personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website (outofarchives.ae) or make a purchase from our online store.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing our website and/or making a purchase, you
              acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our website, including:</p>
            <h3 className="text-xl font-medium mt-6 mb-2">Personal Information</h3>
            <p>When you create an account, place an order, or subscribe to our newsletter, we may collect:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment information (we do not store complete credit card details)</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-2">Usage Information</h3>
            <p>
              We automatically collect certain information about your device and how you interact with our website,
              including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Time and date of visits</li>
              <li>Pages viewed and features used</li>
              <li>Referral source</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Processing and fulfilling your orders</li>
              <li>Managing your account</li>
              <li>Providing customer support</li>
              <li>Sending transactional emails (order confirmations, shipping updates)</li>
              <li>Sending marketing communications (if you've opted in)</li>
              <li>Improving our website and products</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Preventing fraud and enhancing security</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities.
              Cookies are small text files stored on your device that help us provide you with a better browsing
              experience.
            </p>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being
              sent. However, if you disable or refuse cookies, some parts of our website may not function properly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
            <p>We may share your personal information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Service providers who perform services on our behalf (payment processors, shipping companies, etc.)
              </li>
              <li>Business partners with your consent</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
              at:
            </p>
            <p>
              Email:{" "}
              <a href="mailto:privacy@outofarchives.com" className="text-orange-600 hover:underline">
                privacy@outofarchives.com
              </a>
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-12">Last Updated: March 20, 2025</p>
        </div>
      </div>
    </div>
  )
}

