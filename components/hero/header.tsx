"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link for client-side navigation
import { HyperText } from "../ui/hyper-text"
import { ShimmerButton } from "../ui/shimmer-button"

export function Header() {
  const navItems = [
    { name: "Features", href: "#features-section" },
    { name: "Testimonials", href: "#testimonials-section" },
    { name: "FAQ", href: "#faq-section" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove '#' from href
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-foreground text-xl font-semibold">Esperanza</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)} // Add onClick handler
                
              >
                <HyperText className="text-[#888888] hover:text-foreground text-md px-4 py-2 rounded-full font-medium transition-colors" >{item.name}</HyperText>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" rel="noopener noreferrer">
            <ShimmerButton className="h-9 px-4 md:h-10 md:px-6 text-sm md:text-base">Try for Free</ShimmerButton>
          </Link>
        </div>
      </div>
    </header>
  )
}
