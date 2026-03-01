import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { AgeStyle } from "@/lib/age-calculator";

const widgetDefaults = {
  birthdate: "1995-01-01",
  showTime: true,
  showLabel: true,
  style: "full" as AgeStyle,
  color: "2563EB",
  textColor: "",
};

interface AgeCalculatorState extends CommonStyleState {
  birthdate: string;
  showTime: boolean;
  showLabel: boolean;
  style: AgeStyle;
  color: string;
  textColor: string;

  setBirthdate: (v: string) => void;
  setShowTime: (v: boolean) => void;
  setShowLabel: (v: boolean) => void;
  setStyle: (v: AgeStyle) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useAgeCalculatorStore = create<AgeCalculatorState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setBirthdate: (v: string) => set({ birthdate: v }),
    setShowTime: (v: boolean) => set({ showTime: v }),
    setShowLabel: (v: boolean) => set({ showLabel: v }),
    setStyle: (v: AgeStyle) => set({ style: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
