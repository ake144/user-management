import React from "react"
import { MapComponenet } from "./map"
import { Spotlight } from "../ui/spotlight"
import { Globe, Zap, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WhyChooseSection() {
    return (
        <section id="whyus" className="w-full py-24 bg-background text-foreground relative overflow-hidden">
            <Spotlight
                className="-top-30 left-0 md:left-60 md:-top-20"
                fill="var(--primary)"
            />
            
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
                
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-6">
                    Why Choose Esperanza
                </div>

                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    Global Scale, Local Roots.
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-3xl sm:mb-4 md:mb-14 lg:mb-20">
                    We bridge the gap between African potential and the global digital economy. 
                    One Platform provides the infrastructure, you bring the ambition.
                </p>

                {/* Central Visual - Map */}
                <div className="relative w-full sm:mb-15 md:mb-24 perspective-1000">
                    <MapComponenet />
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
                    <FeatureCard 
                        icon={<Globe className="w-6 h-6 text-blue-500" />}
                        title="Borderless Access"
                        description="Connect to international markets from anywhere in Africa. We handle the complexity of cross-border operations."
                        gradient="from-blue-500/20 to-transparent"
                    />
                    
                    <FeatureCard 
                        icon={<Zap className="w-6 h-6 text-amber-500" />}
                        title="High-Performance Tech"
                        description="Powered by enterprise-grade infrastructure designed for speed, reliability, and seamless user experiences."
                        gradient="from-amber-500/20 to-transparent"
                    />
                    
                    <FeatureCard 
                        icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
                        title="Uncapped Earnings"
                        description="Our multi-tier affiliate system is built for scale. Grow your network and multiply your revenue streams."
                        gradient="from-emerald-500/20 to-transparent"
                    />
                </div>
                
                <div className="mt-16">
                    <Link href="/auth/login">
                        <Button size="lg" className="rounded-full px-8 gap-2">
                            Start Your Journey <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    )
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode, title: string, description: string, gradient: string }) {
    return (
        <div className="group relative flex flex-col items-start text-left p-8 rounded-3xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 mb-6 p-4 rounded-2xl bg-background/80 border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="relative z-10 text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="relative z-10 text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    )
}
