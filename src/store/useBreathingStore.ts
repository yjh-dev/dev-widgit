import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { BreathingTechnique } from "@/lib/breathing";

const widgetDefaults = {
  technique: "478" as BreathingTechnique,
  inhale: 4,
  hold1: 7,
  exhale: 8,
  hold2: 0,
  rounds: 3,
  showGuide: true,
  accentColor: "06B6D4",
  color: "1E1E1E",
};

interface BreathingState extends CommonStyleState {
  technique: BreathingTechnique;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  rounds: number;
  showGuide: boolean;
  accentColor: string;
  color: string;

  setTechnique: (v: BreathingTechnique) => void;
  setInhale: (v: number) => void;
  setHold1: (v: number) => void;
  setExhale: (v: number) => void;
  setHold2: (v: number) => void;
  setRounds: (v: number) => void;
  setShowGuide: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useBreathingStore = create<BreathingState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTechnique: (v: BreathingTechnique) => set({ technique: v }),
    setInhale: (v: number) => set({ inhale: v }),
    setHold1: (v: number) => set({ hold1: v }),
    setExhale: (v: number) => set({ exhale: v }),
    setHold2: (v: number) => set({ hold2: v }),
    setRounds: (v: number) => set({ rounds: v }),
    setShowGuide: (v: boolean) => set({ showGuide: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
