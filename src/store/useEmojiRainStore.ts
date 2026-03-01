import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { SpeedKey, DensityKey } from "@/lib/emoji-rain";

const widgetDefaults = {
  emojis: "🎉🎊✨💖🌟",
  speed: "normal" as SpeedKey,
  density: "normal" as DensityKey,
  minSize: 16,
  maxSize: 32,
  // Non-default common style overrides
  transparentBg: true,
};

interface EmojiRainState extends CommonStyleState {
  emojis: string;
  speed: SpeedKey;
  density: DensityKey;
  minSize: number;
  maxSize: number;

  setEmojis: (v: string) => void;
  setSpeed: (v: SpeedKey) => void;
  setDensity: (v: DensityKey) => void;
  setMinSize: (v: number) => void;
  setMaxSize: (v: number) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useEmojiRainStore = create<EmojiRainState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setEmojis: (v: string) => set({ emojis: v }),
    setSpeed: (v: SpeedKey) => set({ speed: v }),
    setDensity: (v: DensityKey) => set({ density: v }),
    setMinSize: (v: number) => set({ minSize: v }),
    setMaxSize: (v: number) => set({ maxSize: v }),
  })),
);
