import { Header } from "@/components/hero/header"
import { FooterSection } from "@/components/hero/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6">
        <Header />
        
        <main className="mt-24 md:mt-32 max-w-4xl mx-auto py-12 text-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">PRIVACY POLICY</h1>
          <div className="text-sm text-muted-foreground mb-8">
            <p>Effective Date: January 06, 2026</p>
            <p>Website: https://esperanza.et/</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Esperanza (“we”, “our”, or “us”) respects your privacy and is committed to protecting your personal
              data. This Privacy Policy explains how we collect, use, disclose, and safeguard information when
              you access or use our website, applications, and related services (collectively, the “Platform”).
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may collect personal information such as name, email address, phone number, account
                credentials, technical information such as IP address and device data, and usage information
                related to your interaction with the Platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use collected information to operate and maintain the Platform, manage accounts, process
                transactions, improve services, ensure security, and comply with legal obligations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">3. Legal Basis for Processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Personal data is processed based on consent, contractual necessity, legal obligations, or legitimate
                interests.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies may be used to enhance user experience and analyze usage. You may disable cookies via
                browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                Information may be shared with trusted service providers, legal authorities when required, or in
                business transfers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Data is retained only as long as necessary for stated purposes or legal compliance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">7. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Appropriate security measures are implemented, though absolute security cannot be guaranteed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">8. User Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users may request access, correction, deletion, or restriction of their personal data, subject to law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Data may be processed outside your jurisdiction with appropriate safeguards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">10. Children’s Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Platform is not intended for individuals under 18 years of age.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy may be updated periodically. Continued use indicates acceptance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">12. Contact Information</h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>Email: support@esperanza.et</p>
                <p>Website: https://esperanza.et/</p>
              </div>
            </section>
          </div>
        </main>
      </div>
      <FooterSection />
    </div>
  )
}
