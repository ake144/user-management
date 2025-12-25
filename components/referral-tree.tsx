"use client";

import React, { useState } from 'react';
import { User, DollarSign, ChevronRight, ChevronDown, Award, Zap, Shield, MoreHorizontal } from 'lucide-react';
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
    level?: number;        // Actual level from database
    tier?: string;         // Optional tier/rank
    childCount?: number;   // Direct children count
}

const Node = ({ node, depth = 0, maxDepth = 8 }: { node: TreeNode; depth?: number; maxDepth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10); // Initial number of children to show

    const hasChildren = node.children && node.children.length > 0;
    const children = node.children || [];
    const visibleChildren = children.slice(0, visibleCount);
    const remainingCount = children.length - visibleCount;

    // Use actual level from database if available, otherwise use depth
    const displayLevel = node.level !== undefined ? node.level : depth;

    // Determine tier color/icon based on level
    const getTierIcon = () => {
        // Higher levels (deeper in tree) get different colors
        if (displayLevel >= 6) return <Award className="h-3 w-3 text-purple-500" />;
        if (displayLevel >= 4) return <Shield className="h-3 w-3 text-blue-500" />;
        if (displayLevel >= 2) return <Zap className="h-3 w-3 text-yellow-500" />;
        return <Zap className="h-3 w-3 text-green-500" />;
    };

    const getTierLabel = () => {
        if (displayLevel === 0) return "Root";
        return `L${displayLevel}`;
    };

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 10); // Show 10 more at a time
    };

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div
                className={cn(
                    "relative z-10 flex flex-col items-center gap-2 rounded-xl border bg-card p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/50 w-40 min-h-[150px] justify-between",
                    node.isActive ? "border-green-500/50" : "border-red-500 bg-red-50 dark:bg-red-950/20",
                    "cursor-pointer"
                )}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {/* Avatar */}
                <div className={cn(
                    "h-11 w-11 rounded-full flex items-center justify-center border-2",
                    node.isActive
                        ? "bg-background border-green-500 text-green-600"
                        : "bg-red-100 border-red-200 text-red-500"
                )}>
                    <User className="h-5 w-5" />
                </div>

                {/* Info */}
                <div className="flex flex-col items-center text-center w-full gap-0.5">
                    <span className="text-sm font-bold truncate w-full px-1">{node.name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <DollarSign className="h-3 w-3" />
                        {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(node.totalEarnings)}
                    </div>
                    {node.isActive && (
                        <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-[10px] font-medium">
                            {getTierIcon()}
                            <span>{getTierLabel()}</span>
                        </div>
                    )}
                    {node.childCount !== undefined && node.childCount > 0 && (
                        <div className="mt-0.5 text-[9px] text-muted-foreground">
                            {node.childCount} direct referral{node.childCount > 1 ? 's' : ''}
                        </div>
                    )}
                </div>

                {/* Status Dot */}
                <div className={cn(
                    "absolute top-2 right-2 h-2 w-2 rounded-full",
                    node.isActive ? "bg-green-500" : "bg-red-500"
                )} />

                {/* Expand/Collapse Indicator */}
                {hasChildren && (
                    <div className="absolute -bottom-3 bg-card border rounded-full p-0.5 shadow-sm z-20">
                        {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </div>
                )}
            </div>

            {/* Children Container with Connectors */}
            {hasChildren && isExpanded && (
                <div className="flex flex-col items-center">
                    {/* Vertical Line from Parent */}
                    <div className="h-8 w-px bg-border" />

                    {/* Horizontal Bar for Children */}
                    <div className="relative flex gap-6 pt-4">
                        {visibleChildren.map((child, index) => (
                            <div key={child.id} className="relative flex flex-col items-center">
                                {/* Vertical line up to the horizontal bar */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-px bg-border" />

                                {/* Left Connector (connects to previous sibling) */}
                                {index > 0 && (
                                    <div className="absolute -top-4 right-1/2 w-[calc(50%+12px)] h-px bg-border" />
                                )}
                                {/* Right Connector (connects to next sibling) */}
                                {(index < visibleChildren.length - 1 || remainingCount > 0) && (
                                    <div className="absolute -top-4 left-1/2 w-[calc(50%+12px)] h-px bg-border" />
                                )}

                                <Node node={child} depth={depth + 1} maxDepth={maxDepth} />
                            </div>
                        ))}

                        {/* "Show More" Node */}
                        {remainingCount > 0 && (
                            <div className="relative flex flex-col items-center">
                                {/* Connectors for "More" node */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-px bg-border" />
                                <div className="absolute -top-4 right-1/2 w-[calc(50%+12px)] h-px bg-border" />

                                <button
                                    onClick={handleShowMore}
                                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-primary/50 bg-primary/5 p-3 shadow-sm hover:bg-primary/10 w-40 h-[150px] transition-colors"
                                >
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </div>
                                    <span className="text-xs font-semibold text-primary">
                                        +{remainingCount} More
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Rich Mock Data with Scalability Test
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
                { id: "l2-1", name: "Mike Brown", totalEarnings: 12500.00, isActive: true, tier: "Gold", children: [] },
                { id: "l2-2", name: "Emma Davis", totalEarnings: 8500.00, isActive: true, tier: "Gold", children: [] }
            ]
        },
        {
            id: "l1-2",
            name: "James Wilson",
            totalEarnings: 31000.00,
            isActive: true,
            tier: "Platinum",
            children: Array.from({ length: 12 }).map((_, i) => ({
                id: `l2-many-${i}`,
                name: `Affiliate #${i + 1}`,
                totalEarnings: Math.floor(Math.random() * 5000),
                isActive: Math.random() > 0.3,
                children: []
            }))
        },
        {
            id: "l1-3",
            name: "Olivia Taylor",
            totalEarnings: 500.00,
            isActive: false,
            children: []
        },
        {
            id: "l1-4",
            name: "Robert Downey",
            totalEarnings: 28000.00,
            isActive: true,
            tier: "Platinum",
            children: []
        }
    ]
};

export function ReferralTree({ data, maxDepth = 8 }: { data?: TreeNode; maxDepth?: number }) {
    const treeData = data || mockData;

    return (
        <div className="p-12 overflow-auto min-h-auto w-full bg-slate-50/50 dark:bg-slate-950/50 rounded-xl flex justify-center">
            <Node node={treeData} maxDepth={maxDepth} />
        </div>
    );
}
