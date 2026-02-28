import { create } from "zustand";
import type { PaletteLayout } from "@/lib/color-palette";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface ColorPaletteState {
  colors: string[];
  layout: PaletteLayout;
  showHex: boolean;
  showName: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setColors: (v: string[]) => void;
  setLayout: (v: PaletteLayout) => void;
  setShowHex: (v: boolean) => void;
  setShowName: (v: boolean) => void;
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
  colors: ["2563EB", "7C3AED", "EC4899", "F59E0B"],
  layout: "horizontal" as PaletteLayout,
  showHex: true,
  showName: false,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useColorPaletteStore = create<ColorPaletteState>((set) => ({
  ...initialState,

  setColors: (colors) => set({ colors }),
  setLayout: (layout) => set({ layout }),
  setShowHex: (showHex) => set({ showHex }),
  setShowName: (showName) => set({ showName }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
