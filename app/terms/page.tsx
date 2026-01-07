import { Header } from "@/components/hero/header"
import { FooterSection } from "@/components/hero/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6">
        <Header />
        
        <main className="mt-24 md:mt-32 max-w-4xl mx-auto py-12 text-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Terms and Conditions of Use</h1>
          <div className="text-sm text-muted-foreground mb-8">
            <p>Effective Date: January 06, 2026</p>
            <p>Website: https://esperanza.et/</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              These Terms and Conditions (“Terms”) constitute a legally binding agreement between you (“User”,
              “you”) and Esperanza (“Company”, “Platform”, “we”, “us”, or “our”) governing your access to and
              use of the Esperanza website, services, applications, and related systems.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              By accessing or using the Platform, you acknowledge that you have read, understood, and agreed
              to be bound by these Terms. If you do not agree, you must not access or use the Platform.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">1. Nature of the Platform</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esperanza is a digital services and technology platform that provides online tools, systems, and
                features intended to facilitate digital engagement, service promotion, and participation in
                platform-defined incentive programs. Esperanza does not provide financial advice, investment
                services, brokerage services, or guaranteed income opportunities.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">2. Eligibility and Legal Capacity</h2>
              <p className="text-muted-foreground leading-relaxed">
                You represent and warrant that you are at least 18 years of age, have full legal capacity to enter
                into binding agreements, and that your use of the Platform complies with applicable laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">3. Account Creation and Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities conducted through your account. Esperanza may suspend or terminate accounts that
                violate these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. Services and Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esperanza may modify, suspend, or discontinue any part of the Platform at its discretion, with or
                without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">5. Incentives and Rewards</h2>
              <p className="text-muted-foreground leading-relaxed">
                Incentives or rewards may be offered at Esperanza’s discretion and are subject to verification,
                modification, or cancellation. Participation does not create vested rights or guarantees.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">6. No Guarantee of Results</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esperanza makes no guarantees regarding earnings, financial outcomes, or performance results.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">7. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users must not engage in unlawful, misleading, fraudulent, or abusive behavior when using the
                Platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">8. Payments and Transactions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Payments are processed through third-party providers and may be delayed or withheld to comply
                with legal or security requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">9. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                All intellectual property on the Platform is owned by or licensed to Esperanza. Unauthorized use is
                prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">10. Suspension and Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esperanza may suspend or terminate access for violations of these Terms or for security or
                compliance reasons.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">11. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Platform is provided “AS IS” and “AS AVAILABLE.”
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">12. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esperanza shall not be liable for indirect or consequential damages. Total liability shall not exceed
                amounts paid by the user in the prior 12 months.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">13. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold Esperanza harmless from claims arising from misuse of the
                Platform or violation of these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">14. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Use of the Platform is subject to Esperanza’s Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">15. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of the Federal Democratic Republic of Ethiopia.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">16. Amendments</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esperanza may update these Terms at any time. Continued use constitutes acceptance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">17. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision is found unenforceable, the remaining provisions remain in effect.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">18. Entire Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms constitute the entire agreement between you and Esperanza.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">19. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Email: <a href="mailto:support@esperanza.et" className="text-primary hover:underline">support@esperanza.et</a><br />
                Website: <a href="https://esperanza.et/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://esperanza.et/</a>
              </p>
            </section>
          </div>
        </main>

        <FooterSection />
      </div>
    </div>
  )
}
