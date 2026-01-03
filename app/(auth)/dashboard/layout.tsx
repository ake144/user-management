"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    History,
    Network,
    ShoppingBag,
    GraduationCap,
    Video,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Store,
    Film,
    Plane,
    Award,
    Rocket,
    Cpu,
    Globe2,
    User,
    Settings,
    CreditCard,
    Bell,
    ChevronsUpDown,
    Sparkles
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react";
// Assuming utils exists, if not I'll inline or create it. 
// If utils doesn't exist, I'll use a simple helper or clsx/tailwind-merge directly if installed.
// Checking package.json, clsx and tailwind-merge are installed.

// Inline cn for safety if lib/utils is missing, but usually it's there in these templates.
// I'll assume it might be there, but to be safe I'll just use clsx/tailwind-merge directly or define it here.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    const navItems = [
        {
            title: "Overview",
            items: [
                { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { title: "Affiliate History", href: "/dashboard/history", icon: History },
                { title: "Referral Tree", href: "/dashboard/tree", icon: Network },
            ],
        },
        {
            title: "E-Commerce & Retail",
            items: [
                { title: "Adulian", href: "/dashboard/modules/adulian", icon: Store },
            ],
        },
        {
            title: "Education & Learning",
            items: [
                { title: "Kefita Skill Academy", href: "/dashboard/modules/kefita-skill-academy", icon: Award },
                { title: "SolidStart Academy", href: "/dashboard/modules/solidstart-academy", icon: Rocket },
                { title: "Global Pathway Academy", href: "/dashboard/modules/global-pathway-academy", icon: Globe2 },
            ],
        },
        {
            title: "Entertainment & Media",
            items: [
                { title: "Video Generator", href: "/dashboard/modules/video-generator", icon: Video },
                { title: "Hooraflix", href: "/dashboard/modules/hooraflix", icon: Film },
            ],
        },
        {
            title: "Technology & Innovation",
            items: [
                { title: "Technova", href: "/dashboard/modules/technova", icon: Cpu },
            ],
        },
        {
            title: "Travel & Tourism",
            items: [
                { title: "Visit Ethiopia", href: "/dashboard/modules/visit-ethiopia", icon: Plane },
            ],
        },
    ];

    return (
        <div className="flex min-h-screen bg-background">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
                        <Link href='/'>
                            <span className="text-xl font-bold tracking-tight">Esperanza</span>
                        </Link>
                        
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-8">
                            {navItems.map((group) => (
                                <div key={group.title}>
                                    <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {group.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {group.items.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                        isActive
                                                            ? "bg-primary text-primary-foreground"
                                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.title}
                                                    {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="border-t p-2 shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start px-2 h-auto py-2 hover:bg-accent hover:text-accent-foreground">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-2">
                                        {session.user.name?.[0] || session.user.email?.[0] || "U"}
                                    </div>
                                    <div className="flex flex-col items-start flex-1 overflow-hidden text-left">
                                        <p className="truncate text-sm font-medium w-full">{session.user.name}</p>
                                        <p className="truncate text-xs text-muted-foreground w-full">{session.user.email}</p>
                                    </div>
                                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Billing
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell className="mr-2 h-4 w-4" />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={async () => {
                                    await signOut({
                                        fetchOptions: {
                                            onSuccess: () => {
                                                router.push("/auth/login");
                                            },
                                        },
                                    });
                                }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold">Dashboard</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
