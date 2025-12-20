import Link from "next/link";
import { ArrowRight, Users, TrendingUp, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <span>AffiliatePro</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-white dark:to-purple-400">
                    Earn Unlimited Commissions – Build Your Affiliate Empire
                  </h1>
                  <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
                    Unlock the potential of exponential growth. Our advanced referral tree system ensures you earn from every connection you make.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/auth/signin"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Visual Teaser: Pyramid */}
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl p-8 shadow-2xl">
                  {/* Abstract Pyramid SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>

                    {/* Top Level */}
                    <path d="M100 20 L130 70 H70 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950" />

                    {/* Middle Level */}
                    <path d="M65 75 L95 125 H35 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-80" />
                    <path d="M105 75 L135 125 H75 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-80" />
                    <path d="M135 75 L165 125 H105 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-80" />

                    {/* Bottom Level - Simplified for visual balance */}
                    <path d="M30 130 L60 180 H0 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-60" />
                    <path d="M70 130 L100 180 H40 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-60" />
                    <path d="M110 130 L140 180 H80 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-60" />
                    <path d="M150 130 L180 180 H120 Z" fill="url(#grad1)" stroke="currentColor" strokeWidth="2" className="text-white dark:text-zinc-950 opacity-60" />

                    {/* Connecting lines to imply network */}
                    <line x1="100" y1="50" x2="80" y2="100" stroke="currentColor" strokeWidth="1" className="text-zinc-400 dark:text-zinc-600" strokeDasharray="4" />
                    <line x1="100" y1="50" x2="120" y2="100" stroke="currentColor" strokeWidth="1" className="text-zinc-400 dark:text-zinc-600" strokeDasharray="4" />
                  </svg>

                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg border shadow-sm text-xs font-mono text-muted-foreground">
                    Referral Network
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-zinc-200 p-4 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Grow Together</h2>
                <p className="text-center text-zinc-500 dark:text-zinc-400">Invite friends and earn commissions on their activity forever.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-zinc-200 p-4 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Real-time Analytics</h2>
                <p className="text-center text-zinc-500 dark:text-zinc-400">Track your network's performance and your earnings in real-time.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-zinc-200 p-4 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Secure Payouts</h2>
                <p className="text-center text-zinc-500 dark:text-zinc-400">Automated and secure commission payouts directly to your wallet.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2024 AffiliatePro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
