import { create } from "zustand";
import type { FontKey } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";

type CalcType = "down" | "up";
type LayoutType = "default" | "progress";

type DdayDateFormat = "full" | "short" | "dot" | "none";

interface DdayWidgetState {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  isDarkMode: boolean;
  calcType: CalcType;
  isAnnual: boolean;
  layout: LayoutType;
  startDate: string;
  isTransparent: boolean;
  font: FontKey;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  showTime: boolean;
  blink: boolean;
  doneMsg: string;
  barColor: string;
  dateFmt: DdayDateFormat;

  setTitle: (title: string) => void;
  setTargetDate: (date: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setCalcType: (calcType: CalcType) => void;
  setIsAnnual: (isAnnual: boolean) => void;
  setLayout: (layout: LayoutType) => void;
  setStartDate: (date: string) => void;
  setIsTransparent: (isTransparent: boolean) => void;
  setFont: (font: FontKey) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setShowTime: (showTime: boolean) => void;
  setBlink: (blink: boolean) => void;
  setDoneMsg: (doneMsg: string) => void;
  setBarColor: (barColor: string) => void;
  setDateFmt: (dateFmt: DdayDateFormat) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  title: "D-Day",
  targetDate: "",
  bgColor: "1E1E1E",
  textColor: "FFFFFF",
  isDarkMode: true,
  calcType: "down" as CalcType,
  isAnnual: false,
  layout: "default" as LayoutType,
  startDate: "",
  isTransparent: false,
  font: "noto-sans-kr" as FontKey,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  showTime: false,
  blink: true,
  doneMsg: "",
  barColor: "",
  dateFmt: "full" as DdayDateFormat,
};

export const useDdayWidgetStore = create<DdayWidgetState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setTargetDate: (date) => set({ targetDate: date }),
  setBgColor: (color) => set({ bgColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setIsDarkMode: (isDark) =>
    set({
      isDarkMode: isDark,
      bgColor: isDark ? "1E1E1E" : "FFFFFF",
      textColor: isDark ? "FFFFFF" : "1E1E1E",
    }),
  setCalcType: (calcType) => set({ calcType }),
  setIsAnnual: (isAnnual) => set({ isAnnual }),
  setLayout: (layout) => set({ layout }),
  setStartDate: (date) => set({ startDate: date }),
  setIsTransparent: (isTransparent) => set({ isTransparent }),
  setFont: (font) => set({ font }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setShowTime: (showTime) => set({ showTime }),
  setBlink: (blink) => set({ blink }),
  setDoneMsg: (doneMsg) => set({ doneMsg }),
  setBarColor: (barColor) => set({ barColor }),
  setDateFmt: (dateFmt) => set({ dateFmt }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
