"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function updateUserReferral(referralCode: string, referredById?: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            referralCode,
            referredById
        }
    });
    
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
