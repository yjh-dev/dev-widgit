import { create } from "zustand";
import type { ProgressType, WeekStart } from "@/lib/time-progress";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

export type BarStyle = "bar" | "ring";
export type BarHeight = "thin" | "default" | "thick";
export type RingSize = "sm" | "md" | "lg";

const widgetDefaults = {
  type: "day" as ProgressType,
  color: "2563EB",
  style: "bar" as BarStyle,
  showLabel: true,
  showPercent: true,
  barHeight: "default" as BarHeight,
  textColor: "",
  weekStart: "mon" as WeekStart,
  ringSize: "md" as RingSize,
  showRemain: false,
};

interface TimeProgressState extends CommonStyleState {
  type: ProgressType;
  color: string;
  style: BarStyle;
  showLabel: boolean;
  showPercent: boolean;
  barHeight: BarHeight;
  textColor: string;
  weekStart: WeekStart;
  ringSize: RingSize;
  showRemain: boolean;
  setType: (v: ProgressType) => void;
  setColor: (v: string) => void;
  setStyle: (v: BarStyle) => void;
  setShowLabel: (v: boolean) => void;
  setShowPercent: (v: boolean) => void;
  setBarHeight: (v: BarHeight) => void;
  setTextColor: (v: string) => void;
  setWeekStart: (v: WeekStart) => void;
  setRingSize: (v: RingSize) => void;
  setShowRemain: (v: boolean) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTimeProgressStore = create<TimeProgressState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setType: (v: ProgressType) => set({ type: v }),
    setColor: (v: string) => set({ color: v }),
    setStyle: (v: BarStyle) => set({ style: v }),
    setShowLabel: (v: boolean) => set({ showLabel: v }),
    setShowPercent: (v: boolean) => set({ showPercent: v }),
    setBarHeight: (v: BarHeight) => set({ barHeight: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setWeekStart: (v: WeekStart) => set({ weekStart: v }),
    setRingSize: (v: RingSize) => set({ ringSize: v }),
    setShowRemain: (v: boolean) => set({ showRemain: v }),
  })),
);
