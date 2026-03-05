import { create } from "zustand";
import type { GpaStyle, GpaScale } from "@/lib/gpa-calculator";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  current: 3.5,
  max: 4.5,
  target: 4.5,
  scale: "4.5" as GpaScale,
  style: "ring" as GpaStyle,
  color: "6366F1",
  textColor: "",
  font: "sans",
};

interface GpaCalculatorState extends CommonStyleState {
  current: number;
  max: number;
  target: number;
  scale: GpaScale;
  style: GpaStyle;
  color: string;
  textColor: string;
  font: string;
  setCurrent: (v: number) => void;
  setMax: (v: number) => void;
  setTarget: (v: number) => void;
  setScale: (v: GpaScale) => void;
  setStyle: (v: GpaStyle) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useGpaCalculatorStore = create<GpaCalculatorState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setCurrent: (v: number) => set({ current: v }),
    setMax: (v: number) => set({ max: v }),
    setTarget: (v: number) => set({ target: v }),
    setScale: (v: GpaScale) => set({ scale: v }),
    setStyle: (v: GpaStyle) => set({ style: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
