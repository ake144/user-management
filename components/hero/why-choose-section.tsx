import React from "react"
import { MapComponenet } from "./map"
import { Spotlight } from "../ui/spotlight"
import { Globe, Zap, TrendingUp, ShieldCheck } from "lucide-react"

export function WhyChooseSection() {
    return (
        <section id="whyus" className="w-full py-24 bg-background text-white relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill=""
            />
            
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
                
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400">
                    Global Scale, Local Roots.
                </h2>
                <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mb-20">
                    We bridge the gap between African potential and the global digital economy. 
                    One Platform provides the infrastructure, you bring the ambition.
                </p>

                {/* Central Visual - Map */}
                <div className="relative w-full mb-24 perspective-1000">
                    <div className="absolute inset-0 bg-linear-to-t from-background to-transparent z-10 bottom-0 h-20" />
                    <MapComponenet />
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
                    <FeatureCard 
                        icon={<Globe className="w-8 h-8 text-blue-400" />}
                        title="Borderless Access"
                        description="Connect to international markets from anywhere in Africa. We handle the complexity of cross-border operations."
                    />
                    
                    <FeatureCard 
                        icon={<Zap className="w-8 h-8 text-amber-400" />}
                        title="High-Performance Tech"
                        description="Powered by enterprise-grade infrastructure designed for speed, reliability, and seamless user experiences."
                    />
                    
                    <FeatureCard 
                        icon={<TrendingUp className="w-8 h-8 text-emerald-400" />}
                        title="Uncapped Earnings"
                        description="Our multi-tier affiliate system is built for scale. Grow your network and multiply your revenue streams."
                    />
                </div>

            </div>
        </section>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-start text-left p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
            <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold text-neutral-100 mb-3">{title}</h3>
            <p className="text-neutral-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
