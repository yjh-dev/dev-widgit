import { create } from "zustand";
import type { DiceMode, DiceSides } from "@/lib/dice";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  mode: "dice" as DiceMode,
  count: 1,
  sides: 6 as DiceSides,
  color: "2563EB",
  textColor: "FFFFFF",
  items: [] as string[],
  showTotal: true,
  history: false,
};

interface DiceState extends CommonStyleState {
  mode: DiceMode;
  count: number;
  sides: DiceSides;
  color: string;
  textColor: string;
  items: string[];
  showTotal: boolean;
  history: boolean;
  setMode: (v: DiceMode) => void;
  setCount: (v: number) => void;
  setSides: (v: DiceSides) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setItems: (v: string[]) => void;
  setShowTotal: (v: boolean) => void;
  setHistory: (v: boolean) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useDiceStore = create<DiceState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setMode: (v: DiceMode) => set({ mode: v }),
    setCount: (v: number) => set({ count: v }),
    setSides: (v: DiceSides) => set({ sides: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setItems: (v: string[]) => set({ items: v }),
    setShowTotal: (v: boolean) => set({ showTotal: v }),
    setHistory: (v: boolean) => set({ history: v }),
  })),
);
