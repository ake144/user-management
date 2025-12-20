"use client";

import React, { useState } from 'react';
import { User, DollarSign, ChevronRight, ChevronDown, Award, Zap, Shield } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface TreeNode {
    id: string;
    name: string;
    totalEarnings: number;
    isActive: boolean;
    children?: TreeNode[];
    level?: number;
    tier?: string;
}

const Node = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    // Determine tier color/icon
    const getTierIcon = () => {
        if (node.totalEarnings > 10000) return <Award className="h-3 w-3 text-purple-500" />;
        if (node.totalEarnings > 5000) return <Shield className="h-3 w-3 text-blue-500" />;
        return <Zap className="h-3 w-3 text-yellow-500" />;
    };

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div
                className={cn(
                    "relative z-10 flex flex-col items-center gap-2 rounded-xl border bg-card p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/50 w-[180px]",
                    node.isActive ? "border-green-500/50" : "border-muted opacity-80",
                    "cursor-pointer"
                )}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {/* Avatar */}
                <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2",
                    node.isActive
                        ? "bg-background border-green-500 text-green-600"
                        : "bg-muted border-muted-foreground/20 text-muted-foreground"
                )}>
                    <User className="h-5 w-5" />
                </div>

                {/* Info */}
                <div className="flex flex-col items-center text-center w-full">
                    <span className="text-sm font-bold truncate w-full">{node.name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <DollarSign className="h-3 w-3" />
                        {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(node.totalEarnings)}
                    </div>
                    {node.isActive && (
                        <div className="mt-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent text-[10px] font-medium">
                            {getTierIcon()}
                            <span>Lvl {depth + 1}</span>
                        </div>
                    )}
                </div>

                {/* Status Dot */}
                <div className={cn(
                    "absolute top-2 right-2 h-2 w-2 rounded-full",
                    node.isActive ? "bg-green-500" : "bg-gray-300"
                )} />

                {/* Expand/Collapse Indicator */}
                {hasChildren && (
                    <div className="absolute -bottom-3 bg-card border rounded-full p-0.5 shadow-sm">
                        {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </div>
                )}
            </div>

            {/* Children Container with Connectors */}
            {hasChildren && isExpanded && (
                <div className="flex flex-col items-center">
                    {/* Vertical Line from Parent */}
                    <div className="h-6 w-px bg-border" />

                    {/* Horizontal Bar for Children */}
                    <div className="relative flex gap-8 pt-4">
                        {/* Top Horizontal Connector Line */}
                        {node.children!.length > 1 && (
                            <div className="absolute top-0 left-[calc(50%_-_(100%_-_180px)/2)] right-[calc(50%_-_(100%_-_180px)/2)] h-px bg-border w-[calc(100%-180px)] mx-auto" />
                        )}
                        {/* Actually, a better way to draw the tree lines with CSS:
                            Use a wrapper for each child that has a top border.
                            The first and last child need special handling to stop the line at the center.
                         */}

                        {node.children!.map((child, index) => (
                            <div key={child.id} className="relative flex flex-col items-center">
                                {/* Connector Lines */}
                                {/* Vertical line up to the horizontal bar */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-px bg-border" />

                                {/* Horizontal line to connect to siblings */}
                                {/* Right half line */}
                                {index < node.children!.length - 1 && (
                                    <div className="absolute -top-4 left-1/2 w-[calc(50%+1rem)] h-px bg-border" />
                                )}
                                {/* Left half line */}
                                {index > 0 && (
                                    <div className="absolute -top-4 right-1/2 w-[calc(50%+1rem)] h-px bg-border" />
                                )}

                                <Node node={child} depth={depth + 1} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Rich Mock Data
const mockData: TreeNode = {
    id: "root",
    name: "Alex Johnson",
    totalEarnings: 154200.50,
    isActive: true,
    tier: "Diamond",
    children: [
        {
            id: "l1-1",
            name: "Sarah Williams",
            totalEarnings: 45200.00,
            isActive: true,
            tier: "Platinum",
            children: [
                {
                    id: "l2-1",
                    name: "Mike Brown",
                    totalEarnings: 12500.00,
                    isActive: true,
                    tier: "Gold",
                    children: [
                        { id: "l3-1", name: "Jenny Wu", totalEarnings: 3200.00, isActive: true, children: [] },
                        { id: "l3-2", name: "Tom Cruise", totalEarnings: 1500.00, isActive: true, children: [] },
                    ]
                },
                {
                    id: "l2-2",
                    name: "Emma Davis",
                    totalEarnings: 8500.00,
                    isActive: true,
                    tier: "Gold",
                    children: []
                }
            ]
        },
        {
            id: "l1-2",
            name: "James Wilson",
            totalEarnings: 31000.00,
            isActive: true,
            tier: "Platinum",
            children: [
                {
                    id: "l2-4",
                    name: "Lucas Miller",
                    totalEarnings: 15500.00,
                    isActive: true,
                    tier: "Gold",
                    children: [
                        { id: "l3-6", name: "Dan Smith", totalEarnings: 1200.00, isActive: true, children: [] },
                    ]
                },
                {
                    id: "l2-5",
                    name: "Patty Jenkins",
                    totalEarnings: 4500.00,
                    isActive: true,
                    children: []
                }
            ]
        }
    ]
};

export function ReferralTree({ data }: { data?: TreeNode }) {
    const treeData =  mockData;

    return (
        <div className="p-12 overflow-auto min-h-[600px] w-full bg-slate-50/50 dark:bg-slate-950/50 rounded-xl flex justify-center">
            <Node node={treeData} />
        </div>
    );
}
