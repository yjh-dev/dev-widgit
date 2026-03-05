import { create } from "zustand";
import type { SavingsStyle } from "@/lib/savings-goal";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  current: 0,
  target: 1000000,
  currency: "₩",
  style: "bar" as SavingsStyle,
  showValue: true,
  color: "22C55E",
  textColor: "",
  font: "sans",
};

interface SavingsGoalState extends CommonStyleState {
  title: string;
  current: number;
  target: number;
  currency: string;
  style: SavingsStyle;
  showValue: boolean;
  color: string;
  textColor: string;
  font: string;
  setTitle: (v: string) => void;
  setCurrent: (v: number) => void;
  setTarget: (v: number) => void;
  setCurrency: (v: string) => void;
  setStyle: (v: SavingsStyle) => void;
  setShowValue: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useSavingsGoalStore = create<SavingsGoalState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setCurrent: (v: number) => set({ current: v }),
    setTarget: (v: number) => set({ target: v }),
    setCurrency: (v: string) => set({ currency: v }),
    setStyle: (v: SavingsStyle) => set({ style: v }),
    setShowValue: (v: boolean) => set({ showValue: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
