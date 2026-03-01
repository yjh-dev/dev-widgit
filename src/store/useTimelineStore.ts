import { create } from "zustand";
import type { TimelineEvent } from "@/lib/timeline";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  events: [
    { title: "기말고사", date: "2026-06-15" },
    { title: "여름방학", date: "2026-07-20" },
    { title: "수능", date: "2026-11-19" },
  ] as TimelineEvent[],
  showPast: false,
  color: "2563EB",
  pastColor: "999999",
};

interface TimelineState extends CommonStyleState {
  events: TimelineEvent[];
  showPast: boolean;
  color: string;
  pastColor: string;
  setEvents: (v: TimelineEvent[]) => void;
  addEvent: (e: TimelineEvent) => void;
  removeEvent: (index: number) => void;
  setShowPast: (v: boolean) => void;
  setColor: (v: string) => void;
  setPastColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTimelineStore = create<TimelineState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setEvents: (v: TimelineEvent[]) => set({ events: v }),
    addEvent: (e: TimelineEvent) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: TimelineState) => ({ events: [...s.events, e] })),
    removeEvent: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: TimelineState) => ({ events: s.events.filter((_: TimelineEvent, i: number) => i !== index) })),
    setShowPast: (v: boolean) => set({ showPast: v }),
    setColor: (v: string) => set({ color: v }),
    setPastColor: (v: string) => set({ pastColor: v }),
  })),
);
