import { create } from "zustand";
import type { DiceMode, DiceSides } from "@/lib/dice";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface DiceState {
  mode: DiceMode;
  count: number;
  sides: DiceSides;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  items: string[];
  showTotal: boolean;
  history: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setMode: (v: DiceMode) => void;
  setCount: (v: number) => void;
  setSides: (v: DiceSides) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setItems: (v: string[]) => void;
  setShowTotal: (v: boolean) => void;
  setHistory: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  mode: "dice" as DiceMode,
  count: 1,
  sides: 6 as DiceSides,
  color: "2563EB",
  textColor: "FFFFFF",
  bg: "FFFFFF",
  transparentBg: false,
  items: [] as string[],
  showTotal: true,
  history: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useDiceStore = create<DiceState>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setCount: (count) => set({ count }),
  setSides: (sides) => set({ sides }),
  setColor: (color) => set({ color }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setItems: (items) => set({ items }),
  setShowTotal: (showTotal) => set({ showTotal }),
  setHistory: (history) => set({ history }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
