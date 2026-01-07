import { Header } from "@/components/hero/header";
import { FooterSection } from "@/components/hero/footer";
import { AnimatedSection } from "@/components/hero/animated-section";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Globe, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-background z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
          </div>
          
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Empowering the Future of <br /> Affiliate Marketing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
                Esperanza is built for creators, developers, and entrepreneurs who want to build sustainable income streams through a powerful, transparent network.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <AnimatedSection className="container px-4 md:px-6 mx-auto py-12 md:py-24" delay={0.1}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Democratizing Access to Wealth Creation
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe that everyone should have the opportunity to build wealth through their network. Our platform removes the barriers to entry for affiliate marketing, providing enterprise-grade tools to individuals.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-primary">10k+</h3>
                  <p className="text-sm text-muted-foreground">Active Affiliates</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-primary">$2M+</h3>
                  <p className="text-sm text-muted-foreground">Paid in Commissions</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border bg-card/50 backdrop-blur-sm p-8 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
               <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Card className="bg-background/60 backdrop-blur border-primary/10">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold">Global Reach</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/60 backdrop-blur border-primary/10 mt-8">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                        <Target className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold">Precision Tools</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/60 backdrop-blur border-primary/10 -mt-8">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold">Community</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/60 backdrop-blur border-primary/10">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold">Security</h3>
                    </CardContent>
                  </Card>
               </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Values Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">
                These principles guide every decision we make and every feature we build.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Transparency First",
                  description: "We believe in complete openness. No hidden fees, no confusing terms. You see exactly what you earn and how.",
                  icon: "🔍"
                },
                {
                  title: "Community Driven",
                  description: "Our success is tied to yours. We build features based on user feedback and prioritize community growth.",
                  icon: "🤝"
                },
                {
                  title: "Innovation",
                  description: "We constantly push the boundaries of what's possible in affiliate technology to give you the edge.",
                  icon: "💡"
                }
              ].map((value, i) => (
                <AnimatedSection key={i} delay={0.2 + (i * 0.1)}>
                  <div className="bg-background border rounded-xl p-8 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="container mx-auto px-4">
        <FooterSection />
      </div>
    </div>
  );
}
