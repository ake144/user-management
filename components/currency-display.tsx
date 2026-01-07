"use client";

import { useCurrencyStore } from "@/store/currency-store";
import { useEffect, useState } from "react";

interface CurrencyDisplayProps {
    amount: number;
    className?: string;
}

export function CurrencyDisplay({ amount, className = "" }: CurrencyDisplayProps) {
    const { currency, exchangeRate } = useCurrencyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatValue = (val: number, curr: string) => {
        if (curr === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(val);
        } else {
             const formatted = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val * exchangeRate);
            return `${formatted} Birr`;
        }
    }

    if (!mounted) {
        // Render server-match default (USD)
        return (
            <span className={className}>
                 {formatValue(amount, 'USD')}
            </span>
        );
    }

    return <span className={className}>{formatValue(amount, currency)}</span>;
}
