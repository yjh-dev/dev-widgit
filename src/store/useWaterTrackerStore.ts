import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface WaterTrackerState {
  goal: number;
  glassSize: number;
  color: string;
  showMl: boolean;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setGoal: (v: number) => void;
  setGlassSize: (v: number) => void;
  setColor: (v: string) => void;
  setShowMl: (v: boolean) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  goal: 8,
  glassSize: 250,
  color: "3B82F6",
  showMl: true,
  textColor: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useWaterTrackerStore = create<WaterTrackerState>((set) => ({
  ...initialState,

  setGoal: (goal) => set({ goal }),
  setGlassSize: (glassSize) => set({ glassSize }),
  setColor: (color) => set({ color }),
  setShowMl: (showMl) => set({ showMl }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
