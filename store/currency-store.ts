import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  currency: 'USD' | 'ETB';
  exchangeRate: number; // ETB per USD
  setCurrency: (currency: 'USD' | 'ETB') => void;
  setExchangeRate: (rate: number) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'USD',
      exchangeRate: 120, // Default exchange rate 1 USD = 120 ETB
      setCurrency: (currency) => set({ currency }),
      setExchangeRate: (exchangeRate) => set({ exchangeRate }),
    }),
    {
      name: 'currency-storage',
    }
  )
);
