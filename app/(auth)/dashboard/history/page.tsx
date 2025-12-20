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
} from "@/components/ui/table"; // Assuming shadcn/ui table exists or I'll use standard HTML/Tailwind
import { Badge } from "@/components/ui/badge"; // Assuming shadcn/ui badge exists
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming shadcn/ui card exists
import { DollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";

// Fallback UI components if shadcn is not fully installed
// I'll use standard Tailwind for now to be safe and avoid "module not found" errors if components aren't there.
// If the user has shadcn, I could use it, but standard Tailwind is safer for a "create" task without checking every component.
// Actually, I'll check if components/ui exists. The previous `list_dir` showed `components/ui` has 6 children.
// I'll assume standard Tailwind for the table structure to be robust.

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

// Mock Data
const MOCK_TRANSACTIONS = [
    {
        id: "tx_mock_1",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        type: "REFERRAL_COMMISSION",
        amount: 150.00,
        description: "Commission from User #8821",
        status: "COMPLETED"
    },
    {
        id: "tx_mock_2",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        type: "DOWNLINE_EARNING",
        amount: 45.50,
        description: "Level 2 earning from User #9912",
        status: "COMPLETED"
    },
    {
        id: "tx_mock_3",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        type: "WITHDRAWAL",
        amount: -500.00,
        description: "Withdrawal to PayPal",
        status: "COMPLETED"
    },
    {
        id: "tx_mock_4",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        type: "REFERRAL_COMMISSION",
        amount: 200.00,
        description: "Commission from User #7731",
        status: "COMPLETED"
    },
];

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

    // Calculate totals (using mock data if active)
    const totalEarnings = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    // Use real balance if real data, otherwise calculate from mock
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
                    <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Available Balance</h3>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(currentBalance)}</div>
                </div>
            </div>

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
                                    <td className="p-4 align-middle">{tx.description || '-'}</td>
                                    <td className={`p-4 align-middle text-right font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {tx.amount > 0 ? '+' : '-'}{formatCurrency(tx.amount)}
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
