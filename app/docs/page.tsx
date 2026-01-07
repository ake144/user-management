import { Header } from "@/components/hero/header"
import { FooterSection } from "@/components/hero/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BookOpen, 
  UserPlus, 
  LayoutDashboard, 
  Gift, 
  BarChart, 
  Bot, 
  Code, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  ChevronRight,
  Zap
} from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6 flex-1 flex flex-col">
        <Header />
        
        <main className="mt-24 md:mt-32 w-full max-w-6xl mx-auto pb-20 flex-1">
          
          {/* Header Section */}
          <div className="flex flex-col gap-6 mb-16 border-b border-border/50 pb-10">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
               </div>
               <span className="text-sm font-medium text-muted-foreground">User Guide & Reference</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
              Technical and operational documentation for the Esperanza platform, including usage guidance, system features, and integration references.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Sidebar Navigation (Desktop) */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-32 self-start">
               <div className="space-y-1">
                  <h3 className="font-semibold mb-4 px-3">Contents</h3>
                  <DocsLink href="#overview" active>Overview</DocsLink>
                  <DocsLink href="#getting-started">Getting Started</DocsLink>
                  <DocsLink href="#platform-features">Platform Features</DocsLink>
                  <DocsLink href="#api-access">API Access</DocsLink>
                  <DocsLink href="#security">Security & Compliance</DocsLink>
                  <DocsLink href="#support">Support</DocsLink>
               </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9 lg:col-span-9 space-y-16">
              
              {/* Overview */}
              <section id="overview" className="scroll-mt-32">
                 <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                   <FileText className="w-6 h-6 text-primary" />
                   Overview
                 </h2>
                 <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      This documentation provides guidance for users, developers, and partners interacting with the Esperanza platform. Content may be updated to reflect platform improvements or regulatory requirements.
                    </p>
                 </div>
              </section>

              <Separator className="bg-border/50" />

              {/* Getting Started */}
              <section id="getting-started" className="scroll-mt-32">
                 <h2 className="text-2xl font-bold mb-8">Getting Started</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card/30 border-primary/20 backdrop-blur-sm">
                       <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                             <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                                <UserPlus className="w-6 h-6" />
                             </div>
                             <div>
                                <h3 className="font-bold text-lg mb-2">Account Creation</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                                   <li>Register using a valid email address</li>
                                   <li>Confirm your account via email verification</li>
                                   <li>Complete required profile information</li>
                                </ul>
                             </div>
                          </div>
                       </CardContent>
                    </Card>

                    <Card className="bg-card/30 border-primary/20 backdrop-blur-sm">
                       <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                             <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
                                <LayoutDashboard className="w-6 h-6" />
                             </div>
                             <div>
                                <h3 className="font-bold text-lg mb-2">Dashboard Access</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                                   <li>Account overview and settings</li>
                                   <li>Referral and campaign tracking</li>
                                   <li>Analytics and performance metrics</li>
                                </ul>
                             </div>
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </section>

              <Separator className="bg-border/50" />

              {/* Platform Features */}
              <section id="platform-features" className="scroll-mt-32">
                 <h2 className="text-2xl font-bold mb-8">Platform Features</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="group rounded-xl border border-border/50 bg-card/20 p-6 hover:bg-card/40 transition-colors">
                       <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-emerald-500/10 p-2.5 text-emerald-500">
                          <Gift className="h-6 w-6" />
                       </div>
                       <h3 className="text-xl font-semibold mb-3">Referral & Rewards</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed">
                          Esperanza tracks referral activity through unique identifiers and issues rewards based on qualifying actions, subject to platform rules.
                       </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="group rounded-xl border border-border/50 bg-card/20 p-6 hover:bg-card/40 transition-colors">
                       <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-orange-500/10 p-2.5 text-orange-500">
                          <BarChart className="h-6 w-6" />
                       </div>
                       <h3 className="text-xl font-semibold mb-3">Campaign Management</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed">
                          Users can create, monitor, and adjust campaigns using built-in analytics and performance indicators to maximize impact.
                       </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="group rounded-xl border border-border/50 bg-card/20 p-6 hover:bg-card/40 transition-colors md:col-span-2">
                       <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="mb-4 md:mb-0 inline-flex items-center justify-center rounded-lg bg-pink-500/10 p-2.5 text-pink-500 shrink-0">
                             <Bot className="h-6 w-6" />
                          </div>
                          <div>
                             <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                AI-Assisted Automation
                                <Badge variant="secondary" className="text-xs bg-pink-500/10 text-pink-500 border-pink-500/20">Beta</Badge>
                             </h3>
                             <p className="text-muted-foreground text-sm leading-relaxed">
                                Automation features provide data-driven recommendations to support operational efficiency and campaign optimization. Our AI analyzes patterns to suggest the best times and channels for your campaigns.
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
              
              {/* API Access */}
              <section id="api-access" className="scroll-mt-32">
                 <div className="rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                             <div className="p-2 bg-background border border-border rounded-md">
                                <Code className="w-5 h-5 text-foreground" />
                             </div>
                             <h2 className="text-2xl font-bold">API Access</h2>
                          </div>
                          <p className="text-muted-foreground mb-6">
                             Esperanza APIs enable approved integrations. Access may require authentication credentials and compliance with usage policies.
                          </p>
                          <div className="flex gap-3">
                             <Button variant="outline" className="gap-2">
                                Read API Docs <ChevronRight className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost">Request Access</Button>
                          </div>
                       </div>
                       <div className="w-full md:w-1/3 bg-black/40 rounded-lg border border-white/5 p-4 font-mono text-xs text-muted-foreground">
                          <div className="flex gap-1.5 mb-3">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                          </div>
                          <div className="space-y-1">
                             <p><span className="text-purple-400">GET</span> /v1/campaigns</p>
                             <p><span className="text-blue-400">Authorization:</span> Bearer token</p>
                             <p className="text-green-400/70">{`{ "status": "success", "data": [...] }`}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>

              <Separator className="bg-border/50" />

              {/* Security & Support Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <section id="security" className="scroll-mt-32">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                       <ShieldCheck className="w-5 h-5 text-green-500" />
                       Security & Compliance
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                       Esperanza applies security and access controls to protect user data and platform integrity. Users remain responsible for credential protection.
                    </p>
                    <div className="flex gap-2">
                       <Badge variant="outline" className="border-green-500/20 text-green-500 bg-green-500/5">SSL Secured</Badge>
                       <Badge variant="outline" className="border-green-500/20 text-green-500 bg-green-500/5">Data Encrypted</Badge>
                    </div>
                 </section>

                 <section id="support" className="scroll-mt-32">
                    <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                       <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-primary" />
                          Need Support?
                       </h2>
                       <p className="text-muted-foreground text-sm mb-4">
                          For assistance, refer to the FAQ or contact our support team directly.
                       </p>
                       <div className="flex gap-3 items-center">
                          <Link href="/contact">
                             <Button size="sm">Contact Support</Button>
                          </Link>
                          <Link href="/faq" className="text-sm text-primary hover:underline">
                             Visit FAQ
                          </Link>
                       </div>
                    </div>
                 </section>
              </div>

            </div>
          </div>

        </main>
      </div>
      <FooterSection />
    </div>
  )
}

function DocsLink({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) {
  return (
    <a 
      href={href} 
      className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
    >
      {children}
    </a>
  )
}
