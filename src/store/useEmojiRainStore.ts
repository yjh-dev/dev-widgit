import { create } from "zustand";
import type { SpeedKey, DensityKey } from "@/lib/emoji-rain";

interface EmojiRainState {
  emojis: string;
  speed: SpeedKey;
  density: DensityKey;
  minSize: number;
  maxSize: number;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;

  setEmojis: (v: string) => void;
  setSpeed: (v: SpeedKey) => void;
  setDensity: (v: DensityKey) => void;
  setMinSize: (v: number) => void;
  setMaxSize: (v: number) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  emojis: "🎉🎊✨💖🌟",
  speed: "normal" as SpeedKey,
  density: "normal" as DensityKey,
  minSize: 16,
  maxSize: 32,
  bg: "FFFFFF",
  transparentBg: true,
  borderRadius: 16,
  padding: 24,
};

export const useEmojiRainStore = create<EmojiRainState>((set) => ({
  ...initialState,

  setEmojis: (emojis) => set({ emojis }),
  setSpeed: (speed) => set({ speed }),
  setDensity: (density) => set({ density }),
  setMinSize: (minSize) => set({ minSize }),
  setMaxSize: (maxSize) => set({ maxSize }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
