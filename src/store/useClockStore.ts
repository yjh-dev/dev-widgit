import { create } from "zustand";
import type { ClockFormat, ClockFont } from "@/lib/clock";

interface ClockState {
  timezone: string;
  format: ClockFormat;
  font: ClockFont;
  color: string;
  bg: string;
  transparentBg: boolean;

  setTimezone: (timezone: string) => void;
  setFormat: (format: ClockFormat) => void;
  setFont: (font: ClockFont) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  reset: () => void;
}

const initialState = {
  timezone: "Asia/Seoul",
  format: "24h" as ClockFormat,
  font: "mono" as ClockFont,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
};

export const useClockStore = create<ClockState>((set) => ({
  ...initialState,

  setTimezone: (timezone) => set({ timezone }),
  setFormat: (format) => set({ format }),
  setFont: (font) => set({ font }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  reset: () => set(initialState),
}));
