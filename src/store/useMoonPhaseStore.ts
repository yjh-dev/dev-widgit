import { create } from "zustand";
import type { MoonStyle, MoonSize } from "@/lib/moon-phase";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface MoonPhaseState {
  style: MoonStyle;
  showName: boolean;
  showPercent: boolean;
  showNext: boolean;
  moonColor: string;
  shadowColor: string;
  bg: string;
  transparentBg: boolean;
  textColor: string;
  moonSize: MoonSize;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setStyle: (v: MoonStyle) => void;
  setShowName: (v: boolean) => void;
  setShowPercent: (v: boolean) => void;
  setShowNext: (v: boolean) => void;
  setMoonColor: (v: string) => void;
  setShadowColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setTextColor: (v: string) => void;
  setMoonSize: (v: MoonSize) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  style: "realistic" as MoonStyle,
  showName: true,
  showPercent: true,
  showNext: false,
  moonColor: "F5F5DC",
  shadowColor: "1A1A2E",
  bg: "0F172A",
  transparentBg: false,
  textColor: "E0E0E0",
  moonSize: "md" as MoonSize,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useMoonPhaseStore = create<MoonPhaseState>((set) => ({
  ...initialState,

  setStyle: (style) => set({ style }),
  setShowName: (showName) => set({ showName }),
  setShowPercent: (showPercent) => set({ showPercent }),
  setShowNext: (showNext) => set({ showNext }),
  setMoonColor: (moonColor) => set({ moonColor }),
  setShadowColor: (shadowColor) => set({ shadowColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setTextColor: (textColor) => set({ textColor }),
  setMoonSize: (moonSize) => set({ moonSize }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
