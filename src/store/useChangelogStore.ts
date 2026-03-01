import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { ChangelogEntry } from "@/lib/changelog";

const widgetDefaults = {
  entries: [
    { version: "v2.0", date: "2026-02-15", desc: "다크 모드 지원 추가" },
    { version: "v1.5", date: "2026-01-20", desc: "성능 최적화 및 버그 수정" },
    { version: "v1.0", date: "2025-12-01", desc: "첫 번째 정식 출시" },
  ] as ChangelogEntry[],
  showDate: true,
  showVersion: true,
  accentColor: "6366F1",
  textColor: "",
};

interface ChangelogState extends CommonStyleState {
  entries: ChangelogEntry[];
  showDate: boolean;
  showVersion: boolean;
  accentColor: string;
  textColor: string;

  setEntries: (v: ChangelogEntry[]) => void;
  addEntry: (e: ChangelogEntry) => void;
  removeEntry: (index: number) => void;
  setShowDate: (v: boolean) => void;
  setShowVersion: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useChangelogStore = create<ChangelogState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setEntries: (v: ChangelogEntry[]) => set({ entries: v }),
    addEntry: (e: ChangelogEntry) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: ChangelogState) => ({ entries: [...s.entries, e] })),
    removeEntry: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: ChangelogState) => ({ entries: s.entries.filter((_: ChangelogEntry, i: number) => i !== index) })),
    setShowDate: (v: boolean) => set({ showDate: v }),
    setShowVersion: (v: boolean) => set({ showVersion: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
