import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  level: 75,
  label: "",
  showPercent: true,
  animate: false,
  autoColor: true,
  color: "22C55E",
  textColor: "",
};

interface BatteryState extends CommonStyleState {
  level: number;
  label: string;
  showPercent: boolean;
  animate: boolean;
  autoColor: boolean;
  color: string;
  textColor: string;

  setLevel: (v: number) => void;
  setLabel: (v: string) => void;
  setShowPercent: (v: boolean) => void;
  setAnimate: (v: boolean) => void;
  setAutoColor: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useBatteryStore = create<BatteryState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setLevel: (v: number) => set({ level: v }),
    setLabel: (v: string) => set({ label: v }),
    setShowPercent: (v: boolean) => set({ showPercent: v }),
    setAnimate: (v: boolean) => set({ animate: v }),
    setAutoColor: (v: boolean) => set({ autoColor: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
