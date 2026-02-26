import { create } from "zustand";
import type { HabitView } from "@/lib/habit";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface HabitState {
  title: string;
  view: HabitView;
  weekStart: "sun" | "mon";
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTitle: (v: string) => void;
  setView: (v: HabitView) => void;
  setWeekStart: (v: "sun" | "mon") => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  view: "week" as HabitView,
  weekStart: "mon" as "sun" | "mon",
  color: "22C55E",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useHabitStore = create<HabitState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setView: (view) => set({ view }),
  setWeekStart: (weekStart) => set({ weekStart }),
  setColor: (color) => set({ color }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  reset: () => set(initialState),
}));
