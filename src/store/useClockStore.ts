import { create } from "zustand";
import type { ClockFormat, ClockDateFormat } from "@/lib/clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface ClockState {
  timezone: string;
  format: ClockFormat;
  font: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  showSeconds: boolean;
  showDate: boolean;
  blink: boolean;
  dateColor: string;
  dateFmt: ClockDateFormat;

  setTimezone: (timezone: string) => void;
  setFormat: (format: ClockFormat) => void;
  setFont: (font: string) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setShowSeconds: (showSeconds: boolean) => void;
  setShowDate: (showDate: boolean) => void;
  setBlink: (blink: boolean) => void;
  setDateColor: (dateColor: string) => void;
  setDateFmt: (dateFmt: ClockDateFormat) => void;
  reset: () => void;
}

const initialState = {
  timezone: "Asia/Seoul",
  format: "24h" as ClockFormat,
  font: "mono",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  showSeconds: true,
  showDate: false,
  blink: true,
  dateColor: "",
  dateFmt: "kr" as ClockDateFormat,
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
  setDateColor: (dateColor) => set({ dateColor }),
  setDateFmt: (dateFmt) => set({ dateFmt }),
  reset: () => set(initialState),
}));
