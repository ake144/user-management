"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

interface ChartData {
    date: string;
    [key: string]: string | number;
}

interface ModuleConfig {
    id: string;
    title: string;
    color: string;
}

export function ModuleHistoryChart({ data, modules }: { data: ChartData[], modules: ModuleConfig[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No earnings data available yet.
            </div>
        );
    }

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        {modules.map((module) => (
                            <linearGradient key={module.id} id={`color-${module.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={module.color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={module.color} stopOpacity={0} />
                            </linearGradient>
                        ))}
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
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                        itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Legend />
                    {modules.map((module) => (
                        <Area
                            key={module.id}
                            type="monotone"
                            dataKey={module.id}
                            name={module.title}
                            stroke={module.color}
                            fillOpacity={1}
                            fill={`url(#color-${module.id})`}
                            stackId="1"
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
