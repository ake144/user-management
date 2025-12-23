"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BookOpen, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle, Gift } from "lucide-react"
import { toast } from "sonner"
import { signUp, signIn } from "@/lib/auth-client"
import { getReferrerDetails, completeUserProfile } from "./actions"

const countries = [
    { code: "ET", name: "Ethiopia" },
    { code: "KE", name: "Kenya" },
    { code: "NG", name: "Nigeria" },
    { code: "ZA", name: "South Africa" },
    { code: "GH", name: "Ghana" },
    { code: "EG", name: "Egypt" },
    { code: "TZ", name: "Tanzania" },
    { code: "UG", name: "Uganda" },
    { code: "RW", name: "Rwanda" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "AE", name: "United Arab Emirates" },
]

function SignupForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setLoading] = useState(false)
    const [referrer, setReferrer] = useState<{ id: string; name: string } | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        country: "Ethiopia",
        city: "Addis Ababa",
        sponsorId: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    useEffect(() => {
        const checkReferral = async () => {
            let refCode = searchParams.get("ref")

            // Fallback to cookie if no URL param
            if (!refCode) {
                const match = document.cookie.match(new RegExp('(^| )referral_code=([^;]+)'));
                if (match) refCode = match[2];
            }

            if (refCode) {
                const details = await getReferrerDetails(refCode)
                if (details) {
                    setReferrer({ id: details.id, name: details.name })
                    toast.success(`You were referred by ${details.name}!`)
                }
            }
        }
        checkReferral()
    }, [searchParams])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Please enter a valid phone number"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!agreedToTerms) {
            newErrors.terms = "You must agree to the terms and conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const generateReferralCode = (name: string) => {
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const randomStr = Math.random().toString(36).substring(2, 7);
        return `${cleanName}-${randomStr}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setErrors({})

        const newReferralCode = generateReferralCode(formData.name);
        const finalReferrerId = formData.sponsorId || referrer?.id;

        await signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.name,
        }, {
            onSuccess: async () => {
                try {
                    await completeUserProfile({
                        referralCode: newReferralCode,
                        referredById: finalReferrerId,
                        phone: formData.phone,
                        country: formData.country,
                        city: formData.city
                    });
                } catch (e) {
                    console.error("Failed to update user profile", e);
                    // Even if this fails, the user is created. 
                    // We might want to show a warning or just proceed.
                }
                toast.success("Account created successfully!");

                router.push("/auth/login")
            },
            onError: (ctx: any) => {
                setErrors({ submit: ctx.error.message || "Signup failed" })
                setLoading(false)
            }
        })
    }

    const getPasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        return strength
    }

    const passwordStrength = getPasswordStrength(formData.password)
    const strengthColors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-600"]
    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"]

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-2xl">
                <div className="text-center mb-8">
                                    <Link href="/" className="inline-flex items-center gap-3 group">
                
                                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                            Esperanza Affiliate Program
                                        </span>
                                    </Link>
                 </div>
                            
                <Card className="backdrop-blur-xl bg-card/80 border-border shadow-2xl">
                    <CardHeader className="text-center pb-4">
                        <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
                        <p className="text-muted-foreground mt-1">Start your learning journey today</p>

                        {referrer && (
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                <Gift className="w-4 h-4" />
                                Referred by {referrer.name}
                            </div>
                        )}
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className={`pl-10 h-12 bg-background border-input focus:border-primary ${errors.name ? "border-destructive" : ""}`}
                                    />
                                </div>
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sponsorId" className="text-foreground">Sponsor Id (optional)</Label>
                                <div className="relative">
                                    
                                    <Input
                                        id="sponsorId"
                                        type="text"
                                        placeholder=""
                                        value={formData.sponsorId}
                                        onChange={(e) => setFormData(prev => ({ ...prev, sponsorId: e.target.value }))}
                                        className={`pl-10 h-12 bg-background border-input focus:border-primary ${errors.sponsorId ? "border-destructive" : ""}`}
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className={`pl-10 h-12 bg-background border-input focus:border-primary ${errors.email ? "border-destructive" : ""}`}
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+251 9XX XXX XXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        className={`pl-10 h-12 bg-background border-input focus:border-primary ${errors.phone ? "border-destructive" : ""}`}
                                    />
                                </div>
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                            </div>

                            {/* Country and City Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-foreground">Country</Label>
                                    <Select
                                        value={formData.country}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                                    >
                                        <SelectTrigger className="h-12 bg-background border-input focus:border-primary">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem key={country.code} value={country.name}>
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-foreground">City</Label>
                                    <Input
                                        id="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                        className="h-12 bg-background border-input focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        className={`pl-10 pr-10 h-12 bg-background border-input focus:border-primary ${errors.password ? "border-destructive" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="space-y-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength >= level ? strengthColors[passwordStrength] : "bg-muted"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-muted-foreground">{strengthLabels[passwordStrength]}</p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className={`pl-10 pr-10 h-12 bg-background border-input focus:border-primary ${errors.confirmPassword ? "border-destructive" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <CheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-1 rounded border-input text-primary focus:ring-primary bg-background"
                                />
                                <label htmlFor="terms" className="text-sm text-muted-foreground">
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                    {" "}and{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                </label>
                            </div>
                            {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

                            {/* Submit Error */}
                            {errors.submit && (
                                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                                    {errors.submit}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-card text-muted-foreground">Or sign up with</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 bg-background hover:bg-accent border-input"
                                    onClick={() => signIn.social({ provider: "google", callbackURL: "/dashboard" })}
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 bg-background hover:bg-accent border-input"
                                    onClick={() => signIn.social({ provider: "github", callbackURL: "/dashboard" })}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </Button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <p className="text-center mt-6 text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
        </Suspense>
    )
}
