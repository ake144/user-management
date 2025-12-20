import type React from "react"
import { Globe, MapPin } from "lucide-react"

const GlobalReachIllustration: React.FC = () => {
  const regions = [
    { name: "North America", active: true },
    { name: "Europe", active: true },
    { name: "Asia Pacific", active: true },
    { name: "Africa", active: false },
    { name: "Latin America", active: false },
  ]

  return (
    <div
      className="w-full h-full flex items-center justify-center p-4 relative"
      role="img"
      aria-label="Global Reach illustration showing active regions"
    >
      {/* Globe Background Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <Globe className="w-64 h-64 text-foreground" />
      </div>

      {/* Main Container */}
      <div
        style={{
          width: "300px",
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 100%)",
          backdropFilter: "blur(16px)",
          borderRadius: "12px",
          border: "1px solid hsl(var(--border))",
          overflow: "hidden",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
        }}
      >
        <div className="p-4 border-b border-border flex items-center gap-3 bg-muted/30">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">Active Regions</span>
        </div>

        <div className="p-2">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className={`w-3.5 h-3.5 ${region.active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs ${region.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {region.name}
                </span>
              </div>
              {region.active && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GlobalReachIllustration
