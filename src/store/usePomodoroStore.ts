import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

export type PomodoroProgressStyle = "bar" | "ring";

const widgetDefaults = {
  workTime: 25,
  breakTime: 5,
  color: "E11D48",
  longBreak: 15,
  rounds: 4,
  showRounds: true,
  breakColor: "22C55E",
  autoStart: false,
  pStyle: "bar" as PomodoroProgressStyle,
};

interface PomodoroState extends CommonStyleState {
  workTime: number;
  breakTime: number;
  color: string;
  longBreak: number;
  rounds: number;
  showRounds: boolean;
  breakColor: string;
  autoStart: boolean;
  pStyle: PomodoroProgressStyle;
  setWorkTime: (v: number) => void;
  setBreakTime: (v: number) => void;
  setColor: (v: string) => void;
  setLongBreak: (v: number) => void;
  setRounds: (v: number) => void;
  setShowRounds: (v: boolean) => void;
  setBreakColor: (v: string) => void;
  setAutoStart: (v: boolean) => void;
  setPStyle: (v: PomodoroProgressStyle) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const usePomodoroStore = create<PomodoroState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setWorkTime: (v: number) => set({ workTime: v }),
    setBreakTime: (v: number) => set({ breakTime: v }),
    setColor: (v: string) => set({ color: v }),
    setLongBreak: (v: number) => set({ longBreak: v }),
    setRounds: (v: number) => set({ rounds: v }),
    setShowRounds: (v: boolean) => set({ showRounds: v }),
    setBreakColor: (v: string) => set({ breakColor: v }),
    setAutoStart: (v: boolean) => set({ autoStart: v }),
    setPStyle: (v: PomodoroProgressStyle) => set({ pStyle: v }),
  })),
);
