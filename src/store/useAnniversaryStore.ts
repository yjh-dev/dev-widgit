import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  date: "",
  color: "E11D48",
  textColor: "FFFFFF",
  showDays: true,
  showWeeks: false,
  showMonths: false,
  font: "sans",
};

interface AnniversaryState extends CommonStyleState {
  title: string;
  date: string;
  color: string;
  textColor: string;
  showDays: boolean;
  showWeeks: boolean;
  showMonths: boolean;
  font: string;

  setTitle: (v: string) => void;
  setDate: (v: string) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setShowDays: (v: boolean) => void;
  setShowWeeks: (v: boolean) => void;
  setShowMonths: (v: boolean) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useAnniversaryStore = create<AnniversaryState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setDate: (v: string) => set({ date: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setShowDays: (v: boolean) => set({ showDays: v }),
    setShowWeeks: (v: boolean) => set({ showWeeks: v }),
    setShowMonths: (v: boolean) => set({ showMonths: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
