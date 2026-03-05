import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  date: "",
  showSeconds: true,
  color: "2563EB",
  textColor: "",
  font: "sans",
};

interface CountupState extends CommonStyleState {
  title: string;
  date: string;
  showSeconds: boolean;
  color: string;
  textColor: string;
  font: string;

  setTitle: (v: string) => void;
  setDate: (v: string) => void;
  setShowSeconds: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useCountupStore = create<CountupState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setDate: (v: string) => set({ date: v }),
    setShowSeconds: (v: boolean) => set({ showSeconds: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
