import type React from "react"
import { ShieldCheck, Lock, Eye, ShieldAlert } from "lucide-react"

const SecurityIllustration: React.FC = () => {
  const securityLogs = [
    { action: "Login Attempt", status: "Verified", time: "2m ago", icon: Eye },
    { action: "Payout Request", status: "Secure", time: "15m ago", icon: Lock },
    { action: "New Referral", status: "Validated", time: "1h ago", icon: ShieldCheck },
  ]

  return (
    <div
      className="w-full h-full p-6 flex flex-col items-center justify-center relative overflow-hidden"
      role="img"
      aria-label="Security and Trust illustration showing verified logs"
    >
      {/* Background Shield */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <ShieldCheck className="w-48 h-48 text-primary" />
      </div>

      {/* Security Logs Container */}
      <div 
      className="w-full max-w-8xl space-y-3 relative z-10">
        {securityLogs.map((log, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-card/60 backdrop-blur-md border border-border rounded-xl shadow-lg"
            style={{
              transform: `translateX(${index % 2 === 0 ? "-10px" : "10px"})`,
              opacity: 1 - index * 0.15,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <log.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground">{log.action}</p>
                <p className="text-[9px] text-muted-foreground">{log.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              <span className="text-[9px] font-bold text-green-500 uppercase">{log.status}</span>
            </div>
          </div>
        ))}

        {/* Floating Security Alert */}
        <div className="absolute -bottom-4 -right-2 bg-destructive/10 border border-destructive/20 backdrop-blur-xl p-2 rounded-lg flex items-center gap-2 shadow-2xl animate-bounce">
          <ShieldAlert className="w-3 h-3 text-destructive" />
          <span className="text-[8px] font-bold text-destructive uppercase tracking-tighter">Fraud Protection Active</span>
        </div>
      </div>
    </div>
  )
}

export default SecurityIllustration
