import { create } from "zustand";
import type { NoiseType } from "@/lib/noise-bg";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  type: "gradient-flow" as NoiseType,
  color1: "6366F1",
  color2: "EC4899",
  speed: 1,
  noiseOpacity: 100,
  font: "sans",
};

interface NoiseBgState extends CommonStyleState {
  type: NoiseType;
  color1: string;
  color2: string;
  speed: number;
  noiseOpacity: number;
  font: string;
  setType: (v: NoiseType) => void;
  setColor1: (v: string) => void;
  setColor2: (v: string) => void;
  setSpeed: (v: number) => void;
  setNoiseOpacity: (v: number) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useNoiseBgStore = create<NoiseBgState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setType: (v: NoiseType) => set({ type: v }),
    setColor1: (v: string) => set({ color1: v }),
    setColor2: (v: string) => set({ color2: v }),
    setSpeed: (v: number) => set({ speed: v }),
    setNoiseOpacity: (v: number) => set({ noiseOpacity: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
