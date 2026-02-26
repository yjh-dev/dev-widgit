import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface StopwatchState {
  showMs: boolean;
  showLap: boolean;
  color: string;
  btnColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setShowMs: (v: boolean) => void;
  setShowLap: (v: boolean) => void;
  setColor: (v: string) => void;
  setBtnColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  showMs: false,
  showLap: false,
  color: "1E1E1E",
  btnColor: "2563EB",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useStopwatchStore = create<StopwatchState>((set) => ({
  ...initialState,

  setShowMs: (showMs) => set({ showMs }),
  setShowLap: (showLap) => set({ showLap }),
  setColor: (color) => set({ color }),
  setBtnColor: (btnColor) => set({ btnColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
