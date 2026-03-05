import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  showHex: true,
  showRgb: false,
  showName: true,
  font: "sans",
};

interface DailyColorState extends CommonStyleState {
  showHex: boolean;
  showRgb: boolean;
  showName: boolean;
  font: string;

  setShowHex: (v: boolean) => void;
  setShowRgb: (v: boolean) => void;
  setShowName: (v: boolean) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useDailyColorStore = create<DailyColorState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setShowHex: (v: boolean) => set({ showHex: v }),
    setShowRgb: (v: boolean) => set({ showRgb: v }),
    setShowName: (v: boolean) => set({ showName: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
