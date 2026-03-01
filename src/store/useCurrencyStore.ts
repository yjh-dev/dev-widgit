import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  base: "USD",
  targets: ["KRW", "JPY"] as string[],
  showFlag: true,
  refreshMin: 60,
  accentColor: "2563EB",
  color: "1E1E1E",
};

interface CurrencyState extends CommonStyleState {
  base: string;
  targets: string[];
  showFlag: boolean;
  refreshMin: number;
  accentColor: string;
  color: string;

  setBase: (v: string) => void;
  setTargets: (v: string[]) => void;
  setShowFlag: (v: boolean) => void;
  setRefreshMin: (v: number) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useCurrencyStore = create<CurrencyState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setBase: (v: string) => set({ base: v }),
    setTargets: (v: string[]) => set({ targets: v }),
    setShowFlag: (v: boolean) => set({ showFlag: v }),
    setRefreshMin: (v: number) => set({ refreshMin: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
