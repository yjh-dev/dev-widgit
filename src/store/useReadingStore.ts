import { create } from "zustand";
import type { ReadingStyle } from "@/lib/reading";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  currentPage: 0,
  totalPages: 300,
  style: "bar" as ReadingStyle,
  showPages: true,
  color: "2563EB",
  textColor: "",
};

interface ReadingState extends CommonStyleState {
  title: string;
  currentPage: number;
  totalPages: number;
  style: ReadingStyle;
  showPages: boolean;
  color: string;
  textColor: string;
  setTitle: (v: string) => void;
  setCurrentPage: (v: number) => void;
  setTotalPages: (v: number) => void;
  setStyle: (v: ReadingStyle) => void;
  setShowPages: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useReadingStore = create<ReadingState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setCurrentPage: (v: number) => set({ currentPage: v }),
    setTotalPages: (v: number) => set({ totalPages: v }),
    setStyle: (v: ReadingStyle) => set({ style: v }),
    setShowPages: (v: boolean) => set({ showPages: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
