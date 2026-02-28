import { create } from "zustand";
import type { DividerStyle, DividerWeight } from "@/lib/divider";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface DividerState {
  style: DividerStyle;
  weight: DividerWeight;
  color: string;
  color2: string;
  text: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setStyle: (v: DividerStyle) => void;
  setWeight: (v: DividerWeight) => void;
  setColor: (v: string) => void;
  setColor2: (v: string) => void;
  setText: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  style: "solid" as DividerStyle,
  weight: "medium" as DividerWeight,
  color: "D4D4D8",
  color2: "A1A1AA",
  text: "",
  bg: "FFFFFF",
  transparentBg: true,
  borderRadius: 16,
  padding: 8,
  fontSize: "md" as FontSizeKey,
};

export const useDividerStore = create<DividerState>((set) => ({
  ...initialState,

  setStyle: (style) => set({ style }),
  setWeight: (weight) => set({ weight }),
  setColor: (color) => set({ color }),
  setColor2: (color2) => set({ color2 }),
  setText: (text) => set({ text }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
