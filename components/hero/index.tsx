import { HeroSection } from "@/components/hero/hero-section"
import { AnimatedSection } from "./animated-section"
import { DashboardPreview } from "./dashboard-preview"
import { SocialProof } from "./social-proof"
import { BentoSection } from "./bento-section"
import { WhyChooseSection } from "./why-choose-section"
import { StatsSection } from "./stats-section"
import { LargeTestimonial } from "./large-testimonial"
import { TestimonialGridSection } from "./testimonial-grid-section"
import { FAQSection } from "./faq-section"
import { CTASection } from "./cta-section"
import { FooterSection } from "./footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection />
          {/* Dashboard Preview Wrapper */}
          {/* <div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div> */}
        </main>
        {/* <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-[4px] md:mt-[100px]" delay={0.1}>
          <SocialProof />
        </AnimatedSection> */}
        
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.35}>
          <StatsSection />
        </AnimatedSection>
        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <WhyChooseSection />
        </AnimatedSection>
        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-1" delay={0.2}>
          <BentoSection />
        </AnimatedSection>
        
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-1"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>
        {/* <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FAQSection />
        </AnimatedSection> */}
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-4 md:mt-7" delay={0.2}>
          <CTASection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-1 md:mt-2" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}
