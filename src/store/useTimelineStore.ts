import { create } from "zustand";
import type { TimelineEvent } from "@/lib/timeline";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface TimelineState {
  events: TimelineEvent[];
  showPast: boolean;
  color: string;
  pastColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setEvents: (v: TimelineEvent[]) => void;
  addEvent: (e: TimelineEvent) => void;
  removeEvent: (index: number) => void;
  setShowPast: (v: boolean) => void;
  setColor: (v: string) => void;
  setPastColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  events: [
    { title: "기말고사", date: "2026-06-15" },
    { title: "여름방학", date: "2026-07-20" },
    { title: "수능", date: "2026-11-19" },
  ] as TimelineEvent[],
  showPast: false,
  color: "2563EB",
  pastColor: "999999",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useTimelineStore = create<TimelineState>((set) => ({
  ...initialState,

  setEvents: (events) => set({ events }),
  addEvent: (e) => set((s) => ({ events: [...s.events, e] })),
  removeEvent: (index) =>
    set((s) => ({ events: s.events.filter((_, i) => i !== index) })),
  setShowPast: (showPast) => set({ showPast }),
  setColor: (color) => set({ color }),
  setPastColor: (pastColor) => set({ pastColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
