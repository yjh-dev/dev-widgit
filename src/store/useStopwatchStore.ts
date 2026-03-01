import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  showMs: false,
  showLap: false,
  color: "1E1E1E",
  btnColor: "2563EB",
};

interface StopwatchState extends CommonStyleState {
  showMs: boolean;
  showLap: boolean;
  color: string;
  btnColor: string;
  setShowMs: (v: boolean) => void;
  setShowLap: (v: boolean) => void;
  setColor: (v: string) => void;
  setBtnColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useStopwatchStore = create<StopwatchState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setShowMs: (v: boolean) => set({ showMs: v }),
    setShowLap: (v: boolean) => set({ showLap: v }),
    setColor: (v: string) => set({ color: v }),
    setBtnColor: (v: string) => set({ btnColor: v }),
  })),
);
