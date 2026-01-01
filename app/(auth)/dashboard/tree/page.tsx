import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReferralTree, TreeNode } from "@/components/referral-tree";
import { Info, Users, TrendingUp, Award, Network } from "lucide-react";
import {
    getDownlineTree,
    transformToNestedTree,
    getTreeStats
} from "@/lib/services/referral-service";

// Configuration
const MAX_TREE_DEPTH = 8; // Display up to 8 levels for performance

// Mock Data Generator
function getMockTreeData(rootId: string) {
    const mockData = [];
    
    // Root
    mockData.push({
        id: rootId,
        name: "You (Root)",
        referredById: null,
        totalEarnings: 125450.50,
        isActive: true,
        userLevel: 0,
        childCount: 6,
        depth: 0
    });

    // Branch 1: The High Performer (Deep)
    mockData.push({ id: "u1", name: "Alice (Top Leader)", referredById: rootId, totalEarnings: 15000, isActive: true, userLevel: 1, childCount: 2, depth: 1 });
        mockData.push({ id: "u1-1", name: "Bob Builder", referredById: "u1", totalEarnings: 5000, isActive: true, userLevel: 2, childCount: 1, depth: 2 });
            mockData.push({ id: "u1-1-1", name: "Charlie", referredById: "u1-1", totalEarnings: 2000, isActive: true, userLevel: 3, childCount: 1, depth: 3 });
                mockData.push({ id: "u1-1-1-1", name: "David", referredById: "u1-1-1", totalEarnings: 1000, isActive: true, userLevel: 4, childCount: 1, depth: 4 });
                    mockData.push({ id: "u1-1-1-1-1", name: "Eve", referredById: "u1-1-1-1", totalEarnings: 500, isActive: true, userLevel: 5, childCount: 0, depth: 5 });
        mockData.push({ id: "u1-2", name: "Frank", referredById: "u1", totalEarnings: 3000, isActive: true, userLevel: 2, childCount: 0, depth: 2 });

    // Branch 2: The Recruiter (Wide)
    mockData.push({ id: "u2", name: "Grace (Recruiter)", referredById: rootId, totalEarnings: 8000, isActive: true, userLevel: 1, childCount: 5, depth: 1 });
        for(let i=1; i<=5; i++) {
            mockData.push({ 
                id: `u2-${i}`, 
                name: `Recruit #${i}`, 
                referredById: "u2", 
                totalEarnings: Math.floor(Math.random() * 1000), 
                isActive: i % 2 !== 0, // Alternating active status
                userLevel: 2, 
                childCount: 0, 
                depth: 2 
            });
        }

    // Branch 3: The Newbie
    mockData.push({ id: "u3", name: "Henry (New)", referredById: rootId, totalEarnings: 0, isActive: false, userLevel: 1, childCount: 0, depth: 1 });

    // Branch 4: The Mega Recruiter (Extreme Width - 30 children)
    mockData.push({ id: "u4", name: "Ian (Influencer)", referredById: rootId, totalEarnings: 45000, isActive: true, userLevel: 1, childCount: 30, depth: 1 });
    for(let i=1; i<=30; i++) {
        mockData.push({ 
            id: `u4-${i}`, 
            name: `Follower #${i}`, 
            referredById: "u4", 
            totalEarnings: Math.floor(Math.random() * 500), 
            isActive: Math.random() > 0.3, // 70% active
            userLevel: 2, 
            childCount: 0, 
            depth: 2 
        });
    }

    // Branch 5: The Deep Diver (Extreme Depth - 8 levels)
    let currentParentId = rootId;
    let currentName = "Jack (Deep)";
    for(let i=1; i<=8; i++) {
        const newId = `u5-level-${i}`;
        mockData.push({
            id: newId,
            name: i === 1 ? currentName : `Level ${i} Node`,
            referredById: currentParentId,
            totalEarnings: 10000 / i,
            isActive: true,
            userLevel: i,
            childCount: 1,
            depth: i
        });
        currentParentId = newId;
    }

    // Branch 6: The Viral Node (Wide at depth)
    mockData.push({ id: "u6", name: "Karen (Viral)", referredById: rootId, totalEarnings: 12000, isActive: true, userLevel: 1, childCount: 1, depth: 1 });
    mockData.push({ id: "u6-1", name: "Leo (Viral Host)", referredById: "u6", totalEarnings: 5000, isActive: true, userLevel: 2, childCount: 15, depth: 2 });
    for(let i=1; i<=15; i++) {
        mockData.push({ 
            id: `u6-1-${i}`, 
            name: `Viral User #${i}`, 
            referredById: "u6-1", 
            totalEarnings: Math.floor(Math.random() * 200), 
            isActive: true, 
            userLevel: 3, 
            childCount: 0, 
            depth: 3 
        });
    }

    return mockData;
}

export default async function TreePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/login");
    }

    // Fetch real tree data
    let treeData: TreeNode | null = null;
    let stats = {
        totalDescendants: 0,
        activeDescendants: 0,
        totalLevels: 0,
        directReferrals: 0,
    };
    let hasError = false;

    try {
        // REAL DATA MODE
        const rawTree = await getDownlineTree(session.user.id, MAX_TREE_DEPTH, false);
        // MOCK DATA MODE (Commented out)
        // const rawTree = getMockTreeData(session.user.id);
        
        treeData = transformToNestedTree(rawTree);

        // Get tree statistics
        stats = await getTreeStats(session.user.id);
        // stats = {
        //     totalDescendants: 69,
        //     activeDescendants: 55,
        //     totalLevels: 8,
        //     directReferrals: 6
        // };
    } catch (error) {
        console.error("Error fetching referral tree:", error);
        hasError = true;
    }

    const hasNoReferrals = !treeData || (treeData.children?.length === 0);

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Referral Network</h1>
                <p className="text-muted-foreground">
                    Visualize your referral empire. Track your network growth and earnings.
                </p>
            </div>

            {/* Stats Cards */}
            {!hasNoReferrals && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        icon={<Users className="h-5 w-5" />}
                        label="Direct Referrals"
                        value={stats.directReferrals}
                        gradient="from-blue-500/10 to-blue-600/10"
                        iconColor="text-blue-600"
                    />
                    <StatsCard
                        icon={<Network className="h-5 w-5" />}
                        label="Total Network"
                        value={stats.totalDescendants}
                        gradient="from-purple-500/10 to-purple-600/10"
                        iconColor="text-purple-600"
                    />
                    <StatsCard
                        icon={<TrendingUp className="h-5 w-5" />}
                        label="Active Members"
                        value={stats.activeDescendants}
                        gradient="from-green-500/10 to-green-600/10"
                        iconColor="text-green-600"
                    />
                    <StatsCard
                        icon={<Award className="h-5 w-5" />}
                        label="Network Depth"
                        value={stats.totalLevels}
                        suffix=" levels"
                        gradient="from-amber-500/10 to-amber-600/10"
                        iconColor="text-amber-600"
                    />
                </div>
            )}

            {/* Error Alert */}
            {hasError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div className="text-sm text-red-800 dark:text-red-200">
                        <p className="font-semibold">Error Loading Network</p>
                        <p>There was an error loading your referral tree. Please try again later.</p>
                    </div>
                </div>
            )}

            {/* No Referrals Alert */}
            {hasNoReferrals && !hasError && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                        <p className="font-semibold">No Referrals Yet</p>
                        <p>
                            Start building your network by sharing your referral link.
                            Your network tree will appear here as people join.
                        </p>
                    </div>
                </div>
            )}

            {/* Tree Visualization */}
            {treeData && !hasError && (
                <>
                    {stats.totalLevels >= MAX_TREE_DEPTH && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-start gap-3">
                            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <p className="text-xs text-blue-800 dark:text-blue-200">
                                Showing {MAX_TREE_DEPTH} levels for optimal performance. Your full network extends deeper.
                            </p>
                        </div>
                    )}

                    <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden relative min-h-[500px]">
                        <div className="absolute inset-0 overflow-auto bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-950/50 dark:to-slate-900/50">
                            <div className="min-w-max p-8">
                                <ReferralTree data={treeData} maxDepth={MAX_TREE_DEPTH} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Stats Card Component
function StatsCard({
    icon,
    label,
    value,
    suffix = "",
    gradient,
    iconColor,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix?: string;
    gradient: string;
    iconColor: string;
}) {
    return (
        <div className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${gradient} p-6`}>
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold">
                        {value.toLocaleString()}
                        {suffix && <span className="text-sm font-normal ml-1">{suffix}</span>}
                    </p>
                </div>
                <div className={`p-2 rounded-lg bg-background/50 ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
