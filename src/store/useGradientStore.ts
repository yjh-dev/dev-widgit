import { create } from "zustand";
import type { GradientType } from "@/lib/gradient";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface GradientState {
  colors: string[];
  dir: number;
  type: GradientType;
  animate: boolean;
  speed: number;
  text: string;
  textColor: string;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setColors: (v: string[]) => void;
  setDir: (v: number) => void;
  setType: (v: GradientType) => void;
  setAnimate: (v: boolean) => void;
  setSpeed: (v: number) => void;
  setText: (v: string) => void;
  setTextColor: (v: string) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  colors: ["6366F1", "EC4899"],
  dir: 135,
  type: "linear" as GradientType,
  animate: false,
  speed: 10,
  text: "",
  textColor: "FFFFFF",
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useGradientStore = create<GradientState>((set) => ({
  ...initialState,

  setColors: (colors) => set({ colors }),
  setDir: (dir) => set({ dir }),
  setType: (type) => set({ type }),
  setAnimate: (animate) => set({ animate }),
  setSpeed: (speed) => set({ speed }),
  setText: (text) => set({ text }),
  setTextColor: (textColor) => set({ textColor }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
