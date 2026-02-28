import { create } from "zustand";
import type { AgeStyle } from "@/lib/age-calculator";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface AgeCalculatorState {
  birthdate: string;
  showTime: boolean;
  showLabel: boolean;
  style: AgeStyle;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setBirthdate: (v: string) => void;
  setShowTime: (v: boolean) => void;
  setShowLabel: (v: boolean) => void;
  setStyle: (v: AgeStyle) => void;
  setColor: (v: string) => void;
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
  birthdate: "1995-01-01",
  showTime: true,
  showLabel: true,
  style: "full" as AgeStyle,
  color: "2563EB",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useAgeCalculatorStore = create<AgeCalculatorState>((set) => ({
  ...initialState,

  setBirthdate: (birthdate) => set({ birthdate }),
  setShowTime: (showTime) => set({ showTime }),
  setShowLabel: (showLabel) => set({ showLabel }),
  setStyle: (style) => set({ style }),
  setColor: (color) => set({ color }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
