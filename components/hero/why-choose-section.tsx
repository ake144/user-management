import { Lightbulb, Rocket, TrendingUp } from "lucide-react"
import Image from "next/image"

type FeatureCardProps = {
    title: string
    description: string
    icon: React.ElementType
    imageSrc?: string
    className?: string
}

const FeatureCard = ({ title, description, icon: Icon, imageSrc, className = "" }: FeatureCardProps) => (
    <div className={`group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${className}`}>
        <div className="flex flex-col gap-6">
            {/* Icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-7 h-7 text-primary" />
            </div>

            {/* Image (if provided) */}
            {imageSrc && (
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-zinc-800/50">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Content */}
            <div className="space-y-3">
                <h3 className="text-foreground text-2xl font-bold leading-tight">
                    {title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </div>
)

export function WhyChooseSection() {
    const features = [
        {
            title: "Learn with AI",
            description:
                "Laftiva equips you with AI-powered tools and insights to work smarter, create faster, and stay relevant in a rapidly changing digital world.",
            icon: Lightbulb,
            imageSrc: "/images/learn-ai.jpg", // You'll need to add this image
        },
        {
            title: "Create & Share Value",
            description:
                "Turn your creativity, influence, and knowledge into real digital value. Share trusted products, content, and opportunities through Laftiva's social marketing ecosystem.",
            icon: Rocket,
            imageSrc: "/images/create-value.jpg", // You'll need to add this image
        },
        {
            title: "Earn, Scale & Evolve",
            description:
                "Get rewarded for impact. Track performance, grow globally, and continuously adapt as AI reshapes how people connect, market, and earn.",
            icon: TrendingUp,
            imageSrc: "/images/earn-scale.svg",
        },
    ]

    return (
        <section id="whyus" className="w-full px-5 py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
            {/* Decorative background gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-primary text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                        Why Choose Laftiva
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Powerful features designed to help you succeed
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature}
                            className={index === 2 ? "md:col-span-1" : ""}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
