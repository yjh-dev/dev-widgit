import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { RoutineStep } from "@/lib/routine-timer";

const widgetDefaults = {
  steps: [
    { name: "스트레칭", minutes: 5 },
    { name: "명상", minutes: 10 },
    { name: "독서", minutes: 20 },
  ] as RoutineStep[],
  autoNext: true,
  color: "2563EB",
  textColor: "",
  font: "sans",
};

interface RoutineTimerState extends CommonStyleState {
  steps: RoutineStep[];
  autoNext: boolean;
  color: string;
  textColor: string;
  font: string;
  setSteps: (v: RoutineStep[]) => void;
  setAutoNext: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useRoutineTimerStore = create<RoutineTimerState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setSteps: (v: RoutineStep[]) => set({ steps: v }),
    setAutoNext: (v: boolean) => set({ autoNext: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
