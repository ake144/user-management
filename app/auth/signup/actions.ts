"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getRootUserId } from "@/lib/services/referral-service";
import { onUserReferralSignup } from "@/lib/hooks/use-referral-hooks";

export async function completeUserProfile(data: {
    referralCode: string;
    referredById?: string;
    phone?: string;
    country?: string;
    city?: string;
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    // If no referredById is provided, use the root user ID
    const finalReferredById = data.referredById || getRootUserId();

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            referralCode: data.referralCode,
            referredById: finalReferredById,
            phone: data.phone,
            country: data.country,
            city: data.city
        }
    });

    // Trigger the referral tree update hook
    try {
        await onUserReferralSignup(session.user.id, finalReferredById);
    } catch (error) {
        console.error("Failed to update referral tree data:", error);
        // We don't throw here to avoid failing the signup process if tree update fails
    }

    return { success: true };
}

export async function getReferrerDetails(code: string) {
    if (!code) return null;

    try {
        // Try finding by referral code first, then by ID as fallback
        const referrer = await prisma.user.findFirst({
            where: {
                OR: [
                    { referralCode: code },
                    { id: code }
                ]
            },
            select: {
                id: true,
                name: true,
                image: true
            }
        });

        return referrer;
    } catch (error) {
        console.error("Error fetching referrer:", error);
        return null;
    }
}
