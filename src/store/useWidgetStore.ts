import { create } from "zustand";
import type { FontKey } from "@/lib/fonts";

type CalcType = "down" | "up";
type LayoutType = "default" | "progress";

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
  reset: () => set(initialState),
}));
