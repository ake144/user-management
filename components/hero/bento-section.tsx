import type { FC, ComponentType } from "react"
import { TrendingUp, Users, Wallet, Globe, ShieldCheck, Zap, Code2, Palette } from "lucide-react"
import AnalyticsIllustration from "./bento/analytics-illustration"
import NetworkIllustration from "./bento/network-illustration"
import PayoutsIllustration from "./bento/payouts-illustration"
import GlobalReachIllustration from "./bento/global-reach-illustration"
import SecurityIllustration from "./bento/security-illustration"
import APIIllustration from "./bento/api-illustration"
import MarketingIllustration from "./bento/marketing-illustration"
import { CardContainer } from "../ui/3d-card"

type BentoCardProps = {
  title: string
  description: string
  icon: React.ElementType
  className?: string
  component?: ComponentType<any>
}

const BentoCard: FC<BentoCardProps> = ({ title, description, icon: Icon, className, component: Component }) => (
  <CardContainer 
    containerClassName="py-1 md:py-4 w-full h-full"
    className={`overflow-hidden inter-var rounded-2xl border border-white/20 flex flex-col justify-start items-start relative ${className}`}
  >
    

  <div >
    {/* Background with blur effect */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "hsl(var(--card))",
        opacity: 0.1,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    {/* Additional subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-between h-full relative z-10">
      <div className="flex flex-col gap-4">
        <div className="p-3 bg-primary/10 w-fit rounded-xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-foreground text-xl font-semibold leading-7 mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
    {Component ? (
      <div className="self-stretch h-72 relative -mt-0.5 z-10 w-full">
        <Component />
      </div>
    ) : null}
  </div>
</CardContainer>
)

export function BentoSection() {
  const cards = [
   
    {
      title: "Transparent Referral Rewards",
      description: "Esperanza offers a simple referral rewards program where you earn commissions when users you recommend successfully join and use the platform.",
      icon: Users,
      component: NetworkIllustration,
    },
    {
      title: "Instant Payouts",
      description: "Withdraw your earnings instantly through multiple gateways. No more waiting for monthly cycles.",
      icon: Wallet,
      component: PayoutsIllustration,
    },
    {
      title: "Global Reach",
      description: "Recruit affiliates from anywhere in the world. Our platform supports localized payments globally.",
      icon: Globe,
      component: GlobalReachIllustration,
      className: "md:col-span-2",
    },
     {
      title: "Marketing Assets",
      description: "Access a library of high-converting banners, templates, and brand kits to boost your promotions.",
      icon: Palette,
      component: MarketingIllustration,
      className: "md:col-span-2",
    },
    {
      title: "Bank-Grade Security",
      description: "Your data and earnings are protected by enterprise-level encryption and fraud protection.",
      icon: ShieldCheck,
      component: SecurityIllustration,
    },
     {
      title: "Real-Time Analytics",
      description: "Track every click, sign-up, and commission as it happens. Deep insights into your network's performance.",
      icon: TrendingUp,
      component: AnalyticsIllustration,
      className: "md:col-span-2",
    },
    // {
    //   title: "API & Webhooks",
    //   description: "Integrate Esperanza into your own tools with our powerful REST API and real-time webhooks.",
    //   icon: Code2,
    //   component: APIIllustration,
    // },
   
    // {
    //   title: "High Commission Rates",
    //   description: "Enjoy some of the most competitive commission rates in the industry with lifetime rewards.",
    //   icon: Zap,
    // },
  ]

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              Everything You Need to Scale
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Powerful tools and features designed to help you maximize your affiliate earnings and grow your network.
            </p>
          </div>
        </div>
        <div className="self-stretch grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 z-10 max-w-[1200px] mx-auto">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
