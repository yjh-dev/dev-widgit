import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

export type CellShape = "square" | "round";
export type CellSize = "sm" | "md" | "lg";

const widgetDefaults = {
  birthdate: "",
  lifespan: 80,
  color: "2563EB",
  showStats: true,
  shape: "square" as CellShape,
  cellSize: "sm" as CellSize,
  futureColor: "",
  showYears: false,
  nowColor: "",
};

interface LifeCalendarState extends CommonStyleState {
  birthdate: string;
  lifespan: number;
  color: string;
  showStats: boolean;
  shape: CellShape;
  cellSize: CellSize;
  futureColor: string;
  showYears: boolean;
  nowColor: string;
  setBirthdate: (v: string) => void;
  setLifespan: (v: number) => void;
  setColor: (v: string) => void;
  setShowStats: (v: boolean) => void;
  setShape: (v: CellShape) => void;
  setCellSize: (v: CellSize) => void;
  setFutureColor: (v: string) => void;
  setShowYears: (v: boolean) => void;
  setNowColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useLifeCalendarStore = create<LifeCalendarState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setBirthdate: (v: string) => set({ birthdate: v }),
    setLifespan: (v: number) => set({ lifespan: v }),
    setColor: (v: string) => set({ color: v }),
    setShowStats: (v: boolean) => set({ showStats: v }),
    setShape: (v: CellShape) => set({ shape: v }),
    setCellSize: (v: CellSize) => set({ cellSize: v }),
    setFutureColor: (v: string) => set({ futureColor: v }),
    setShowYears: (v: boolean) => set({ showYears: v }),
    setNowColor: (v: string) => set({ nowColor: v }),
  })),
);
