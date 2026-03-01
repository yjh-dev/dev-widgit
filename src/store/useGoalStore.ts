import { create } from "zustand";
import type { GoalStyle } from "@/lib/goal";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  current: 0,
  target: 100,
  unit: "",
  style: "bar" as GoalStyle,
  showValue: true,
  color: "2563EB",
  textColor: "",
  font: "sans",
};

interface GoalState extends CommonStyleState {
  title: string;
  current: number;
  target: number;
  unit: string;
  style: GoalStyle;
  showValue: boolean;
  color: string;
  textColor: string;
  font: string;
  setTitle: (v: string) => void;
  setCurrent: (v: number) => void;
  setTarget: (v: number) => void;
  setUnit: (v: string) => void;
  setStyle: (v: GoalStyle) => void;
  setShowValue: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useGoalStore = create<GoalState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setCurrent: (v: number) => set({ current: v }),
    setTarget: (v: number) => set({ target: v }),
    setUnit: (v: string) => set({ unit: v }),
    setStyle: (v: GoalStyle) => set({ style: v }),
    setShowValue: (v: boolean) => set({ showValue: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
