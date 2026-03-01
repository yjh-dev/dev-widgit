import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { TimetableEntry } from "@/lib/timetable";

const widgetDefaults = {
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
};

interface TimetableState extends CommonStyleState {
  entries: TimetableEntry[];
  startHour: number;
  endHour: number;
  lang: "ko" | "en";
  showGrid: boolean;
  color: string;

  setEntries: (v: TimetableEntry[]) => void;
  addEntry: (e: TimetableEntry) => void;
  removeEntry: (index: number) => void;
  setStartHour: (v: number) => void;
  setEndHour: (v: number) => void;
  setLang: (v: "ko" | "en") => void;
  setShowGrid: (v: boolean) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTimetableStore = create<TimetableState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setEntries: (v: TimetableEntry[]) => set({ entries: v }),
    addEntry: (e: TimetableEntry) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: TimetableState) => ({ entries: [...s.entries, e] })),
    removeEntry: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: TimetableState) => ({ entries: s.entries.filter((_: TimetableEntry, i: number) => i !== index) })),
    setStartHour: (v: number) => set({ startHour: v }),
    setEndHour: (v: number) => set({ endHour: v }),
    setLang: (v: "ko" | "en") => set({ lang: v }),
    setShowGrid: (v: boolean) => set({ showGrid: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
