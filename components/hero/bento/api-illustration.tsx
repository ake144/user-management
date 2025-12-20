import type React from "react"
import { Code2, Terminal, Webhook } from "lucide-react"

const APIIllustration: React.FC = () => {
    return (
        <div
            className="w-full h-full p-6 flex flex-col items-center justify-center relative overflow-hidden bg-transparent"
            role="img"
            aria-label="API and Webhooks illustration showing code and notifications"
        >
            {/* Background Code Snippet */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none font-mono text-[8px] whitespace-pre">
                {`{
  "event": "commission.earned",
  "data": {
    "amount": 125.50,
    "currency": "USD",
    "affiliate_id": "aff_9283",
    "tier": 1
  }
}`}
            </div>

            {/* Terminal Window */}
            <div className="w-full max-w-[300px] bg-[#0D1117] rounded-xl border border-border/50 shadow-2xl overflow-hidden relative z-10">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-muted/20 border-b border-border/50">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-[10px] text-muted-foreground font-mono">webhooks.log</span>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        <Terminal className="w-3.5 h-3.5 text-primary mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-mono text-green-400">POST /v1/webhooks/commissions</p>
                            <p className="text-[9px] font-mono text-muted-foreground">200 OK - 142ms</p>
                        </div>
                    </div>
                    <div className="h-px bg-border/30 w-full" />
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-primary/5 border border-primary/20 rounded-lg">
                        <Webhook className="w-3 h-3 text-primary" />
                        <span className="text-[9px] font-bold text-primary uppercase">Webhook Delivered</span>
                    </div>
                </div>
            </div>

            {/* Floating API Badge */}
            <div className="absolute top-10 right-10 bg-card border border-border p-2 rounded-lg shadow-xl flex items-center gap-2 animate-pulse">
                <Code2 className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-bold text-foreground">REST API v2.0</span>
            </div>
        </div>
    )
}

export default APIIllustration
