import { Header } from "@/components/hero/header";
import { FooterSection } from "@/components/hero/footer";
import { AnimatedSection } from "@/components/hero/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-background z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
          </div>
          
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
                Have questions about the Esperanza Affiliate Program? We're here to help you grow your network and earnings.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <AnimatedSection className="container px-4 md:px-6 mx-auto pb-20" delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="grid gap-6">
                <Card className="bg-card/50 backdrop-blur border-primary/10">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <p className="text-muted-foreground mb-2">For general inquiries and support</p>
                      <a href="mailto:support@esperanza.com" className="text-primary hover:underline">support@esperanza.com</a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-primary/10">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                      <p className="text-muted-foreground mb-2">Our headquarters</p>
                      <p className="text-foreground">123 Innovation Drive<br />Tech City, TC 90210</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur border-primary/10">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-500/10 text-green-500 mt-1">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-muted-foreground mb-2">Mon-Fri from 8am to 5pm</p>
                      <a href="tel:+15550000000" className="text-primary hover:underline">+1 (555) 000-0000</a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  We'd love to hear from you. Please fill out this form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First name</label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last name</label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                    <Input id="email" placeholder="john@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px]" />
                  </div>
                  <Button className="w-full gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </main>

      <div className="container mx-auto px-4">
        <FooterSection />
      </div>
    </div>
  );
}
