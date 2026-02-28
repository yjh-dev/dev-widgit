import { create } from "zustand";
import type { TimetableEntry } from "@/lib/timetable";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface TimetableState {
  entries: TimetableEntry[];
  startHour: number;
  endHour: number;
  lang: "ko" | "en";
  showGrid: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setEntries: (v: TimetableEntry[]) => void;
  addEntry: (e: TimetableEntry) => void;
  removeEntry: (index: number) => void;
  setStartHour: (v: number) => void;
  setEndHour: (v: number) => void;
  setLang: (v: "ko" | "en") => void;
  setShowGrid: (v: boolean) => void;
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
  entries: [
    { day: 0, hour: 9, duration: 1, title: "국어", color: "2563EB" },
    { day: 0, hour: 11, duration: 1, title: "수학", color: "E11D48" },
    { day: 1, hour: 10, duration: 2, title: "영어", color: "22C55E" },
    { day: 2, hour: 9, duration: 1, title: "과학", color: "F59E0B" },
    { day: 3, hour: 13, duration: 2, title: "체육", color: "7C3AED" },
    { day: 4, hour: 10, duration: 1, title: "음악", color: "EC4899" },
  ] as TimetableEntry[],
  startHour: 9,
  endHour: 17,
  lang: "ko" as "ko" | "en",
  showGrid: true,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useTimetableStore = create<TimetableState>((set) => ({
  ...initialState,

  setEntries: (entries) => set({ entries }),
  addEntry: (e) =>
    set((s) => ({ entries: [...s.entries, e] })),
  removeEntry: (index) =>
    set((s) => ({ entries: s.entries.filter((_, i) => i !== index) })),
  setStartHour: (startHour) => set({ startHour }),
  setEndHour: (endHour) => set({ endHour }),
  setLang: (lang) => set({ lang }),
  setShowGrid: (showGrid) => set({ showGrid }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
