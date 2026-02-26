import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

export type CellShape = "square" | "round";
export type CellSize = "sm" | "md" | "lg";

interface LifeCalendarState {
  birthdate: string;
  lifespan: number;
  color: string;
  bg: string;
  transparentBg: boolean;
  showStats: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  shape: CellShape;
  cellSize: CellSize;
  futureColor: string;
  showYears: boolean;
  nowColor: string;

  setBirthdate: (birthdate: string) => void;
  setLifespan: (lifespan: number) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setShowStats: (showStats: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setShape: (shape: CellShape) => void;
  setCellSize: (cellSize: CellSize) => void;
  setFutureColor: (futureColor: string) => void;
  setShowYears: (showYears: boolean) => void;
  setNowColor: (nowColor: string) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  birthdate: "",
  lifespan: 80,
  color: "2563EB",
  bg: "FFFFFF",
  transparentBg: false,
  showStats: true,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  shape: "square" as CellShape,
  cellSize: "sm" as CellSize,
  futureColor: "",
  showYears: false,
  nowColor: "",
};

export const useLifeCalendarStore = create<LifeCalendarState>((set) => ({
  ...initialState,

  setBirthdate: (birthdate) => set({ birthdate }),
  setLifespan: (lifespan) => set({ lifespan }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setShowStats: (showStats) => set({ showStats }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setShape: (shape) => set({ shape }),
  setCellSize: (cellSize) => set({ cellSize }),
  setFutureColor: (futureColor) => set({ futureColor }),
  setShowYears: (showYears) => set({ showYears }),
  setNowColor: (nowColor) => set({ nowColor }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
