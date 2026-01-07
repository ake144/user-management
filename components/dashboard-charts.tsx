"use client";

import { useCurrencyStore } from "@/store/currency-store";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

interface ChartData {
    date: string;
    amount: number;
}

export function DashboardCharts({ data }: { data: ChartData[] }) {
    const { currency, exchangeRate } = useCurrencyStore();

    if (!data || data.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No earnings data available yet.
            </div>
        );
    }

    const chartData = data.map(item => ({
        ...item,
        amount: currency === 'USD' ? item.amount : item.amount * exchangeRate
    }));

     const formatValue = (val: number | undefined) => {
        if (val === undefined) return '';
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(val);
        } else {
             return `${new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0,
            }).format(val)} Birr`;
        }
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis
                        dataKey="date"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatValue(value)}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--border)',
                            borderRadius: 'var(--radius)',
                            color: 'var(--card-foreground)'
                        }}
                        itemStyle={{ color: 'var(--primary)' }}
                        formatter={(value: number | undefined) => [formatValue(value), 'Earnings']}
                    />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--primary)"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
