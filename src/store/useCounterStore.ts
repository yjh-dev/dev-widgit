import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface CounterState {
  label: string;
  initial: number;
  step: number;
  min: string;
  max: string;
  showReset: boolean;
  color: string;
  btnColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setLabel: (v: string) => void;
  setInitial: (v: number) => void;
  setStep: (v: number) => void;
  setMin: (v: string) => void;
  setMax: (v: string) => void;
  setShowReset: (v: boolean) => void;
  setColor: (v: string) => void;
  setBtnColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  label: "카운터",
  initial: 0,
  step: 1,
  min: "",
  max: "",
  showReset: true,
  color: "1E1E1E",
  btnColor: "2563EB",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useCounterStore = create<CounterState>((set) => ({
  ...initialState,

  setLabel: (label) => set({ label }),
  setInitial: (initial) => set({ initial }),
  setStep: (step) => set({ step }),
  setMin: (min) => set({ min }),
  setMax: (max) => set({ max }),
  setShowReset: (showReset) => set({ showReset }),
  setColor: (color) => set({ color }),
  setBtnColor: (btnColor) => set({ btnColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
