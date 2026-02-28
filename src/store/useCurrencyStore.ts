import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface CurrencyState {
  base: string;
  targets: string[];
  showFlag: boolean;
  refreshMin: number;
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setBase: (v: string) => void;
  setTargets: (v: string[]) => void;
  setShowFlag: (v: boolean) => void;
  setRefreshMin: (v: number) => void;
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
  base: "USD",
  targets: ["KRW", "JPY"] as string[],
  showFlag: true,
  refreshMin: 60,
  accentColor: "2563EB",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  ...initialState,

  setBase: (base) => set({ base }),
  setTargets: (targets) => set({ targets }),
  setShowFlag: (showFlag) => set({ showFlag }),
  setRefreshMin: (refreshMin) => set({ refreshMin }),
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
