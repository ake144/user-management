import { cn } from "@/lib/utils"

interface AffiliateIdCardProps {
  user: {
    name: string | null
    referralCode: string | null
    image: string | null
    memberStatus: string // "UNVERIFIED" | "BASIC" | "GOLD" | "PREMIUM"
  }
  className?: string
}

export function AffiliateIdCard({ user, className }: AffiliateIdCardProps) {
  const status = user.memberStatus || "UNVERIFIED"
  
  // Status configuration
  const statusConfig: Record<string, { label: string; badgeClass: string; idColor: string }> = {
    UNVERIFIED: {
      label: "UNVERIFIED",
      badgeClass: "bg-gray-200 text-gray-600",
      idColor: "text-gray-500"
    },
    BASIC: {
      label: "VERIFIED",
      badgeClass: "bg-blue-100 text-blue-700",
      idColor: "text-blue-600"
    },
    GOLD: {
      label: "GOLD VERIFIED",
      badgeClass: "bg-[#D4A017] text-black font-bold",
      idColor: "text-[#0F5132]" // Dark green/teal like image
    },
    PREMIUM: {
      label: "PREMIUM MEMBER",
      badgeClass: "bg-purple-600 text-white font-bold",
      idColor: "text-purple-700"
    }
  }

  const config = statusConfig[status] || statusConfig.UNVERIFIED

  return (
    <div className={cn("w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6", className)}>
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Digital Affiliate ID
        </h3>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-yellow-500 flex items-center justify-center shrink-0 shadow-inner">
           {user.image ? (
             <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full object-cover" />
           ) : (
             <span className="text-white font-bold text-2xl">
               {(user.name || "U").charAt(0).toUpperCase()}
             </span>
           )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 text-lg">
            {user.name || "Anonymous User"}
          </span>
          <span className={cn("text-xl font-bold font-mono", config.idColor)}>
            ID: {user.referralCode || "PENDING"}
          </span>
          <div className="mt-2">
            <span className={cn("px-3 py-1 rounded-full text-[10px] tracking-wider uppercase inline-block", config.badgeClass)}>
              {config.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
