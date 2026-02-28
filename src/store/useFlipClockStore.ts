import { create } from "zustand";
import type { FlipClockFormat, FlipClockDateFormat } from "@/lib/flip-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface FlipClockState {
  timezone: string;
  format: FlipClockFormat;
  showSeconds: boolean;
  flipColor: string;
  textColor: string;
  gapColor: string;
  bg: string;
  transparentBg: boolean;
  showDate: boolean;
  dateFmt: FlipClockDateFormat;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTimezone: (v: string) => void;
  setFormat: (v: FlipClockFormat) => void;
  setShowSeconds: (v: boolean) => void;
  setFlipColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setGapColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setShowDate: (v: boolean) => void;
  setDateFmt: (v: FlipClockDateFormat) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  timezone: "Asia/Seoul",
  format: "24h" as FlipClockFormat,
  showSeconds: false,
  flipColor: "1E1E1E",
  textColor: "FFFFFF",
  gapColor: "333333",
  bg: "FFFFFF",
  transparentBg: false,
  showDate: false,
  dateFmt: "kr" as FlipClockDateFormat,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useFlipClockStore = create<FlipClockState>((set) => ({
  ...initialState,

  setTimezone: (timezone) => set({ timezone }),
  setFormat: (format) => set({ format }),
  setShowSeconds: (showSeconds) => set({ showSeconds }),
  setFlipColor: (flipColor) => set({ flipColor }),
  setTextColor: (textColor) => set({ textColor }),
  setGapColor: (gapColor) => set({ gapColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setShowDate: (showDate) => set({ showDate }),
  setDateFmt: (dateFmt) => set({ dateFmt }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
