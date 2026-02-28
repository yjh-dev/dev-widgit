import { create } from "zustand";
import type { FlashCard } from "@/lib/flashcard";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface FlashcardState {
  cards: FlashCard[];
  showCount: boolean;
  autoFlip: boolean;
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setCards: (v: FlashCard[]) => void;
  setShowCount: (v: boolean) => void;
  setAutoFlip: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  cards: [] as FlashCard[],
  showCount: true,
  autoFlip: false,
  accentColor: "7C3AED",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useFlashcardStore = create<FlashcardState>((set) => ({
  ...initialState,

  setCards: (cards) => set({ cards }),
  setShowCount: (showCount) => set({ showCount }),
  setAutoFlip: (autoFlip) => set({ autoFlip }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
