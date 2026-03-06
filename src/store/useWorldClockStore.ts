import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { WorldClockFormat } from "@/lib/world-clock";

const widgetDefaults = {
  zones: ["Asia/Seoul", "America/New_York"],
  labels: [] as string[],
  format: "24h" as WorldClockFormat,
  showLabel: true,
  showSeconds: false,
  showDate: false,
  color: "1E1E1E",
  textColor: "",
  font: "mono",
};

interface WorldClockState extends CommonStyleState {
  zones: string[];
  labels: string[];
  format: WorldClockFormat;
  showLabel: boolean;
  showSeconds: boolean;
  showDate: boolean;
  color: string;
  textColor: string;
  font: string;

  setZones: (v: string[]) => void;
  setLabels: (v: string[]) => void;
  setFormat: (v: WorldClockFormat) => void;
  setShowLabel: (v: boolean) => void;
  setShowSeconds: (v: boolean) => void;
  setShowDate: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useWorldClockStore = create<WorldClockState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setZones: (v: string[]) => set({ zones: v }),
    setLabels: (v: string[]) => set({ labels: v }),
    setFormat: (v: WorldClockFormat) => set({ format: v }),
    setShowLabel: (v: boolean) => set({ showLabel: v }),
    setShowSeconds: (v: boolean) => set({ showSeconds: v }),
    setShowDate: (v: boolean) => set({ showDate: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
