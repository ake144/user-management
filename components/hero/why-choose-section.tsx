import React from "react"
import { MapComponenet } from "./map"

export function WhyChooseSection() {
    return (
        <section id="whyus" className="w-full py-24  text-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
                
                <h2 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight text-white">
                    Connecting Africa to the Global Economy
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mb-20">
                    We are building the bridge between African talent and global opportunities. 
                    A platform designed for the future, rooted in potential, and scaling without borders.
                </p>

                {/* Central Visual - Abstract 3D Ring Representation */}
                <div className="relative w-full mb-24 perspective-1000">
                    <MapComponenet  />
                </div>

                {/* Three Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-9xl px-4">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-3xl  font-bold text-zinc-100">Global Reach, Local Impact</h3>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-full">
                            From Addis Ababa to New York, our platform empowers you to earn globally while building locally. Access international markets with ease.
                        </p>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-3xl  font-bold text-zinc-100">Empowered by Technology</h3>
                        <p className="text-zinc-500 text-lg leading-relaxed ">
                            Leverage cutting-edge AI and digital tools designed to simplify affiliate marketing. We provide the tech so you can focus on growth.
                        </p>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-3xl  font-bold text-zinc-100">Earn, Scale & Evolve</h3>
                        <p className="text-zinc-500 text-lg leading-relaxed ">
                           Unlock diverse revenue streams through our multi-tier system. Track performance in real-time and scale your digital empire.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
