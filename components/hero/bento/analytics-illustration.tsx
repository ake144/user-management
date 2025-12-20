import type React from "react"

const AnalyticsIllustration: React.FC = () => {
  const themeVars = {
    "--ai-primary-color": "hsl(var(--primary))",
    "--ai-background-color": "hsl(var(--background))",
    "--ai-text-color": "hsl(var(--foreground))",
    "--ai-text-dark": "hsl(var(--primary-foreground))",
    "--ai-border-color": "hsl(var(--border))",
    "--ai-border-main": "hsl(var(--foreground) / 0.1)",
    "--ai-highlight-primary": "hsl(var(--primary) / 0.12)",
    "--ai-highlight-header": "hsl(var(--accent) / 0.2)",
  }

  return (
    <div
      style={
        {
          width: "100%",
          height: "100%",
          position: "relative",
          background: "transparent",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Affiliate Analytics dashboard showing earnings and conversion rates"
    >
      {/* Background Stats Box (Blurred) */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%) scale(0.9)",
          width: "340px",
          height: "205.949px",
          background: "linear-gradient(180deg, var(--ai-background-color) 0%, transparent 100%)",
          opacity: 0.6,
          borderRadius: "8.826px",
          border: "0.791px solid var(--ai-border-color)",
          overflow: "hidden",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="border rounded-lg bg-card"
          style={{
            padding: "15px",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-32 bg-primary/20 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-muted/50 rounded" />
              <div className="h-12 bg-muted/50 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Foreground Analytics Box (Main) */}
      <div
        style={{
          position: "absolute",
          top: "51.336px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "340px",
          height: "221.395px",
          background: "var(--ai-background-color)",
          backdropFilter: "blur(16px)",
          borderRadius: "9.488px",
          border: "1px solid var(--ai-border-main)",
          overflow: "hidden",
        }}
      >
        <div
          className="bg-card border border-border"
          style={{
            padding: "20px",
            height: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Total Earnings</p>
                <h3 className="text-2xl font-bold text-foreground">$12,450.80</h3>
              </div>
              <div className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full border border-green-500/20">
                +14.2%
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end gap-2 h-20">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/20 rounded-t-sm relative group"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[8px] text-muted-foreground uppercase font-bold">Clicks</p>
                  <p className="text-sm font-bold">8.4k</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[8px] text-muted-foreground uppercase font-bold">Signups</p>
                  <p className="text-sm font-bold">142</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[8px] text-muted-foreground uppercase font-bold">CR</p>
                  <p className="text-sm font-bold">1.7%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsIllustration
