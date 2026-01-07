"use client"

import { useState } from "react"
import { Header } from "@/components/hero/header"
import { FooterSection } from "@/components/hero/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Copy } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    })

    setFormData({
      name: "",
      email: "",
      topic: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard", {
      description: `${label} email copied: ${text}`,
    })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6 flex-1 flex flex-col">
        <Header />
        
        <main className="mt-24 md:mt-32 w-full max-w-[1200px] mx-auto pb-20">
          
          {/* Header Section */}
          <div className="flex flex-col gap-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              Reach Esperanza for support, partnerships, or legal/privacy requests. We respond as quickly as possible during business hours.
            </p>
            <div>
                 <Badge variant="outline" className="rounded-full px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary">
                    Support • Partnerships • Legal
                </Badge>
            </div>
           
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Contact Form */}
            <div className="rounded-xl border border-border bg-card/30 p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-xl font-bold">Send a Message</h2>
                <Badge variant="secondary" className="w-fit text-xs font-normal">Typical response: 1–2 business days</Badge>
              </div>

              <div className="mb-6 text-sm text-muted-foreground">
                <p>Fill in the form and we&apos;ll route your message to the right team. Please avoid sharing passwords or sensitive data.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select 
                      value={formData.topic} 
                      onValueChange={(value) => setFormData({...formData, topic: value})}
                      required
                    >
                      <SelectTrigger id="topic" className="bg-background/50">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">General Support</SelectItem>
                        <SelectItem value="sales">Business & Partnerships</SelectItem>
                        <SelectItem value="legal">Legal & Privacy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help?" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Write your message..." 
                    className="min-h-[150px] bg-background/50 resize-y" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                   <p className="text-xs text-muted-foreground order-2 sm:order-1">
                    By sending this message, you agree to our <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                   </p>
                   <Button type="submit" className="w-full sm:w-auto order-1 sm:order-2" disabled={isSubmitting}>
                     {isSubmitting ? "Sending..." : "Send Message"}
                   </Button>
                </div>
              </form>
            </div>

            {/* Right Column: Contact Info */}
            <div className="space-y-6">
                
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                 <h2 className="text-xl font-bold">Contact Information</h2>
                 <Badge variant="outline" className="w-fit text-xs font-normal border-orange-500/30 text-orange-500 bg-orange-500/10">Official channels</Badge>
               </div>

               <p className="text-muted-foreground text-sm">
                 We communicate only via official <span className="text-foreground font-medium">@esperanza.et</span> addresses. We will never ask you for your password.
               </p>

               <div className="grid gap-4">
                  {/* Support Card */}
                  <div className="p-4 rounded-lg bg-card/20 border border-border/50 hover:bg-card/40 transition-colors">
                      <div className="flex flex-col gap-2">
                          <span className="text-sm font-medium text-muted-foreground">General Support</span>
                          <div className="flex items-center justify-between group">
                              <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="pointer-events-none text-xs h-6 px-2">Email</Badge>
                                  <a href="mailto:support@esperanza.et" className="font-mono text-sm hover:underline hover:text-primary transition-colors">support@esperanza.et</a>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard('support@esperanza.et', 'Support')}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                          </div>
                      </div>
                  </div>

                  {/* Partnerships Card */}
                  <div className="p-4 rounded-lg bg-card/20 border border-border/50 hover:bg-card/40 transition-colors">
                      <div className="flex flex-col gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Business & Partnerships</span>
                          <div className="flex items-center justify-between group">
                              <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="pointer-events-none text-xs h-6 px-2">Email</Badge>
                                  <a href="mailto:partnerships@esperanza.et" className="font-mono text-sm hover:underline hover:text-primary transition-colors">partnerships@esperanza.et</a>
                              </div>
                               <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard('partnerships@esperanza.et', 'Partnerships')}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">For integrations, collaborations, and enterprise requests.</p>
                      </div>
                  </div>

                   {/* Legal Card */}
                   <div className="p-4 rounded-lg bg-card/20 border border-border/50 hover:bg-card/40 transition-colors">
                      <div className="flex flex-col gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Legal & Privacy</span>
                          <div className="flex items-center justify-between group">
                              <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="pointer-events-none text-xs h-6 px-2">Email</Badge>
                                  <a href="mailto:legal@esperanza.et" className="font-mono text-sm hover:underline hover:text-primary transition-colors">legal@esperanza.et</a>
                              </div>
                               <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard('legal@esperanza.et', 'Legal')}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                          </div>
                           <p className="text-xs text-muted-foreground mt-1">For privacy requests, compliance questions, or policy issues.</p>
                      </div>
                  </div>

                  {/* Hours Card */}
                  <div className="p-4 rounded-lg bg-card/20 border border-border/50">
                      <div className="flex flex-col gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Support Hours</span>
                          <div className="flex items-center gap-2 md:gap-3">
                              <Badge variant="outline" className="text-xs h-6 px-2">EAT</Badge>
                              <span className="text-sm font-medium">Mon–Fri, 9:00 AM – 6:00 PM</span>
                          </div>
                           <p className="text-xs text-muted-foreground mt-1">Closed on weekends and public holidays.</p>
                      </div>
                  </div>

               </div>
            </div>

          </div>

        </main>
      </div>
      <FooterSection />
    </div>
  )
}
