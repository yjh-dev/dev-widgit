import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  memos: "회의 준비|장보기|운동",
  cols: 3,
  noteColor: "FBBF24",
  textColor: "1E1E1E",
  font: "sans",
};

interface MemoBoardState extends CommonStyleState {
  memos: string;
  cols: number;
  noteColor: string;
  textColor: string;
  font: string;
  setMemos: (v: string) => void;
  setCols: (v: number) => void;
  setNoteColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMemoBoardStore = create<MemoBoardState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setMemos: (v: string) => set({ memos: v }),
    setCols: (v: number) => set({ cols: v }),
    setNoteColor: (v: string) => set({ noteColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
