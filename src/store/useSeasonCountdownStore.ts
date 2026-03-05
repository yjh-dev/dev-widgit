import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  showIcon: true,
  color: "2563EB",
  textColor: "",
  font: "sans",
};

interface SeasonCountdownState extends CommonStyleState {
  showIcon: boolean;
  color: string;
  textColor: string;
  font: string;
  setShowIcon: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useSeasonCountdownStore = create<SeasonCountdownState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setShowIcon: (v: boolean) => set({ showIcon: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
