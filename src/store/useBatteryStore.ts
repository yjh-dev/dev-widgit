import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface BatteryState {
  level: number;
  label: string;
  showPercent: boolean;
  animate: boolean;
  autoColor: boolean;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setLevel: (v: number) => void;
  setLabel: (v: string) => void;
  setShowPercent: (v: boolean) => void;
  setAnimate: (v: boolean) => void;
  setAutoColor: (v: boolean) => void;
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
  level: 75,
  label: "",
  showPercent: true,
  animate: false,
  autoColor: true,
  color: "22C55E",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useBatteryStore = create<BatteryState>((set) => ({
  ...initialState,

  setLevel: (level) => set({ level }),
  setLabel: (label) => set({ label }),
  setShowPercent: (showPercent) => set({ showPercent }),
  setAnimate: (animate) => set({ animate }),
  setAutoColor: (autoColor) => set({ autoColor }),
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
