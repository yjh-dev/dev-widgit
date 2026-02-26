import { create } from "zustand";
import type { NumberStyle } from "@/lib/analog-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface AnalogClockState {
  timezone: string;
  showNumbers: boolean;
  numStyle: NumberStyle;
  showSeconds: boolean;
  showTicks: boolean;
  showBorder: boolean;
  handColor: string;
  secHandColor: string;
  faceColor: string;
  tickColor: string;
  borderColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTimezone: (v: string) => void;
  setShowNumbers: (v: boolean) => void;
  setNumStyle: (v: NumberStyle) => void;
  setShowSeconds: (v: boolean) => void;
  setShowTicks: (v: boolean) => void;
  setShowBorder: (v: boolean) => void;
  setHandColor: (v: string) => void;
  setSecHandColor: (v: string) => void;
  setFaceColor: (v: string) => void;
  setTickColor: (v: string) => void;
  setBorderColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  timezone: "Asia/Seoul",
  showNumbers: true,
  numStyle: "quarter" as NumberStyle,
  showSeconds: true,
  showTicks: true,
  showBorder: true,
  handColor: "1E1E1E",
  secHandColor: "E11D48",
  faceColor: "FFFFFF",
  tickColor: "999999",
  borderColor: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useAnalogClockStore = create<AnalogClockState>((set) => ({
  ...initialState,

  setTimezone: (timezone) => set({ timezone }),
  setShowNumbers: (showNumbers) => set({ showNumbers }),
  setNumStyle: (numStyle) => set({ numStyle }),
  setShowSeconds: (showSeconds) => set({ showSeconds }),
  setShowTicks: (showTicks) => set({ showTicks }),
  setShowBorder: (showBorder) => set({ showBorder }),
  setHandColor: (handColor) => set({ handColor }),
  setSecHandColor: (secHandColor) => set({ secHandColor }),
  setFaceColor: (faceColor) => set({ faceColor }),
  setTickColor: (tickColor) => set({ tickColor }),
  setBorderColor: (borderColor) => set({ borderColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
