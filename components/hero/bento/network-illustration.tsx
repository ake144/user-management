"use client"

import type React from "react"
import { Users, UserPlus, Share2 } from "lucide-react"

const NetworkIllustration: React.FC = () => {
  const themeVars = {
    "--realtime-primary-color": "hsl(var(--primary))",
    "--realtime-background-editor": "hsl(var(--background) / 0.8)",
    "--realtime-background-preview": "hsl(var(--background) / 0.8)",
    "--realtime-text-color": "hsl(var(--foreground))",
    "--realtime-text-editor": "hsl(var(--foreground))",
    "--realtime-text-preview": "hsl(var(--primary-foreground))",
    "--realtime-border-color": "hsl(var(--border))",
    "--realtime-border-main": "hsl(var(--border))",
    "--realtime-connection-color": "hsl(var(--muted-foreground))",
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
      aria-label="Referral Network illustration showing multi-tier connections"
    >
      {/* Network Visualization */}
      <div
        style={{
          position: "absolute",
          top: "46px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "350px",
          height: "221px",
          background: "var(--realtime-background-editor)",
          backdropFilter: "blur(7.907px)",
          borderRadius: "9.488px",
          border: "1px solid var(--realtime-border-main)",
          overflow: "hidden",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {/* Root Node */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 z-10 relative">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>

            {/* Connection Lines */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-32 -z-0" style={{ pointerEvents: 'none' }}>
              <path d="M128,0 L64,100" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M128,0 L128,100" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M128,0 L192,100" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
          </div>

          {/* Tier 1 Nodes */}
          <div className="flex gap-12 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-card border border-primary/40 flex items-center justify-center shadow-sm">
                  <UserPlus className="w-4 h-4 text-primary" />
                </div>
                <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40" style={{ width: `${30 + i * 20}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-2 flex items-center gap-2 shadow-xl">
            <Share2 className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold text-foreground">124 Total Referrals</span>
          </div>
        </div>
      </div>

      {/* Connection Line (Vertical) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "2px",
            height: "285.088px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="2"
            height="285.088"
            viewBox="0 0 2 285.088"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              maxWidth: "none",
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient id="connectionGradient" x1="1" y1="0" x2="1" y2="285.088" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--realtime-primary-color)" stopOpacity="0" />
                <stop offset="0.5" stopColor="var(--realtime-primary-color)" />
                <stop offset="1" stopColor="var(--realtime-primary-color)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M1 0V285.088" stroke="url(#connectionGradient)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default NetworkIllustration
