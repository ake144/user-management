import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
import { MODULES } from "@/lib/modules";
import { ModuleHistoryChart } from "@/components/module-history-chart";
import { CurrencyDisplay } from "@/components/currency-display";

async function getUserTransactions(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            transactions: {
                orderBy: { createdAt: 'desc' },
            }
        }
    });
    return user;
}

// Mock Data with referenceId for modules
const MOCK_TRANSACTIONS = [
    {
        id: "tx_mock_1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        type: "REFERRAL_COMMISSION",
        amount: 150.00,
        description: "Commission from User #8821",
        status: "COMPLETED",
        referenceId: "e-learning"
    },
    {
        id: "tx_mock_2",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        type: "DOWNLINE_EARNING",
        amount: 45.50,
        description: "Level 2 earning from User #9912",
        status: "COMPLETED",
        referenceId: "e-commerce"
    },
    {
        id: "tx_mock_3",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        type: "WITHDRAWAL",
        amount: -500.00,
        description: "Withdrawal to PayPal",
        status: "COMPLETED",
        referenceId: null
    },
    {
        id: "tx_mock_4",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        type: "REFERRAL_COMMISSION",
        amount: 200.00,
        description: "Commission from User #7731",
        status: "COMPLETED",
        referenceId: "video-generator"
    },
    {
        id: "tx_mock_5",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
        type: "REFERRAL_COMMISSION",
        amount: 120.00,
        description: "Commission from User #5521",
        status: "COMPLETED",
        referenceId: "e-learning"
    },
    {
        id: "tx_mock_6",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
        type: "REFERRAL_COMMISSION",
        amount: 300.00,
        description: "Commission from User #1122",
        status: "COMPLETED",
        referenceId: "e-commerce"
    },
];

const COLOR_MAP: Record<string, string> = {
    "text-blue-500": "#3b82f6",
    "text-purple-500": "#a855f7",
    "text-orange-500": "#f97316",
    "text-orange-600": "#ea580c",
    "text-red-500": "#ef4444",
    "text-green-600": "#16a34a",
    "text-blue-600": "#2563eb",
    "text-purple-600": "#9333ea",
    "text-cyan-500": "#06b6d4",
    "text-indigo-600": "#4f46e5",
};

export default async function HistoryPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/login");
    }

    const userData = await getUserTransactions(session.user.id);

    if (!userData) {
        return <div>User not found</div>;
    }

    // Use mock data if no transactions exist
    const transactions = userData.transactions.length > 0
        ? userData.transactions
        : MOCK_TRANSACTIONS;

    const isMock = userData.transactions.length === 0;

    // Calculate totals
    const totalEarnings = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const currentBalance = isMock
        ? transactions.reduce((sum, t) => sum + t.amount, 0)
        : userData.currentBalance;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Math.abs(amount));
    };

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Prepare Chart Data (Cumulative Growth per Module)
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    const activeModuleIds = Array.from(new Set(sortedTransactions
        .filter(t => t.amount > 0 && t.referenceId && MODULES[t.referenceId])
        .map(t => t.referenceId!)
    ));

    const chartDataMap = new Map<string, { date: string; [key: string]: any }>();
    
    // Create a timeline of dates
    sortedTransactions.forEach(t => {
        if (t.amount <= 0) return;
        const date = new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (!chartDataMap.has(date)) {
            chartDataMap.set(date, { date });
        }
        const entry = chartDataMap.get(date)!;
        const moduleId = t.referenceId || 'other';
        entry[moduleId] = (entry[moduleId] || 0) + t.amount;
    });

    const dailyData = Array.from(chartDataMap.values());
    
    // Calculate cumulative data
    let cumulativeData: any[] = [];
    let runningTotals: Record<string, number> = {};
    activeModuleIds.forEach(id => runningTotals[id] = 0);

    dailyData.forEach(day => {
        const newEntry = { ...day };
        activeModuleIds.forEach(id => {
            runningTotals[id] += (day[id] || 0);
            newEntry[id] = runningTotals[id];
        });
        cumulativeData.push(newEntry);
    });

    const activeModulesConfig = activeModuleIds.map(id => ({
        id,
        title: MODULES[id]?.title || id,
        color: COLOR_MAP[MODULES[id]?.color] || "#888888"
    }));

    // Calculate per-module totals for the breakdown list
    const moduleTotals = activeModuleIds.map(id => {
        const total = transactions
            .filter(t => t.referenceId === id && t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            id,
            ...MODULES[id],
            total
        };
    }).sort((a, b) => b.total - a.total);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
                <p className="text-muted-foreground">
                    View all your earnings, withdrawals, and adjustments.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Earnings</h3>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold"><CurrencyDisplay amount={totalEarnings} /></div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Available Balance</h3>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold"><CurrencyDisplay amount={currentBalance} /></div>
                </div>
            </div>

            {/* Growth Chart */}
            {activeModulesConfig.length > 0 && (
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col gap-1 mb-6">
                        <h3 className="font-semibold leading-none tracking-tight">Earnings Growth by Module</h3>
                        <p className="text-sm text-muted-foreground">
                            Cumulative earnings over time for your active modules.
                        </p>
                    </div>
                    <ModuleHistoryChart data={cumulativeData} modules={activeModulesConfig} />
                </div>
            )}

            {/* Module Breakdown */}
            {moduleTotals.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {moduleTotals.map((module) => (
                        <Card key={module.id} className="overflow-hidden">
                            <div className={`h-1 w-full bg-gradient-to-r ${module.gradient}`} />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium truncate pr-2">
                                    {module.title}
                                </CardTitle>
                                <module.icon className={`h-4 w-4 ${module.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold"><CurrencyDisplay amount={module.total} /></div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Lifetime Earnings
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Transactions Table */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-muted/20">
                    <h3 className="font-semibold">Recent Transactions</h3>
                    {isMock && (
                        <p className="text-xs text-amber-600 mt-1">
                            * Showing mock data for demonstration purposes. Start referring to see real data!
                        </p>
                    )}
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Module</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {transactions.map((tx) => (
                                <tr
                                    key={tx.id}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted even:bg-muted/30"
                                >
                                    <td className="p-4 align-middle">{formatDate(tx.createdAt)}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${tx.type === 'WITHDRAWAL'
                                                ? 'border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20'
                                                : 'border-transparent bg-green-500/10 text-green-600 hover:bg-green-500/20'
                                            }`}>
                                            {tx.type.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        {tx.referenceId && MODULES[tx.referenceId] ? (
                                            <Badge variant="outline" className="text-xs font-normal">
                                                {MODULES[tx.referenceId].title}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle">{tx.description || '-'}</td>
                                    <td className={`p-4 align-middle text-right font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {tx.amount > 0 ? '+' : '-'}<CurrencyDisplay amount={tx.amount} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
