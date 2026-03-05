import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  question: "",
  options: "" as string,
  showPercent: true,
  color: "2563EB",
  textColor: "",
  font: "sans",
};

interface PollState extends CommonStyleState {
  question: string;
  options: string;
  showPercent: boolean;
  color: string;
  textColor: string;
  font: string;
  setQuestion: (v: string) => void;
  setOptions: (v: string) => void;
  setShowPercent: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const usePollStore = create<PollState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setQuestion: (v: string) => set({ question: v }),
    setOptions: (v: string) => set({ options: v }),
    setShowPercent: (v: boolean) => set({ showPercent: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
