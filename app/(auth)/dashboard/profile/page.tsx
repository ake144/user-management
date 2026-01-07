import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { AffiliateIdCard } from "@/components/affiliate-id-card"

export default async function ProfilePage() {
  const session = await auth.api.getSession({
      headers: await headers()
  });

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
     return <div>User not found</div>
  }

  return (
    <div className="flex-1 mt-22 flex justify-center items-center space-y-4 p-4 md:p-8 pt-6">
      {/* <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h2>
      </div> */}
       
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 max-w-2xl">
          <div className="space-y-4">
              <h3 className="text-lg font-medium text-muted-foreground">Affiliate Identity</h3>
              <AffiliateIdCard 
                user={{
                  name: user.name,
                  referralCode: user.referralCode,
                  image: user.image,
                  memberStatus: user?.memberStatus
                }} 
                className="w-full max-w-md shadow-lg" 
              />
              
              <div className="bg-card border border-border rounded-xl p-6 mt-6">
                 <h3 className="text-lg font-bold mb-4">Membership Status</h3>
                 <p className="text-sm text-muted-foreground mb-4">
                    Your current membership level determines your verification status and platform benefits.
                 </p>
                 {user?.memberStatus === 'UNVERIFIED' && (
                     <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-600 text-sm">
                        Your account is currently <strong>Unverified</strong>. Complete verification to unlock the Gold badge.
                     </div>
                 )}
                 {user?.memberStatus === 'GOLD' && (
                     <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-sm">
                        You are a <strong>Gold Verified</strong> member.
                     </div>
                 )}
              </div>
          </div>
      </div>
    </div>
  )
}
