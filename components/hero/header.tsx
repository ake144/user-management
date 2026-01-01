"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link for client-side navigation
import { HyperText } from "../ui/hyper-text"
import { ShimmerButton } from "../ui/shimmer-button"

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const navItems = [
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("/#")) {
      e.preventDefault()
      const targetId = href.substring(2) // Remove '/#'
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="w-full py-4 px-6 sticky top-0 z-50   border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-foreground text-xl font-semibold">Esperanza</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
              >
                <HyperText className="text-muted-foreground hover:text-foreground text-sm px-4 py-2 rounded-full font-medium transition-colors" >{item.name}</HyperText>
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
