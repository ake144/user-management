"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BookOpen, Mail, ArrowRight, RefreshCw, CheckCircle } from "lucide-react"
import { OTPInput } from "@/components/auth/otp-input"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

export default function VerifyPage() {
    const router = useRouter()
    const { user, pendingEmail, setUser, setPendingEmail, isLoading, setLoading } = useAuthStore()

    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [resendDisabled, setResendDisabled] = useState(true)
    const [countdown, setCountdown] = useState(60)
    const [isResending, setIsResending] = useState(false)

    const email = pendingEmail || user?.email

    useEffect(() => {
        // Redirect if no email to verify
        if (!email) {
            router.push("/auth/signup")
            return
        }

        // Start countdown timer
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    setResendDisabled(false)
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [email, router])

    const handleOTPComplete = async (otp: string) => {
        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Verification failed")
                return
            }

            // Update user with verified status
            setUser(data.user, data.token)
            setPendingEmail(null)
            setSuccess(true)

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                router.push("/")
            }, 2000)
        } catch (err) {
            console.error("Verification error:", err)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleResendOTP = async () => {
        if (resendDisabled || isResending) return

        setIsResending(true)
        setError("")

        try {
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Failed to resend OTP")
                return
            }

            // For demo: show OTP in alert
            if (data._demo_otp) {
                toast("OTP Resent", {
                    description: `Demo Mode: Your new OTP is ${data._demo_otp}`,
                    action: {
                        label: "Copy OTP",
                        onClick: () => navigator.clipboard.writeText(data._demo_otp),
                    },
                })
            }

            // Reset countdown
            setCountdown(60)
            setResendDisabled(true)
        } catch (err) {
            console.error("Resend error:", err)
            setError("Failed to resend OTP. Please try again.")
        } finally {
            setIsResending(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md backdrop-blur-xl bg-white/80 border-white/20 shadow-2xl">
                    <CardContent className="pt-12 pb-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
                        <p className="text-gray-600 mb-6">
                            Your account has been successfully verified.
                        </p>
                        <p className="text-sm text-gray-500">
                            Redirecting to dashboard...
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Global Pathways Academy
                        </span>
                    </Link>
                </div>

                <Card className="backdrop-blur-xl bg-white/80 border-white/20 shadow-2xl">
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
                        <p className="text-gray-600 mt-2">
                            We&apos;ve sent a 6-digit code to
                        </p>
                        <p className="font-medium text-gray-900">{email}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* OTP Input */}
                        <OTPInput onComplete={handleOTPComplete} disabled={isLoading} />

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                                <span>Verifying...</span>
                            </div>
                        )}

                        {/* Resend OTP */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">
                                Didn&apos;t receive the code?
                            </p>
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={resendDisabled || isResending}
                                onClick={handleResendOTP}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                                {isResending ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : resendDisabled ? (
                                    `Resend in ${countdown}s`
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Resend Code
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Help Text */}
                        <div className="text-center text-sm text-gray-500">
                            <p>
                                Check your spam folder if you don&apos;t see the email.
                            </p>
                        </div>

                        {/* Back to Signup */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <Link href="/auth/signup" className="text-sm text-gray-600 hover:text-gray-900">
                                ← Back to signup
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
