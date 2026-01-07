import { Header } from "@/components/hero/header"
import { FooterSection } from "@/components/hero/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, ChevronRight, Copy, Globe, Lock, Server, Terminal } from "lucide-react"

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6 flex-1 flex flex-col">
        <Header />
        
        <main className="mt-24 md:mt-32 w-full max-w-6xl mx-auto pb-20 flex-1">
          
          {/* Hero Section */}
          <div className="flex flex-col gap-6 mb-16 border-b border-border/50 pb-10">
            <div className="flex items-center gap-2 mb-2">
               <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Terminal className="w-5 h-5" />
               </div>
               <span className="text-sm font-medium text-muted-foreground">Developers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">API Reference</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
              Technical reference for integrating with the Esperanza platform APIs. Securely access platform functionality through authenticated requests.
            </p>
            <div className="flex gap-4 pt-2">
              <Button className="gap-2">
                Get API Key <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                Read Documentation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Sidebar Navigation (Desktop) */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-32 self-start">
               <div className="space-y-1">
                  <h3 className="font-semibold mb-4 px-3 text-sm uppercase tracking-wider text-muted-foreground">Contents</h3>
                  <DocsLink href="#overview" active>Overview</DocsLink>
                  <DocsLink href="#authentication">Authentication</DocsLink>
                  <DocsLink href="#endpoints">Endpoints</DocsLink>
                  <div className="pl-4 space-y-1 border-l border-border/50 ml-3 my-2">
                    <DocsLink href="#get-account" small>GET /account</DocsLink>
                    <DocsLink href="#get-referrals" small>GET /referrals</DocsLink>
                    <DocsLink href="#get-campaigns" small>GET /campaigns</DocsLink>
                    <DocsLink href="#post-campaigns" small>POST /campaigns</DocsLink>
                  </div>
                  <DocsLink href="#errors">Error Codes</DocsLink>
               </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9 lg:col-span-9 space-y-16">
              
              {/* Overview */}
              <section id="overview" className="scroll-mt-32">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                     <Globe className="w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-bold">Overview</h2>
                 </div>
                 <div className="prose prose-invert max-w-none text-muted-foreground mb-8">
                    <p className="text-lg leading-relaxed">
                      The Esperanza API allows approved clients to securely access platform functionality through authenticated requests. All API access is over HTTPS, and data is sent and received as JSON.
                    </p>
                 </div>

                 <Card className="bg-card/20 border-primary/20 backdrop-blur-sm overflow-hidden">
                    <div className="bg-muted/50 px-6 py-3 border-b border-border/50 flex items-center justify-between">
                      <span className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                        <Server className="w-4 h-4" /> Base URL
                      </span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <CardContent className="p-6 font-mono text-sm">
                      <span className="text-primary">https://api.esperanza.et/v1</span>
                    </CardContent>
                 </Card>
              </section>

              {/* Authentication */}
              <section id="authentication" className="scroll-mt-32">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                     <Lock className="w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-bold">Authentication</h2>
                 </div>
                 <p className="text-muted-foreground mb-6">
                   Authenticate your API requests by including your API key in the <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground">Authorization</code> header of every request.
                 </p>

                 <div className="rounded-lg bg-black border border-border/50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">bash</span>
                    </div>
                    <div className="p-4 font-mono text-sm overflow-x-auto">
                      <div className="text-purple-400 mb-2"># Structure</div>
                      <div className="text-blue-300">Authorization: <span className="text-white">Bearer YOUR_API_KEY</span></div>
                    </div>
                 </div>
              </section>

              {/* Endpoints */}
              <section id="endpoints" className="space-y-12">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                     <Server className="w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-bold">Endpoints</h2>
                 </div>

                 {/* GET /account */}
                 <EndpointBlock 
                   id="get-account"
                   method="GET" 
                   path="/account" 
                   title="Get Account Details"
                   description="Retrieve information about the authenticated user account."
                   response={`{
  "id": "acc_123456",
  "email": "user@example.com",
  "status": "active"
}`}
                 />

                 {/* GET /referrals */}
                 <EndpointBlock 
                   id="get-referrals"
                   method="GET" 
                   path="/referrals" 
                   title="List Referrals"
                   description="Get a list of users referred by the authenticated account."
                   response={`{
  "data": [
    {
      "referral_id": "ref_001",
      "status": "verified"
    }
  ]
}`}
                 />

                 {/* GET /campaigns */}
                 <EndpointBlock 
                   id="get-campaigns"
                   method="GET" 
                   path="/campaigns" 
                   title="List Campaigns"
                   description="Retrieve a list of all active and inactive marketing campaigns."
                   response={`{
  "data": [
    {
      "campaign_id": "cmp_789",
      "name": "Winter Promotion"
    }
  ]
}`}
                 />

                 {/* POST /campaigns */}
                 <EndpointBlock 
                   id="post-campaigns"
                   method="POST" 
                   path="/campaigns" 
                   title="Create Campaign"
                   description="Create a new marketing campaign."
                   response={`{
  "campaign_id": "cmp_790",
  "status": "created"
}`}
                 />

              </section>

              {/* Error Codes */}
              <section id="errors" className="scroll-mt-32">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                     <AlertCircle className="w-5 h-5" />
                   </div>
                   <h2 className="text-2xl font-bold">Error Codes</h2>
                 </div>
                 
                 <div className="rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-4 font-medium text-sm text-muted-foreground border-b border-border">
                       <div className="col-span-2">Code</div>
                       <div className="col-span-10">Description</div>
                    </div>
                    <div className="divide-y divide-border/50">
                       <ErrorRow code="400" desc="Bad Request - The request was unacceptable, often due to missing a required parameter." />
                       <ErrorRow code="401" desc="Unauthorized - No valid API key provided." />
                       <ErrorRow code="403" desc="Forbidden - The API key doesn't have permissions to perform the request." />
                       <ErrorRow code="429" desc="Rate Limit Exceeded - Too many requests hit the API too quickly." />
                       <ErrorRow code="500" desc="Server Error - Something went wrong on Esperanza's end." />
                    </div>
                 </div>
              </section>

            </div>
          </div>

        </main>
      </div>
      <FooterSection />
    </div>
  )
}

function DocsLink({ href, children, active, small }: { href: string, children: React.ReactNode, active?: boolean, small?: boolean }) {
  return (
    <a 
      href={href} 
      className={`block px-3 rounded-md transition-colors ${
        small ? "py-1 text-xs" : "py-1.5 text-sm"
      } ${
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
    >
      {children}
    </a>
  )
}

function EndpointBlock({ id, method, path, title, description, response }: { id: string, method: string, path: string, title: string, description: string, response: string }) {
   const methodColor = method === "GET" ? "text-blue-500 bg-blue-500/10 border-blue-500/20" : "text-green-500 bg-green-500/10 border-green-500/20"
   
   return (
      <div id={id} className="scroll-mt-32 rounded-xl border border-border bg-card/10 overflow-hidden">
         <div className="p-6 border-b border-border/50">
            <div className="flex items-start justify-between mb-4">
               <div>
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
               </div>
               <Badge variant="outline" className={`${methodColor} font-mono`}>{method}</Badge>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm bg-background/50 p-2 rounded border border-border/50">
               <span className="text-muted-foreground">https://api.esperanza.et/v1</span>
               <span className="text-foreground font-medium">{path}</span>
            </div>
         </div>
         <div className="bg-black/30 p-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
               <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Response</span>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">200 OK</span>
                 <span className="text-[10px] text-muted-foreground font-mono">application/json</span>
               </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-100">
               {response}
            </pre>
         </div>
      </div>
   )
}

function ErrorRow({ code, desc }: { code: string, desc: string }) {
   return (
      <div className="grid grid-cols-12 p-4 hover:bg-muted/30 transition-colors">
         <div className="col-span-2 font-mono text-sm text-red-500">{code}</div>
         <div className="col-span-10 text-sm text-muted-foreground">{desc}</div>
      </div>
   )
}
