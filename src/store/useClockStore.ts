import { create } from "zustand";
import type { ClockFormat, ClockDateFormat } from "@/lib/clock";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  timezone: "Asia/Seoul",
  format: "24h" as ClockFormat,
  font: "mono",
  color: "1E1E1E",
  showSeconds: true,
  showDate: false,
  blink: true,
  dateColor: "",
  dateFmt: "kr" as ClockDateFormat,
};

interface ClockState extends CommonStyleState {
  timezone: string;
  format: ClockFormat;
  font: string;
  color: string;
  showSeconds: boolean;
  showDate: boolean;
  blink: boolean;
  dateColor: string;
  dateFmt: ClockDateFormat;
  setTimezone: (v: string) => void;
  setFormat: (v: ClockFormat) => void;
  setFont: (v: string) => void;
  setColor: (v: string) => void;
  setShowSeconds: (v: boolean) => void;
  setShowDate: (v: boolean) => void;
  setBlink: (v: boolean) => void;
  setDateColor: (v: string) => void;
  setDateFmt: (v: ClockDateFormat) => void;
  loadPreset: (preset: Partial<typeof widgetDefaults & { bg: string; transparentBg: boolean; borderRadius: number; padding: number; fontSize: FontSizeKey }>) => void;
  reset: () => void;
}

export const useClockStore = create<ClockState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTimezone: (v: string) => set({ timezone: v }),
    setFormat: (v: ClockFormat) => set({ format: v }),
    setFont: (v: string) => set({ font: v }),
    setColor: (v: string) => set({ color: v }),
    setShowSeconds: (v: boolean) => set({ showSeconds: v }),
    setShowDate: (v: boolean) => set({ showDate: v }),
    setBlink: (v: boolean) => set({ blink: v }),
    setDateColor: (v: string) => set({ dateColor: v }),
    setDateFmt: (v: ClockDateFormat) => set({ dateFmt: v }),
  })),
);
