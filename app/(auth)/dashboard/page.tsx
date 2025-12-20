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
    // Generate missing referral code
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

  if (!user) {
    return <div>User not found</div>;
  }

  // Mock data for fallback
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Prepare chart data (reverse to show chronological order)
  const chartData = displayTransactions
    .map(t => ({
      date: t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: t.amount,
    }))
    .reverse();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {isDemoMode && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-full">
              Demo Mode
            </span>
          )}
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
              {isDemoMode ? "Sample commission activity" : "Recent commission activity"}
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
            <div className="bg-background/50 border rounded-md p-3 font-mono text-center text-lg tracking-widest select-all cursor-pointer">
              {user.referralCode || "GENERATE-CODE"}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Share this code to grow your empire.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
