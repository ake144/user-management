import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "./header"
import { ReferralTree } from "@/components/referral-tree"
import { Sparkles, ArrowRight } from "lucide-react"
import { Spotlight } from "../ui/spotlight"

export function HeroSection() {
  return (
    <>
     <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
    
   
    <section
      className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4
         w-full md:w-[1220px] min-h-[800px] md:px-0 bg-background"
    >
     
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g clipPath="url(#clip0_186_1134)">
            <mask
              id="mask0_186_1134"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="10"
              y="-1"
              width="1200"
              height="812"
            >
              <rect x="10" y="-0.84668" width="1200" height="811.693" fill="url(#paint0_linear_186_1134)" />
            </mask>
            <g mask="url(#mask0_186_1134)">
              {/* Grid Rectangles */}
              {[...Array(35)].map((_, i) => (
                <React.Fragment key={`row1-${i}`}>
                  {/* Reduced grid density for cleaner look */}
                  {i % 2 === 0 && (
                    <rect
                      x={-20.0891 + i * 36}
                      y="9.2"
                      width="35.6"
                      height="35.6"
                      stroke="hsl(var(--foreground))"
                      strokeOpacity="0.05"
                      strokeWidth="0.4"
                      strokeDasharray="2 2"
                    />
                  )}
                </React.Fragment>
              ))}
            </g>

            <g filter="url(#filter0_f_186_1134)">
              <path
                d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
                fill="url(#paint1_linear_186_1134)"
              />
            </g>

            <g filter="url(#filter1_f_186_1134)">
              <path
                d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
                fill="url(#paint2_linear_186_1134)"
                fillOpacity="0.69"
              />
            </g>

            <g style={{ mixBlendMode: "lighten" }} filter="url(#filter2_f_186_1134)">
              <path
                d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
                fill="url(#paint3_linear_186_1134)"
              />
            </g>
          </g>

          <rect
            x="0.5"
            y="0.5"
            width="1219"
            height="809"
            rx="15.5"
            stroke="hsl(var(--foreground))"
            strokeOpacity="0.06"
          />

          <defs>
            <filter
              id="filter0_f_186_1134"
              x="147.369"
              y="-467.818"
              width="1941.42"
              height="2035.46"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter1_f_186_1134"
              x="-554.207"
              y="-1169.39"
              width="3216.57"
              height="3310.61"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="478.182" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter2_f_186_1134"
              x="426.762"
              y="-452.424"
              width="1622.63"
              height="1716.67"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="79.6969" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <linearGradient
              id="paint0_linear_186_1134"
              x1="35.0676"
              y1="23.6807"
              x2="903.8"
              y2="632.086"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(var(--foreground))" stopOpacity="0" />
              <stop offset="1" stopColor="hsl(var(--muted-foreground))" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_186_1134"
              x1="1118.08"
              y1="-149.03"
              x2="1118.08"
              y2="1248.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(var(--foreground))" />
              <stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
              <stop offset="1" stopColor="hsl(var(--primary))" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_186_1134"
              x1="1054.08"
              y1="-213.03"
              x2="1054.08"
              y2="1184.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(var(--foreground))" />
              <stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
              <stop offset="1" stopColor="hsl(var(--primary))" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_186_1134"
              x1="1238.08"
              y1="-293.03"
              x2="1238.08"
              y2="1104.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="hsl(var(--foreground))" />
              <stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
              <stop offset="1" stopColor="hsl(var(--primary))" />
            </linearGradient>
            <clipPath id="clip0_186_1134">
              <rect width="1220" height="810" rx="16" fill="hsl(var(--foreground))" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Header positioned at top of hero container */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      <div className="relative z-10 flex flex-col items-center mt-24 md:mt-32 px-4 w-full">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary/50 backdrop-blur-sm mb-6">
          <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
          <span className="text-muted-foreground">The #1 Affiliate Network Platform</span>
        </div>

        <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
          Scale Your Influence. Multiply Opportunities.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
             Build Success
          </span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mt-6">
          {/* Join the world's most rewarding referral ecosystem. Build your downline, track real-time commissions, and scale your earnings with our multi-tier affiliate system. */}
         Join a powerful digital platform built to help you scale your influence, multiply opportunities, and convert passion into measurable success. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/auth/login">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-full font-semibold text-lg shadow-lg shadow-primary/25 transition-all hover:scale-105">
              Start Earning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#whyus">
            <Button variant="outline" className="bg-background/50 backdrop-blur-sm px-8 py-6 rounded-full font-semibold text-lg hover:bg-accent">
              Why Esperanza
            </Button>
          </Link>
        </div>

        {/* Visual Element: Referral Tree embedded */}
        <div className="mt-16 w-full max-w-5xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 h-full w-full pointer-events-none" />
          <div className="relative bg-card/30 backdrop-blur-sm border rounded-3xl overflow-hidden shadow-2xl p-8 transform perspective-1000 rotate-x-12 scale-95 opacity-90 hover:opacity-100 hover:scale-100 transition-all duration-700">
            <div className="absolute top-4 left-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="mt-4">
              <ReferralTree />
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
  )
}
