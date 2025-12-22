import { Users, TrendingUp, Zap, Award, Target, Sparkles, Rocket } from "lucide-react"

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
      "Laftiva's AI-powered insights transformed how I approach affiliate marketing. I've tripled my earnings in just 3 months by optimizing my strategy based on real-time analytics.",
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
      "From zero to $10K monthly passive income! Laftiva's multi-tier rewards system is the real deal for serious affiliate marketers.",
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
      "Scaling from a solo affiliate to a team of 50+ was seamless. Laftiva handles all the complexity – I just focus on growing my network and earning.",
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
  const isLargeCard = type.startsWith("large")
  const avatarSize = isLargeCard ? 48 : 36
  const padding = isLargeCard ? "p-6" : "p-[30px]"

  const Icon = iconMap[icon]

  let cardClasses = `flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative ${padding}`
  let quoteClasses = ""
  let nameClasses = ""
  let companyClasses = ""
  let backgroundElements = null
  let cardHeight = ""
  let avatarBgClasses = ""
  let iconColor = ""
  const cardWidth = "w-full md:w-[384px]"

  if (type === "large-teal") {
    cardClasses += " bg-primary"
    quoteClasses += " text-primary-foreground text-2xl font-medium leading-8"
    nameClasses += " text-primary-foreground text-base font-normal leading-6"
    companyClasses += " text-primary-foreground/60 text-base font-normal leading-6"
    avatarBgClasses = "bg-white/20 backdrop-blur-sm"
    iconColor = "text-white"
    cardHeight = "h-[502px]"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
      />
    )
  } else if (type === "large-light") {
    cardClasses += " bg-[rgba(231,236,235,0.12)]"
    quoteClasses += " text-foreground text-2xl font-medium leading-8"
    nameClasses += " text-foreground text-base font-normal leading-6"
    companyClasses += " text-muted-foreground text-base font-normal leading-6"
    avatarBgClasses = "bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm"
    iconColor = "text-primary"
    cardHeight = "h-[502px]"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/images/large-card-background.svg')", zIndex: 0 }}
      />
    )
  } else {
    cardClasses += " bg-card outline outline-1 outline-border outline-offset-[-1px]"
    quoteClasses += " text-foreground/80 text-[17px] font-normal leading-6"
    nameClasses += " text-foreground text-sm font-normal leading-[22px]"
    companyClasses += " text-muted-foreground text-sm font-normal leading-[22px]"
    avatarBgClasses = "bg-gradient-to-br from-primary/10 to-purple-500/10"
    iconColor = "text-primary"
    cardHeight = "h-[244px]"
  }

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight}`}>
      {backgroundElements}
      <div className={`relative z-10 font-normal break-words ${quoteClasses}`}>{quote}</div>
      <div className="relative z-10 flex justify-start items-center gap-3">
        <div
          className={`flex items-center justify-center rounded-full ${avatarBgClasses}`}
          style={{
            width: `${avatarSize}px`,
            height: `${avatarSize}px`,
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          <Icon className={`${iconColor}`} size={isLargeCard ? 24 : 18} />
        </div>
        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className={nameClasses}>{name}</div>
          <div className={companyClasses}>{company}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialGridSection() {
  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            Growth made effortless
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed">
            {"Hear from affiliates who transformed their income with"} <br />{" "}
            {"AI-powered insights, instant payouts, and powerful network tools"}
          </p>
        </div>
      </div>
      <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-4 lg:gap-6 max-w-[1100px] mx-auto">
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[0]} />
          <TestimonialCard {...testimonials[1]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[2]} />
          <TestimonialCard {...testimonials[3]} />
          <TestimonialCard {...testimonials[4]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[5]} />
          <TestimonialCard {...testimonials[6]} />
        </div>
      </div>
    </section>
  )
}
