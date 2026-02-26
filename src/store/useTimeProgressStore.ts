import { create } from "zustand";
import type { ProgressType, WeekStart } from "@/lib/time-progress";
import type { FontSizeKey } from "@/lib/common-widget-options";

export type BarStyle = "bar" | "ring";
export type BarHeight = "thin" | "default" | "thick";
export type RingSize = "sm" | "md" | "lg";

interface TimeProgressState {
  type: ProgressType;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  style: BarStyle;
  showLabel: boolean;
  showPercent: boolean;
  barHeight: BarHeight;
  textColor: string;
  weekStart: WeekStart;
  ringSize: RingSize;
  showRemain: boolean;

  setType: (type: ProgressType) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setStyle: (style: BarStyle) => void;
  setShowLabel: (showLabel: boolean) => void;
  setShowPercent: (showPercent: boolean) => void;
  setBarHeight: (barHeight: BarHeight) => void;
  setTextColor: (textColor: string) => void;
  setWeekStart: (weekStart: WeekStart) => void;
  setRingSize: (ringSize: RingSize) => void;
  setShowRemain: (showRemain: boolean) => void;
  reset: () => void;
}

const initialState = {
  type: "day" as ProgressType,
  color: "2563EB",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  style: "bar" as BarStyle,
  showLabel: true,
  showPercent: true,
  barHeight: "default" as BarHeight,
  textColor: "",
  weekStart: "mon" as WeekStart,
  ringSize: "md" as RingSize,
  showRemain: false,
};

export const useTimeProgressStore = create<TimeProgressState>((set) => ({
  ...initialState,

  setType: (type) => set({ type }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setStyle: (style) => set({ style }),
  setShowLabel: (showLabel) => set({ showLabel }),
  setShowPercent: (showPercent) => set({ showPercent }),
  setBarHeight: (barHeight) => set({ barHeight }),
  setTextColor: (textColor) => set({ textColor }),
  setWeekStart: (weekStart) => set({ weekStart }),
  setRingSize: (ringSize) => set({ ringSize }),
  setShowRemain: (showRemain) => set({ showRemain }),
  reset: () => set(initialState),
}));
