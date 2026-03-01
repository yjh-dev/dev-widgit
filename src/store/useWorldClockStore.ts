import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { WorldClockFormat } from "@/lib/world-clock";

const widgetDefaults = {
  zones: ["Asia/Seoul", "America/New_York"],
  format: "24h" as WorldClockFormat,
  showLabel: true,
  showSeconds: false,
  color: "1E1E1E",
};

interface WorldClockState extends CommonStyleState {
  zones: string[];
  format: WorldClockFormat;
  showLabel: boolean;
  showSeconds: boolean;
  color: string;

  setZones: (v: string[]) => void;
  setFormat: (v: WorldClockFormat) => void;
  setShowLabel: (v: boolean) => void;
  setShowSeconds: (v: boolean) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useWorldClockStore = create<WorldClockState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setZones: (v: string[]) => set({ zones: v }),
    setFormat: (v: WorldClockFormat) => set({ format: v }),
    setShowLabel: (v: boolean) => set({ showLabel: v }),
    setShowSeconds: (v: boolean) => set({ showSeconds: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
