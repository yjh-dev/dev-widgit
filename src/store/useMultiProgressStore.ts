import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { ProgressItem, BarHeight, ProgressLayout } from "@/lib/multi-progress";

const widgetDefaults = {
  items: [
    { label: "프론트엔드", value: 80, max: 100, color: "6366F1" },
    { label: "백엔드", value: 65, max: 100, color: "EC4899" },
    { label: "디자인", value: 90, max: 100, color: "22C55E" },
    { label: "DevOps", value: 45, max: 100, color: "F59E0B" },
  ] as ProgressItem[],
  showPercent: true,
  showValue: false,
  barHeight: "default" as BarHeight,
  layout: "stacked" as ProgressLayout,
  animated: false,
  textColor: "",
};

interface MultiProgressState extends CommonStyleState {
  items: ProgressItem[];
  showPercent: boolean;
  showValue: boolean;
  barHeight: BarHeight;
  layout: ProgressLayout;
  animated: boolean;
  textColor: string;

  setItems: (v: ProgressItem[]) => void;
  addItem: (item: ProgressItem) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: ProgressItem) => void;
  setShowPercent: (v: boolean) => void;
  setShowValue: (v: boolean) => void;
  setBarHeight: (v: BarHeight) => void;
  setLayout: (v: ProgressLayout) => void;
  setAnimated: (v: boolean) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMultiProgressStore = create<MultiProgressState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setItems: (v: ProgressItem[]) => set({ items: v }),
    addItem: (item: ProgressItem) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: MultiProgressState) => ({ items: [...s.items, item] })),
    removeItem: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: MultiProgressState) => ({ items: s.items.filter((_: ProgressItem, i: number) => i !== index) })),
    updateItem: (index: number, item: ProgressItem) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: MultiProgressState) => ({
        items: s.items.map((prev: ProgressItem, i: number) => (i === index ? item : prev)),
      })),
    setShowPercent: (v: boolean) => set({ showPercent: v }),
    setShowValue: (v: boolean) => set({ showValue: v }),
    setBarHeight: (v: BarHeight) => set({ barHeight: v }),
    setLayout: (v: ProgressLayout) => set({ layout: v }),
    setAnimated: (v: boolean) => set({ animated: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
