import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  History,
  Network
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard-charts"; // Client component for Recharts
import { MODULES } from "@/lib/modules";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getTreeStats } from "@/lib/services/referral-service";

async function getUserData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: { referrals: true },
      },
      transactions: {
        take: 30,
        orderBy: { createdAt: 'desc' },
        where: {
          type: {
            in: ['REFERRAL_COMMISSION', 'DOWNLINE_EARNING']
          }
        }
      }
    },
  });
  if (user && !user.referralCode) {

    const cleanName = (user.name || "user").toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomStr = Math.random().toString(36).substring(2, 7);
    const newCode = `${cleanName}-${randomStr}`;

    await prisma.user.update({
      where: { id: user.id },
      data: { referralCode: newCode }
    });
    user.referralCode = newCode;
  }
  return user;
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const user = await getUserData(session.user.id);
  const treeStats = await getTreeStats(session.user.id);

  if (!user) {
    return <div>User not found</div>;
  }

  // REAL DATA MODE
  const displayBalance = user.currentBalance;
  const displayReferrals = treeStats.directReferrals; // Use tree stats for accurate count
  const displayTotalEarned = user.totalEarnings;
  const displayTransactions = user.transactions;

  // MOCK DATA MODE (Commented out)
  /*
  const isDemoMode = user.transactions.length === 0;
  const mockTransactions = [
    { amount: 120.50, createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
    { amount: 85.00, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    { amount: 210.00, createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
    { amount: 45.25, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { amount: 150.00, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { amount: 95.75, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { amount: 130.00, createdAt: new Date() },
  ];

  const displayBalance = isDemoMode ? 836.50 : user.currentBalance;
  const displayReferrals = isDemoMode ? 12 : user._count.referrals;
  const displayTotalEarned = isDemoMode ? 2450.00 : user.totalEarnings;
  const displayTransactions = isDemoMode ? mockTransactions : user.transactions;
  */


  const activeModulesMap = new Map<string, number>();
  
  // REAL DATA PROCESSING
  user.transactions.forEach(t => {
    // Assuming referenceId stores the module key for commission transactions
    if (t.amount > 0 && t.referenceId && MODULES[t.referenceId]) {
      const current = activeModulesMap.get(t.referenceId) || 0;
      activeModulesMap.set(t.referenceId, current + t.amount);
    }
  });

  // MOCK DATA PROCESSING (Commented out)
  /*
  if (isDemoMode) {
    activeModulesMap.set("e-learning", 1000.00);
    activeModulesMap.set("e-commerce", 850.00);
    activeModulesMap.set("video-generator", 350.00);
  }
  */

  const activeModules = Array.from(activeModulesMap.entries())
    .map(([id, amount]) => ({
      id,
      ...MODULES[id],
      earned: amount
    }))
    .sort((a, b) => b.earned - a.earned);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Prepare chart data (reverse to show chronological order)
  // Group by date for cleaner chart
  const chartDataMap = new Map<string, number>();
  
  // Initialize last 7 days with 0
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    chartDataMap.set(dateStr, 0);
  }

  displayTransactions.forEach(t => {
    const dateStr = t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (chartDataMap.has(dateStr)) {
      chartDataMap.set(dateStr, (chartDataMap.get(dateStr) || 0) + t.amount);
    }
  });

  const chartData = Array.from(chartDataMap.entries()).map(([date, amount]) => ({
    date,
    amount
  }));

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex justify-between w-full">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
         <p className="text-sm font-bold text-green-500 rounded-2xl">
            {user.level !== undefined ? `Level ${user.level} Affiliate` : "Affiliate"}
         </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Welcome back, {user.firstName || user.name}. Here's what's happening with your affiliate network.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Current Balance */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Current Balance</h3>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(displayBalance)}</div>
          <p className="text-xs text-muted-foreground mt-1">Available for withdrawal</p>
        </div>

        {/* Direct Referrals */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Direct Referrals</h3>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">{displayReferrals}</div>
          <p className="text-xs text-muted-foreground mt-1">Active network members</p>
        </div>

        {/* Total Earnings */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Earned</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">{formatCurrency(displayTotalEarned)}</div>
          <p className="text-xs text-muted-foreground mt-1">Lifetime commissions</p>
        </div>
      </div>

      

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

        {/* Earnings Chart */}
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-col gap-1 border-b">
            <h3 className="font-semibold leading-none tracking-tight">Earnings Overview</h3>
            <p className="text-sm text-muted-foreground">
              Recent commission activity (Last 7 Days)
            </p>
          </div>
          <div className="p-6 pt-4 pl-0">
            <DashboardCharts data={chartData} />
          </div>
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Quick Actions */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-2">
              <Link href="/dashboard/history" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <History className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">View History</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard/tree" className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-full text-purple-500">
                    <Network className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">Manage Network</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Referral Link Card */}
          <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-purple-500/10 p-6">
            <h3 className="font-semibold mb-2">Your Referral Code</h3>
            <div
              className="bg-background/50 border rounded-md p-3 font-mono text-center text-sm sm:text-lg tracking-widest break-all"
              aria-label="Your referral link"
            >
              {/* {`${(process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "")}?ref=${encodeURIComponent(
              user.referralCode ?? "GENERATE-CODE"
              )}`} */}
              {encodeURIComponent(
              user.referralCode ?? "GENERATE-CODE"
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Share this code to grow your empire.</p>
          </div>
        </div>
      </div>

      {/* Active Modules */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Active Modules</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeModules.length > 0 ? (
            activeModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <div className={`h-2 w-full bg-gradient-to-r ${module.gradient}`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {module.title}
                  </CardTitle>
                  <module.icon className={`h-4 w-4 ${module.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(module.earned)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total Earnings
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {module.commission} Commission
                    </Badge>
                    <Link href={`/dashboard/modules/${module.id}`} className="text-xs text-primary hover:underline ml-auto flex items-center gap-1">
                      View Details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full p-8 text-center border rounded-xl bg-muted/20">
              <p className="text-muted-foreground">No active modules yet. Start promoting to earn!</p>
              <Link href="/dashboard/modules" className="text-primary hover:underline mt-2 inline-block">
                Browse Modules
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
