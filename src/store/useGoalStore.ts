import { create } from "zustand";
import type { GoalStyle } from "@/lib/goal";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface GoalState {
  title: string;
  current: number;
  target: number;
  unit: string;
  style: GoalStyle;
  showValue: boolean;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTitle: (v: string) => void;
  setCurrent: (v: number) => void;
  setTarget: (v: number) => void;
  setUnit: (v: string) => void;
  setStyle: (v: GoalStyle) => void;
  setShowValue: (v: boolean) => void;
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
  title: "",
  current: 0,
  target: 100,
  unit: "",
  style: "bar" as GoalStyle,
  showValue: true,
  color: "2563EB",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useGoalStore = create<GoalState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setCurrent: (current) => set({ current }),
  setTarget: (target) => set({ target }),
  setUnit: (unit) => set({ unit }),
  setStyle: (style) => set({ style }),
  setShowValue: (showValue) => set({ showValue }),
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
