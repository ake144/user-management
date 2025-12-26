import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MODULES } from "@/lib/modules";
import { getUplineChain } from "@/lib/services/referral-service";
import crypto from "crypto";

// Force dynamic to ensure webhook is always processed fresh
export const dynamic = 'force-dynamic';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "your-fallback-secret-for-dev";

// Commission Rates for Upline (Level 2, 3, 4)
// Level 1 (Direct) is taken from the Module config
const UPLINE_RATES = [0.05, 0.03, 0.01]; // 5%, 3%, 1%

interface WebhookPayload {
    refCode: string;
    saleAmount: number;
    productId: string;
    saleId: string;
    moduleTitle?: string;
}

/**
 * Verify HMAC SHA256 signature
 */
async function verifySignature(req: NextRequest, payload: string): Promise<boolean> {
    const signature = req.headers.get("x-webhook-signature");
    if (!signature) return false;

    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
    const digest = hmac.update(payload).digest("hex");

    // Use timingSafeEqual to prevent timing attacks
    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (signatureBuffer.length !== digestBuffer.length) return false;
    return crypto.timingSafeEqual(signatureBuffer, digestBuffer);
}

export async function POST(req: NextRequest) {
    try {
        // 1. Get raw body for signature verification
        const rawBody = await req.text();
        
        // 2. Verify Signature (Skip in development if needed, but recommended)
        if (process.env.NODE_ENV === "production") {
            const isValid = await verifySignature(req, rawBody);
            if (!isValid) {
                return NextResponse.json(
                    { error: "Invalid signature" },
                    { status: 401 }
                );
            }
        }

        // 3. Parse Payload
        let payload: WebhookPayload;
        try {
            payload = JSON.parse(rawBody);
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const { refCode, saleAmount, productId, saleId, moduleTitle } = payload;

        // 4. Validate Required Fields
        if (!refCode || !saleAmount || !productId || !saleId) {
            return NextResponse.json(
                { error: "Missing required fields: refCode, saleAmount, productId, saleId" },
                { status: 400 }
            );
        }

        // 5. Idempotency Check: Check if transaction already exists
        const existingTransaction = await prisma.transaction.findFirst({
            where: { referenceId: saleId },
        });

        if (existingTransaction) {
            return NextResponse.json({ message: "Transaction already processed" }, { status: 200 });
        }

        // 6. Find Direct Affiliate
        const directAffiliate = await prisma.user.findUnique({
            where: { referralCode: refCode },
        });

        if (!directAffiliate) {
            // If code is invalid, we log it but return 200 to stop webhook retries 
            // (unless you want to retry for eventual consistency)
            console.warn(`Commission failed: Invalid referral code ${refCode}`);
            return NextResponse.json(
                { error: "Invalid referral code" },
                { status: 400 }
            );
        }

        // 7. Determine Commission Rates
        const moduleConfig = MODULES[productId];
        const moduleName = moduleTitle || moduleConfig?.title || productId;
        
        // Parse "20%" -> 0.20
        let directRate = 0.20; // Default fallback
        if (moduleConfig?.commission) {
            const parsed = parseFloat(moduleConfig.commission.replace("%", ""));
            if (!isNaN(parsed)) {
                directRate = parsed / 100;
            }
        }

        // 8. Calculate Distributions
        type CommissionTransactionType = "REFERRAL_COMMISSION" | "DOWNLINE_EARNING";

        interface CommissionDistribution {
            userId: string;
            amount: number;
            type: CommissionTransactionType;
            description: string;
            level: number;
        }

        const distributions: CommissionDistribution[] = [];

        // Direct Commission
        const directCommission = saleAmount * directRate;
        distributions.push({
            userId: directAffiliate.id,
            amount: directCommission,
            type: "REFERRAL_COMMISSION" as const,
            description: `Direct commission for ${moduleName} sale`,
            level: 1
        });

        // Upline Commissions
        const uplineUsers = await getUplineChain(directAffiliate.id, UPLINE_RATES.length);
        
        uplineUsers.forEach((upline, index) => {
            const rate = UPLINE_RATES[index];
            if (rate) {
                const uplineCommission = saleAmount * rate;
                distributions.push({
                    userId: upline.id,
                    amount: uplineCommission,
                    type: "DOWNLINE_EARNING" as const,
                    description: `Level ${index + 2} override from ${moduleName} sale`,
                    level: index + 2
                });
            }
        });

        // 9. Execute Database Transaction
        await prisma.$transaction(async (tx) => {
            for (const dist of distributions) {
                // Create Transaction Record
                await tx.transaction.create({
                    data: {
                        userId: dist.userId,
                        amount: dist.amount,
                        type: dist.type,
                        description: dist.description,
                        referenceId: saleId,
                    },
                });

                // Update User Balances
                await tx.user.update({
                    where: { id: dist.userId },
                    data: {
                        totalEarnings: { increment: dist.amount },
                        currentBalance: { increment: dist.amount },
                        lifetimeCommission: { increment: dist.amount },
                        // Only update lastSaleAt for the direct referrer? Or everyone? 
                        // Usually just direct referrer or if it's significant. 
                        // Let's update for everyone who earned.
                        lastSaleAt: new Date(),
                    },
                });
            }
        });

        return NextResponse.json({
            success: true,
            message: "Commissions distributed successfully",
            distributions: distributions.map(d => ({ userId: d.userId, amount: d.amount, level: d.level }))
        });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
