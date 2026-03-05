import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  current: 0,
  target: 24,
  year: new Date().getFullYear().toString(),
  color: "F59E0B",
  textColor: "",
  font: "sans",
};

interface BookGoalState extends CommonStyleState {
  title: string;
  current: number;
  target: number;
  year: string;
  color: string;
  textColor: string;
  font: string;
  setTitle: (v: string) => void;
  setCurrent: (v: number) => void;
  setTarget: (v: number) => void;
  setYear: (v: string) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useBookGoalStore = create<BookGoalState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setCurrent: (v: number) => set({ current: v }),
    setTarget: (v: number) => set({ target: v }),
    setYear: (v: string) => set({ year: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
