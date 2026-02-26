import { create } from "zustand";
import type { WeekStartDay, HeaderFormat, DayNameLang } from "@/lib/mini-calendar";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface MiniCalendarState {
  weekStart: WeekStartDay;
  header: HeaderFormat;
  showDayNames: boolean;
  lang: DayNameLang;
  showOtherDays: boolean;
  showNav: boolean;
  highlight: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setWeekStart: (v: WeekStartDay) => void;
  setHeader: (v: HeaderFormat) => void;
  setShowDayNames: (v: boolean) => void;
  setLang: (v: DayNameLang) => void;
  setShowOtherDays: (v: boolean) => void;
  setShowNav: (v: boolean) => void;
  setHighlight: (v: string) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  reset: () => void;
}

const initialState = {
  weekStart: "mon" as WeekStartDay,
  header: "full" as HeaderFormat,
  showDayNames: true,
  lang: "ko" as DayNameLang,
  showOtherDays: true,
  showNav: true,
  highlight: "2563EB",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useMiniCalendarStore = create<MiniCalendarState>((set) => ({
  ...initialState,

  setWeekStart: (weekStart) => set({ weekStart }),
  setHeader: (header) => set({ header }),
  setShowDayNames: (showDayNames) => set({ showDayNames }),
  setLang: (lang) => set({ lang }),
  setShowOtherDays: (showOtherDays) => set({ showOtherDays }),
  setShowNav: (showNav) => set({ showNav }),
  setHighlight: (highlight) => set({ highlight }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  reset: () => set(initialState),
}));
