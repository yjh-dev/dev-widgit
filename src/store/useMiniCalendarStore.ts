import { create } from "zustand";
import type { WeekStartDay, HeaderFormat, DayNameLang } from "@/lib/mini-calendar";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  weekStart: "mon" as WeekStartDay,
  header: "full" as HeaderFormat,
  showDayNames: true,
  lang: "ko" as DayNameLang,
  showOtherDays: true,
  showNav: true,
  highlight: "2563EB",
  color: "1E1E1E",
};

interface MiniCalendarState extends CommonStyleState {
  weekStart: WeekStartDay;
  header: HeaderFormat;
  showDayNames: boolean;
  lang: DayNameLang;
  showOtherDays: boolean;
  showNav: boolean;
  highlight: string;
  color: string;
  setWeekStart: (v: WeekStartDay) => void;
  setHeader: (v: HeaderFormat) => void;
  setShowDayNames: (v: boolean) => void;
  setLang: (v: DayNameLang) => void;
  setShowOtherDays: (v: boolean) => void;
  setShowNav: (v: boolean) => void;
  setHighlight: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMiniCalendarStore = create<MiniCalendarState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setWeekStart: (v: WeekStartDay) => set({ weekStart: v }),
    setHeader: (v: HeaderFormat) => set({ header: v }),
    setShowDayNames: (v: boolean) => set({ showDayNames: v }),
    setLang: (v: DayNameLang) => set({ lang: v }),
    setShowOtherDays: (v: boolean) => set({ showOtherDays: v }),
    setShowNav: (v: boolean) => set({ showNav: v }),
    setHighlight: (v: string) => set({ highlight: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
