"use client";

import { useCurrencyStore } from "@/store/currency-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Globe, MapPin } from "lucide-react";

export function CurrencySelector() {
    const { currency, setCurrency } = useCurrencyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-[140px] h-10 bg-muted/20 animate-pulse rounded-md"></div>;
    }

    return (
        <Select value={currency} onValueChange={(val: "USD" | "ETB") => setCurrency(val)}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="USD">
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Global ($)</span>
                    </div>
                </SelectItem>
                <SelectItem value="ETB">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Local (Birr)</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
