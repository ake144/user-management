import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
    Copy,
    Check,
    DollarSign,
    ExternalLink,
    Zap,
    BookOpen,
    ShoppingBag,
    Video,
    ArrowRight,
    TrendingUp,
    Globe,
    ShieldCheck,
    Store,
    Film,
    Plane,
    Award,
    Rocket,
    Cpu,
    Globe2,
    Users,
    ShoppingCart,
    PlayCircle,
    MapPin,
    GraduationCap,
    Target,
    Sparkles
} from "lucide-react";
import { simulateSale } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ClientCopyButton from "@/components/client-copy-button";

import { MODULES } from "@/lib/modules";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/login");
    }

    const moduleData = MODULES[id];

    if (!moduleData) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h1 className="text-2xl font-bold">Module Not Found</h1>
                <p className="text-muted-foreground">The requested affiliate module does not exist.</p>
            </div>
        );
    }

    // const referralLink = `http://localhost:3000/${id}?ref=${(session.user as any).referralCode ?? session.user.id}`;

    const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL || "https://esperanza.et"}/${id}?ref=${(session.user as any).referralCode ?? session.user.id}`;
    const Icon = moduleData.icon;

    return (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto pb-10">
            {/* Hero Section */}
            {moduleData.image ? (
                <div className="relative overflow-hidden rounded-3xl border bg-background">
                    <div className="flex flex-col lg:flex-row">
                        <div className="relative w-full lg:w-[75%] min-h-[300px] lg:min-h-[500px] bg-muted/20">
                            <Image
                                src={moduleData.image}
                                alt={moduleData.title}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center p-6 lg:p-8 border-t lg:border-t-0 lg:border-l bg-card/50">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-lg bg-muted/50 backdrop-blur flex items-center justify-center ${moduleData.color} shadow-sm`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <Badge variant="outline" className="text-xs">Premium</Badge>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                                    {moduleData.title}
                                </h1>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {moduleData.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge className={`${moduleData.color} bg-opacity-10 text-current border-0`}>
                                        {moduleData.commission}
                                    </Badge>
                                    <Badge variant="secondary">
                                        Recurring
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${moduleData.gradient} p-8 md:p-12`}>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <div className={`h-12 w-12 rounded-xl bg-background/50 backdrop-blur flex items-center justify-center ${moduleData.color} shadow-sm`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <Badge variant="outline" className="bg-background/30 backdrop-blur border-primary/20 text-foreground px-3 py-1 text-sm">
                                    Premium Module
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                                {moduleData.title}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {moduleData.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-2">
                                <Badge className={`text-base px-4 py-1.5 ${moduleData.color} bg-background/80 backdrop-blur border-0 shadow-sm`}>
                                    {moduleData.commission} Commission
                                </Badge>
                                <Badge variant="secondary" className="text-base px-4 py-1.5 bg-background/50 backdrop-blur">
                                    Recurring Revenue
                                </Badge>
                            </div>
                        </div>

                        {/* Hero Stats/Visual (Optional decorative element) */}
                        <div className="hidden lg:flex flex-col gap-3 p-6 bg-background/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                                    <DollarSign className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg. Earning</p>
                                    <p className="text-xl font-bold">$1,250/mo</p>
                                </div>
                            </div>
                            <div className="h-px bg-border/50 w-full" />
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span>Top performing vertical</span>
                            </div>
                        </div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                </div>
            )}

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column: Main Actions */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Referral Link Card */}
                    <Card className="border-primary/10 shadow-lg overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    Your Unique Affiliate Link
                                </CardTitle>
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                            </div>
                            <CardDescription>Share this link to track referrals and earn commissions automatically.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row items-center gap-3 p-1">
                                <div className="flex-1 w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 group hover:border-primary/30 transition-colors">
                                    <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <code className="flex-1 text-sm font-mono truncate text-foreground">
                                        {referralLink}
                                    </code>
                                </div>
                                <ClientCopyButton text={referralLink} />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t border-border/50 py-4 flex flex-wrap gap-3">
                            <Button variant="outline" size="sm" className="gap-2 hover:bg-background hover:text-primary hover:border-primary/30">
                                <ExternalLink className="h-4 w-4" />
                                Preview Landing Page
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 hover:bg-background hover:text-primary hover:border-primary/30">
                                <Copy className="h-4 w-4" />
                                Copy Email Template
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* How it Works - Visual Steps */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { step: "01", title: "Share Link", desc: "Post on social media, blogs, or send directly to friends.", color: "bg-blue-500" },
                            { step: "02", title: "They Subscribe", desc: "User clicks your link and purchases a subscription.", color: "bg-purple-500" },
                            { step: "03", title: "Get Paid", desc: `Earn ${moduleData.commission} recurring commission every single month.`, color: "bg-green-500" }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-background to-muted rounded-xl border border-border shadow-sm group-hover:shadow-md transition-all duration-300" />
                                <div className="relative p-6 flex flex-col gap-4">
                                    <div className={`h-10 w-10 rounded-lg ${item.color} text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Column: Features & Tools */}
                <div className="flex flex-col gap-8">

                    {/* Features List */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>Why Promote This?</CardTitle>
                            <CardDescription>Key selling points for your audience.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {moduleData.features.map((feature, i) => {
                                    const FeatureIcon = feature.icon;
                                    return (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className={`mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center ${moduleData.color}`}>
                                                <FeatureIcon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                                                <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Testing Sandbox */}
                    <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <DollarSign className="h-24 w-24 rotate-12" />
                        </div>
                        <CardHeader className="relative">
                            <CardTitle className="flex items-center gap-2 text-primary">
                                <Zap className="h-5 w-5" />
                                Sandbox Mode
                            </CardTitle>
                            <CardDescription>Test your tracking integration instantly.</CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                            <form action={async () => {
                                "use server";
                                await simulateSale(session.user.id, id);
                            }}>
                                <Button type="submit" className="w-full font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                                    Simulate $100.00 Sale
                                </Button>
                            </form>
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                System Operational
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
