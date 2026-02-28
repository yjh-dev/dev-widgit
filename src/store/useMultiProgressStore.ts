import { create } from "zustand";
import type { ProgressItem, BarHeight, ProgressLayout } from "@/lib/multi-progress";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface MultiProgressState {
  items: ProgressItem[];
  showPercent: boolean;
  showValue: boolean;
  barHeight: BarHeight;
  layout: ProgressLayout;
  animated: boolean;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

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
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
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
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useMultiProgressStore = create<MultiProgressState>((set) => ({
  ...initialState,

  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((s) => ({ items: [...s.items, item] })),
  removeItem: (index) =>
    set((s) => ({ items: s.items.filter((_, i) => i !== index) })),
  updateItem: (index, item) =>
    set((s) => ({
      items: s.items.map((prev, i) => (i === index ? item : prev)),
    })),
  setShowPercent: (showPercent) => set({ showPercent }),
  setShowValue: (showValue) => set({ showValue }),
  setBarHeight: (barHeight) => set({ barHeight }),
  setLayout: (layout) => set({ layout }),
  setAnimated: (animated) => set({ animated }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
