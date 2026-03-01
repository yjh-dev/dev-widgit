import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  label: "카운터",
  initial: 0,
  step: 1,
  min: "",
  max: "",
  showReset: true,
  color: "1E1E1E",
  btnColor: "2563EB",
  font: "sans",
};

interface CounterState extends CommonStyleState {
  label: string;
  initial: number;
  step: number;
  min: string;
  max: string;
  showReset: boolean;
  color: string;
  btnColor: string;
  font: string;
  setLabel: (v: string) => void;
  setInitial: (v: number) => void;
  setStep: (v: number) => void;
  setMin: (v: string) => void;
  setMax: (v: string) => void;
  setShowReset: (v: boolean) => void;
  setColor: (v: string) => void;
  setBtnColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setLabel: (v: string) => set({ label: v }),
    setInitial: (v: number) => set({ initial: v }),
    setStep: (v: number) => set({ step: v }),
    setMin: (v: string) => set({ min: v }),
    setMax: (v: string) => set({ max: v }),
    setShowReset: (v: boolean) => set({ showReset: v }),
    setColor: (v: string) => set({ color: v }),
    setBtnColor: (v: string) => set({ btnColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
