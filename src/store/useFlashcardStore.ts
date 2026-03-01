import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { FlashCard } from "@/lib/flashcard";

const widgetDefaults = {
  cards: [] as FlashCard[],
  showCount: true,
  autoFlip: false,
  accentColor: "7C3AED",
  color: "1E1E1E",
};

interface FlashcardState extends CommonStyleState {
  cards: FlashCard[];
  showCount: boolean;
  autoFlip: boolean;
  accentColor: string;
  color: string;

  setCards: (v: FlashCard[]) => void;
  setShowCount: (v: boolean) => void;
  setAutoFlip: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useFlashcardStore = create<FlashcardState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setCards: (v: FlashCard[]) => set({ cards: v }),
    setShowCount: (v: boolean) => set({ showCount: v }),
    setAutoFlip: (v: boolean) => set({ autoFlip: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
