import { Users, TrendingUp, Zap, Award, Target, Sparkles, Rocket } from "lucide-react"
import { CardContainer, CardBody, CardItem } from "../ui/3d-card"
import { cn } from "@/lib/utils"

type TestimonialCardType = "large-teal" | "large-light" | "small-dark"

type IconName = "users" | "trending-up" | "zap" | "award" | "target" | "sparkles" | "rocket"

type Testimonial = {
  quote: string
  name: string
  company: string
  icon: IconName
  type: TestimonialCardType
}

type TestimonialCardProps = Testimonial

const testimonials: Testimonial[] = [
  {
    quote:
      "Esperanza's AI-powered insights transformed how I approach affiliate marketing. I've tripled my earnings in just 3 months by optimizing my strategy based on real-time analytics.",
    name: "Sarah Johnson",
    company: "Digital Marketer",
    icon: "sparkles",
    type: "large-teal",
  },
  {
    quote:
      "The automated commission tracking is a lifesaver. No more spreadsheets – everything is calculated and displayed instantly.",
    name: "Michael Chen",
    company: "Tech Entrepreneur",
    icon: "zap",
    type: "small-dark",
  },
  {
    quote:
      "Building my network has never been easier. The visual tree makes it simple to see growth opportunities and support my team.",
    name: "Emma Rodriguez",
    company: "Network Leader",
    icon: "users",
    type: "small-dark",
  },
  {
    quote:
      "From zero to $10K monthly income! Esperanza's Transparent Referral Rewards system is the real deal for serious affiliate marketers.",
    name: "David Okonkwo",
    company: "Affiliate Pro",
    icon: "trending-up",
    type: "small-dark",
  },
  {
    quote:
      "The AI recommendations helped me identify which products convert best. My conversion rate jumped from 2% to 8% in weeks.",
    name: "Priya Sharma",
    company: "Content Creator",
    icon: "target",
    type: "small-dark",
  },
  {
    quote:
      "Instant payouts mean I can reinvest in my marketing campaigns immediately. The global payment support is incredible.",
    name: "Carlos Mendez",
    company: "Growth Strategist",
    icon: "rocket",
    type: "small-dark",
  },
  {
    quote:
      "Scaling from a solo affiliate to a team of 50+ was seamless. Esperanza handles all the complexity – I just focus on growing my network and earning.",
    name: "Lisa Tanaka",
    company: "Affiliate Network Owner",
    icon: "award",
    type: "large-light",
  },
]

const iconMap = {
  users: Users,
  "trending-up": TrendingUp,
  zap: Zap,
  award: Award,
  target: Target,
  sparkles: Sparkles,
  rocket: Rocket,
}

const TestimonialCard = ({ quote, name, company, icon, type }: TestimonialCardProps) => {
  const Icon = iconMap[icon]
  const isLarge = type.startsWith("large")
  const isTeal = type === "large-teal"
  
  return (
    <CardContainer className="inter-var w-full" containerClassName="py-2 w-full">
      <CardBody 
        className={cn(
          "relative group/card w-full h-auto rounded-xl p-6 border transition-all duration-300",
          isTeal 
            ? "bg-primary border-transparent" 
            : type === "large-light"
              ? "bg-white/50 dark:bg-white/5 border-black/5 dark:border-white/10 backdrop-blur-sm"
              : "bg-card border-black/5 dark:border-white/10 hover:border-primary/20"
        )}
      >
        {/* Decorative background elements */}
        {isTeal && (
           <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
           </div>
        )}
        
        {type === "large-light" && (
           <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
             <div className="absolute right-0 top-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
           </div>
        )}

        <CardItem translateZ="30" className="w-full mb-6">
          <div 
            className={cn(
              "relative z-10 font-medium leading-relaxed",
              isLarge ? "text-xl md:text-2xl" : "text-base",
              isTeal ? "text-primary-foreground" : "text-foreground"
            )}
          >
            "{quote}"
          </div>
        </CardItem>
        
        <div className="flex items-center justify-between mt-auto pt-4">
          <CardItem translateZ="40" className="flex items-center gap-3">
            <div 
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border",
                isTeal 
                  ? "bg-white/20 border-white/20" 
                  : "bg-primary/10 border-primary/10"
              )}
            >
              <Icon className={cn("w-5 h-5", isTeal ? "text-white" : "text-primary")} />
            </div>
            <div>
              <p className={cn("text-sm font-semibold", isTeal ? "text-primary-foreground" : "text-foreground")}>
                {name}
              </p>
              <p className={cn("text-xs", isTeal ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {company}
              </p>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export function TestimonialGridSection() {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Growth made effortless
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from affiliates who transformed their income with AI-powered insights, instant payouts, and powerful network tools.
          </p>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="break-inside-avoid">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
