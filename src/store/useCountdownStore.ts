import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  minutes: 5,
  seconds: 0,
  showMs: false,
  autoRestart: false,
  accentColor: "E11D48",
  color: "1E1E1E",
};

interface CountdownState extends CommonStyleState {
  minutes: number;
  seconds: number;
  showMs: boolean;
  autoRestart: boolean;
  accentColor: string;
  color: string;

  setMinutes: (v: number) => void;
  setSeconds: (v: number) => void;
  setShowMs: (v: boolean) => void;
  setAutoRestart: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useCountdownStore = create<CountdownState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setMinutes: (v: number) => set({ minutes: v }),
    setSeconds: (v: number) => set({ seconds: v }),
    setShowMs: (v: boolean) => set({ showMs: v }),
    setAutoRestart: (v: boolean) => set({ autoRestart: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
