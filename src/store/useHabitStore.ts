import { create } from "zustand";
import type { HabitView } from "@/lib/habit";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  view: "week" as HabitView,
  weekStart: "mon" as "sun" | "mon",
  color: "22C55E",
  textColor: "",
};

interface HabitState extends CommonStyleState {
  title: string;
  view: HabitView;
  weekStart: "sun" | "mon";
  color: string;
  textColor: string;
  setTitle: (v: string) => void;
  setView: (v: HabitView) => void;
  setWeekStart: (v: "sun" | "mon") => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useHabitStore = create<HabitState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setView: (v: HabitView) => set({ view: v }),
    setWeekStart: (v: "sun" | "mon") => set({ weekStart: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
