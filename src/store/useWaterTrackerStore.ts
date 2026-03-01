import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  goal: 8,
  glassSize: 250,
  color: "3B82F6",
  showMl: true,
  textColor: "1E1E1E",
};

interface WaterTrackerState extends CommonStyleState {
  goal: number;
  glassSize: number;
  color: string;
  showMl: boolean;
  textColor: string;

  setGoal: (v: number) => void;
  setGlassSize: (v: number) => void;
  setColor: (v: string) => void;
  setShowMl: (v: boolean) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useWaterTrackerStore = create<WaterTrackerState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setGoal: (v: number) => set({ goal: v }),
    setGlassSize: (v: number) => set({ glassSize: v }),
    setColor: (v: string) => set({ color: v }),
    setShowMl: (v: boolean) => set({ showMl: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
