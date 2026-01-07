"use client"

import Link from "next/link"

export function FooterSection() {
  return (
    <footer className="w-full bg-background border-t border-border/40 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Grid: Brand + 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
             <Link href="/" className="flex items-center gap-2">
                <div className="font-bold text-xl tracking-tight text-foreground">Esperanza</div>
             </Link>
             <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
               Technology platform for digital growth, automation, and performance-driven systems.
             </p>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Company</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Careers</Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-6">
             <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Legal</h3>
             <div className="flex flex-col gap-3 text-sm text-muted-foreground">
               <Link href="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
               <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
               <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
               <Link href="#" className="hover:text-foreground transition-colors">Disclaimer</Link>
             </div>
          </div>

          {/* Column 4: Support */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Support</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
              <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link>
              <Link href="/api" className="hover:text-foreground transition-colors">API Reference</Link>
            </div>
          </div>

        </div>

        {/* Disclaimer Line */}
        <div className="border-t border-border/40 pt-8 pb-4">
           <p className="text-center text-xs text-muted-foreground">
             Esperanza is a digital services platform. Platform features and availability may vary.
           </p>
        </div>

        {/* Copyright Line */}
        <div className="text-center pt-4">
           <p className="text-xs text-muted-foreground">
             © 2026 Esperanza. All rights reserved.
           </p>
        </div>

      </div>
    </footer>
  )
}
