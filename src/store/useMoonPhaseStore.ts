import { create } from "zustand";
import type { MoonStyle, MoonSize } from "@/lib/moon-phase";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  style: "realistic" as MoonStyle,
  showName: true,
  showPercent: true,
  showNext: false,
  moonColor: "F5F5DC",
  shadowColor: "1A1A2E",
  bg: "0F172A",
  textColor: "E0E0E0",
  moonSize: "md" as MoonSize,
};

interface MoonPhaseState extends CommonStyleState {
  style: MoonStyle;
  showName: boolean;
  showPercent: boolean;
  showNext: boolean;
  moonColor: string;
  shadowColor: string;
  textColor: string;
  moonSize: MoonSize;
  setStyle: (v: MoonStyle) => void;
  setShowName: (v: boolean) => void;
  setShowPercent: (v: boolean) => void;
  setShowNext: (v: boolean) => void;
  setMoonColor: (v: string) => void;
  setShadowColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setMoonSize: (v: MoonSize) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMoonPhaseStore = create<MoonPhaseState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setStyle: (v: MoonStyle) => set({ style: v }),
    setShowName: (v: boolean) => set({ showName: v }),
    setShowPercent: (v: boolean) => set({ showPercent: v }),
    setShowNext: (v: boolean) => set({ showNext: v }),
    setMoonColor: (v: string) => set({ moonColor: v }),
    setShadowColor: (v: string) => set({ shadowColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setMoonSize: (v: MoonSize) => set({ moonSize: v }),
  })),
);
