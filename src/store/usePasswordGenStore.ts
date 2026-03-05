import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  length: 16,
  upper: true,
  lower: true,
  numbers: true,
  symbols: false,
  color: "2563EB",
  textColor: "",
  font: "mono",
};

interface PasswordGenState extends CommonStyleState {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  color: string;
  textColor: string;
  font: string;
  setLength: (v: number) => void;
  setUpper: (v: boolean) => void;
  setLower: (v: boolean) => void;
  setNumbers: (v: boolean) => void;
  setSymbols: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const usePasswordGenStore = create<PasswordGenState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setLength: (v: number) => set({ length: v }),
    setUpper: (v: boolean) => set({ upper: v }),
    setLower: (v: boolean) => set({ lower: v }),
    setNumbers: (v: boolean) => set({ numbers: v }),
    setSymbols: (v: boolean) => set({ symbols: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
