import type React from "react"
import { CheckCircle2, CreditCard, Wallet } from "lucide-react"

const PayoutsIllustration: React.FC = () => {
  const themeVars = {
    "--oci-primary-color": "hsl(var(--primary))",
    "--oci-background-color": "hsl(var(--background))",
    "--oci-foreground-color": "hsl(var(--foreground))",
    "--oci-muted-foreground-color": "hsl(var(--muted-foreground))",
    "--oci-border-color": "hsl(var(--border))",
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
      aria-label="Payouts illustration showing instant payment methods and success status"
    >
      {/* Background radial gradient */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10 px-6">
        {/* Payout Success Card */}
        <div className="w-full max-w-[280px] bg-card border border-border rounded-xl p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Payout Sent</p>
              <p className="text-sm font-bold text-foreground">$1,250.00</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full" />
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
          {[
            { name: "Stripe", icon: CreditCard, color: "text-blue-500" },
            { name: "PayPal", icon: Wallet, color: "text-indigo-500" },
            { name: "Chapa", icon: CreditCard, color: "text-green-500" },
          ].map((method) => (
            <div key={method.name} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/50">
              <method.icon className={`w-5 h-5 ${method.color}`} />
              <span className="text-[8px] font-bold text-muted-foreground uppercase">{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PayoutsIllustration
