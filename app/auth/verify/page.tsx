"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"

export default function VerifyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                <Card className="backdrop-blur-xl bg-white/80 border-white/20 shadow-2xl">
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
                        <p className="text-gray-600 mt-2">
                            We&apos;ve sent a verification link to your email address.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Back to Login */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                                <Button variant="link">Back to login</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
