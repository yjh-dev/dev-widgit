import { create } from "zustand";
import type { FlipClockFormat, FlipClockDateFormat } from "@/lib/flip-clock";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  timezone: "Asia/Seoul",
  format: "24h" as FlipClockFormat,
  showSeconds: false,
  flipColor: "1E1E1E",
  textColor: "FFFFFF",
  gapColor: "333333",
  showDate: false,
  dateFmt: "kr" as FlipClockDateFormat,
};

interface FlipClockState extends CommonStyleState {
  timezone: string;
  format: FlipClockFormat;
  showSeconds: boolean;
  flipColor: string;
  textColor: string;
  gapColor: string;
  showDate: boolean;
  dateFmt: FlipClockDateFormat;
  setTimezone: (v: string) => void;
  setFormat: (v: FlipClockFormat) => void;
  setShowSeconds: (v: boolean) => void;
  setFlipColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setGapColor: (v: string) => void;
  setShowDate: (v: boolean) => void;
  setDateFmt: (v: FlipClockDateFormat) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useFlipClockStore = create<FlipClockState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTimezone: (v: string) => set({ timezone: v }),
    setFormat: (v: FlipClockFormat) => set({ format: v }),
    setShowSeconds: (v: boolean) => set({ showSeconds: v }),
    setFlipColor: (v: string) => set({ flipColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setGapColor: (v: string) => set({ gapColor: v }),
    setShowDate: (v: boolean) => set({ showDate: v }),
    setDateFmt: (v: FlipClockDateFormat) => set({ dateFmt: v }),
  })),
);
