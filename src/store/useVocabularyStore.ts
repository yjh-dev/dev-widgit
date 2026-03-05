import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { VocabWord, VocabMode } from "@/lib/vocabulary";

const widgetDefaults = {
  words: [] as VocabWord[],
  mode: "daily" as VocabMode,
  color: "7C3AED",
  textColor: "",
  font: "sans",
};

interface VocabularyState extends CommonStyleState {
  words: VocabWord[];
  mode: VocabMode;
  color: string;
  textColor: string;
  font: string;
  setWords: (v: VocabWord[]) => void;
  setMode: (v: VocabMode) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useVocabularyStore = create<VocabularyState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setWords: (v: VocabWord[]) => set({ words: v }),
    setMode: (v: VocabMode) => set({ mode: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
