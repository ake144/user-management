import React from "react"

export function WhyChooseSection() {
    return (
        <section id="whyus" className="w-full py-24  text-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
                
                <h2 className="text-4xl md:text-5xl font-medium mb-20 tracking-tight text-white">
                    You&apos;re safe to grow with us
                </h2>

                {/* Central Visual - Abstract 3D Ring Representation */}
                <div className="relative w-80 h-80 mb-24 perspective-1000">
                    <div className="absolute inset-0 bg-zinc-500/5 blur-[100px] rounded-full" />
                    
                    {/* Rings Container */}
                    <div className="relative w-full h-full flex items-center justify-center animate-slow-spin">
                        {/* Outer Ring */}
                        <div className="absolute w-64 h-64 rounded-full border-[24px] border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] transform rotate-x-45 rotate-y-12 bg-gradient-to-b from-zinc-700 to-zinc-900" 
                             style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateY(15deg)' }}>
                             <div className="absolute inset-0 rounded-full border-t border-white/10"></div>
                        </div>
                        
                        {/* Inner Interlocking Ring */}
                        <div className="absolute w-56 h-56 rounded-full border-[24px] border-zinc-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] transform"
                             style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-45deg) rotateY(30deg)' }}>
                             <div className="absolute inset-0 rounded-full border-t border-white/10"></div>
                        </div>

                        {/* Center Glow */}
                        <div className="absolute w-32 h-32 bg-zinc-500/10 blur-2xl rounded-full" />
                    </div>
                </div>

                {/* Three Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-9xl px-4">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-3xl  font-bold text-zinc-100">Learn with AI</h3>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-full">
                            Esperanza equips you with AI-powered tools and insights to work smarter, create faster, and stay relevant.
                        </p>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-3xl  font-bold text-zinc-100">Create & Share Value</h3>
                        <p className="text-zinc-500 text-lg leading-relaxed ">
                            Turn your creativity, influence, and knowledge into real digital value.
                        </p>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-3xl  font-bold text-zinc-100">Earn, Scale & Evolve</h3>
                        <p className="text-zinc-500 text-lg leading-relaxed ">
                           Get rewarded for impact. Track performance, grow globally, and continuously adapt
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
