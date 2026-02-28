import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { BreathingTechnique } from "@/lib/breathing";

interface BreathingState {
  technique: BreathingTechnique;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  rounds: number;
  showGuide: boolean;
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTechnique: (v: BreathingTechnique) => void;
  setInhale: (v: number) => void;
  setHold1: (v: number) => void;
  setExhale: (v: number) => void;
  setHold2: (v: number) => void;
  setRounds: (v: number) => void;
  setShowGuide: (v: boolean) => void;
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
  technique: "478" as BreathingTechnique,
  inhale: 4,
  hold1: 7,
  exhale: 8,
  hold2: 0,
  rounds: 3,
  showGuide: true,
  accentColor: "06B6D4",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useBreathingStore = create<BreathingState>((set) => ({
  ...initialState,

  setTechnique: (technique) => set({ technique }),
  setInhale: (inhale) => set({ inhale }),
  setHold1: (hold1) => set({ hold1 }),
  setExhale: (exhale) => set({ exhale }),
  setHold2: (hold2) => set({ hold2 }),
  setRounds: (rounds) => set({ rounds }),
  setShowGuide: (showGuide) => set({ showGuide }),
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
