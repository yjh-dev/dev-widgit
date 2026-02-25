import { create } from "zustand";

interface DdayWidgetState {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  isDarkMode: boolean;

  setTitle: (title: string) => void;
  setTargetDate: (date: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setIsDarkMode: (isDark: boolean) => void;
  reset: () => void;
}

const initialState = {
  title: "D-Day",
  targetDate: "",
  bgColor: "1E1E1E",
  textColor: "FFFFFF",
  isDarkMode: true,
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
  reset: () => set(initialState),
}));
