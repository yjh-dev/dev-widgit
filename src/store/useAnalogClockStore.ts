import { create } from "zustand";
import type { NumberStyle } from "@/lib/analog-clock";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
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
};

interface AnalogClockState extends CommonStyleState {
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
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useAnalogClockStore = create<AnalogClockState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTimezone: (v: string) => set({ timezone: v }),
    setShowNumbers: (v: boolean) => set({ showNumbers: v }),
    setNumStyle: (v: NumberStyle) => set({ numStyle: v }),
    setShowSeconds: (v: boolean) => set({ showSeconds: v }),
    setShowTicks: (v: boolean) => set({ showTicks: v }),
    setShowBorder: (v: boolean) => set({ showBorder: v }),
    setHandColor: (v: string) => set({ handColor: v }),
    setSecHandColor: (v: string) => set({ secHandColor: v }),
    setFaceColor: (v: string) => set({ faceColor: v }),
    setTickColor: (v: string) => set({ tickColor: v }),
    setBorderColor: (v: string) => set({ borderColor: v }),
  })),
);
