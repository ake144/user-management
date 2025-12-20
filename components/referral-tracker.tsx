"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function ReferralTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const refCode = searchParams.get("ref");
        if (refCode) {
            // Set cookie for 30 days
            const d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = `referral_code=${refCode};${expires};path=/`;
        }
    }, [searchParams]);

    return null;
}
