type StatCardProps = {
    value: string
    label: string
}

const StatCard = ({ value, label }: StatCardProps) => (
    <div className="group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-8 md:p-10 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 text-center space-y-3">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">
                {value}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base font-medium tracking-wide">
                {label}
            </p>
        </div>
    </div>
)

export function StatsSection() {
    const stats = [
        { value: "10K+", label: "Active Users" },
        { value: "50+", label: "Countries" },
        { value: "1M+", label: "Transactions" },
        { value: "99.9%", label: "Uptime" },
    ]

    return (
        <section className="w-full px-5 py-12 md:py-16 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-[1320px] mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    )
}
