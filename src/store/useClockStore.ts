import { create } from "zustand";
import type { ClockFormat, ClockFont } from "@/lib/clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface ClockState {
  timezone: string;
  format: ClockFormat;
  font: ClockFont;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  showSeconds: boolean;
  showDate: boolean;
  blink: boolean;

  setTimezone: (timezone: string) => void;
  setFormat: (format: ClockFormat) => void;
  setFont: (font: ClockFont) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setShowSeconds: (showSeconds: boolean) => void;
  setShowDate: (showDate: boolean) => void;
  setBlink: (blink: boolean) => void;
  reset: () => void;
}

const initialState = {
  timezone: "Asia/Seoul",
  format: "24h" as ClockFormat,
  font: "mono" as ClockFont,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  showSeconds: true,
  showDate: false,
  blink: true,
};

export const useClockStore = create<ClockState>((set) => ({
  ...initialState,

  setTimezone: (timezone) => set({ timezone }),
  setFormat: (format) => set({ format }),
  setFont: (font) => set({ font }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setShowSeconds: (showSeconds) => set({ showSeconds }),
  setShowDate: (showDate) => set({ showDate }),
  setBlink: (blink) => set({ blink }),
  reset: () => set(initialState),
}));
