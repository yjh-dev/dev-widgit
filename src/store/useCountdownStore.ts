import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface CountdownState {
  minutes: number;
  seconds: number;
  showMs: boolean;
  autoRestart: boolean;
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setMinutes: (v: number) => void;
  setSeconds: (v: number) => void;
  setShowMs: (v: boolean) => void;
  setAutoRestart: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  minutes: 5,
  seconds: 0,
  showMs: false,
  autoRestart: false,
  accentColor: "E11D48",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useCountdownStore = create<CountdownState>((set) => ({
  ...initialState,

  setMinutes: (minutes) => set({ minutes }),
  setSeconds: (seconds) => set({ seconds }),
  setShowMs: (showMs) => set({ showMs }),
  setAutoRestart: (autoRestart) => set({ autoRestart }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
