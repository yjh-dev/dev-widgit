import { create } from "zustand";
import type { DualClockFormat } from "@/lib/dual-clock";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  tz1: "Asia/Seoul",
  tz2: "America/New_York",
  label1: "서울",
  label2: "뉴욕",
  format: "24h" as DualClockFormat,
  color: "1E1E1E",
  textColor: "",
  font: "mono",
};

interface DualClockState extends CommonStyleState {
  tz1: string;
  tz2: string;
  label1: string;
  label2: string;
  format: DualClockFormat;
  color: string;
  textColor: string;
  font: string;
  setTz1: (v: string) => void;
  setTz2: (v: string) => void;
  setLabel1: (v: string) => void;
  setLabel2: (v: string) => void;
  setFormat: (v: DualClockFormat) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useDualClockStore = create<DualClockState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTz1: (v: string) => set({ tz1: v }),
    setTz2: (v: string) => set({ tz2: v }),
    setLabel1: (v: string) => set({ label1: v }),
    setLabel2: (v: string) => set({ label2: v }),
    setFormat: (v: DualClockFormat) => set({ format: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
