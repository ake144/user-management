"use client"

import { Twitter, Github, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Social Links */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">Esperanza</div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Scale Your Influence. Multiply Opportunities. Build Success.</p>
        <div className="flex justify-start items-start gap-4">
          <a href="https://twitter.com/Esperanza" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center justify-center transition-colors hover:text-primary">
            <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a href="https://github.com/Esperanza" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center transition-colors hover:text-primary">
            <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a href="https://linkedin.com/company/Esperanza" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center transition-colors hover:text-primary">
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="font-bold text-sm leading-5 text-primary">Company</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a href="/about" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              About us
            </a>
            <a href="/terms" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Terms & Conditions
            </a>
            <a href="/privacy" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/support" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Support us
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="font-bold text-sm leading-5 text-primary">Use Cases</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="/use-cases/ecommerce" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
             Drive E-commerce Sales
            </a>
            <a href="/use-cases/affiliate" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Run Affiliate Programs
            </a>
            <a href="/use-cases/ai" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Automate Campaigns with AI
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="font-bold text-sm leading-5 text-primary">Resources</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="/docs" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="/api" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              API Reference
            </a>
            <a href="/community" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              Community
            </a>
            <a href="/faq" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
