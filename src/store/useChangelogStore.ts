import { create } from "zustand";
import type { ChangelogEntry } from "@/lib/changelog";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface ChangelogState {
  entries: ChangelogEntry[];
  showDate: boolean;
  showVersion: boolean;
  accentColor: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setEntries: (v: ChangelogEntry[]) => void;
  addEntry: (e: ChangelogEntry) => void;
  removeEntry: (index: number) => void;
  setShowDate: (v: boolean) => void;
  setShowVersion: (v: boolean) => void;
  setAccentColor: (v: string) => void;
  setTextColor: (v: string) => void;
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
    { version: "v2.0", date: "2026-02-15", desc: "다크 모드 지원 추가" },
    { version: "v1.5", date: "2026-01-20", desc: "성능 최적화 및 버그 수정" },
    { version: "v1.0", date: "2025-12-01", desc: "첫 번째 정식 출시" },
  ] as ChangelogEntry[],
  showDate: true,
  showVersion: true,
  accentColor: "6366F1",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useChangelogStore = create<ChangelogState>((set) => ({
  ...initialState,

  setEntries: (entries) => set({ entries }),
  addEntry: (e) => set((s) => ({ entries: [...s.entries, e] })),
  removeEntry: (index) =>
    set((s) => ({ entries: s.entries.filter((_, i) => i !== index) })),
  setShowDate: (showDate) => set({ showDate }),
  setShowVersion: (showVersion) => set({ showVersion }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
