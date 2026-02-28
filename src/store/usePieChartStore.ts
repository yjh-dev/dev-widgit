import { create } from "zustand";
import type { PieSlice, PieChartStyle } from "@/lib/pie-chart";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface PieChartState {
  slices: PieSlice[];
  style: PieChartStyle;
  showLabels: boolean;
  showPercent: boolean;
  showLegend: boolean;
  innerRadius: number;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setSlices: (v: PieSlice[]) => void;
  updateSlice: (index: number, slice: PieSlice) => void;
  addSlice: (slice: PieSlice) => void;
  removeSlice: (index: number) => void;
  setStyle: (v: PieChartStyle) => void;
  setShowLabels: (v: boolean) => void;
  setShowPercent: (v: boolean) => void;
  setShowLegend: (v: boolean) => void;
  setInnerRadius: (v: number) => void;
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
  slices: [
    { label: "카테고리 A", value: 40, color: "6366F1" },
    { label: "카테고리 B", value: 30, color: "EC4899" },
    { label: "카테고리 C", value: 20, color: "F59E0B" },
    { label: "카테고리 D", value: 10, color: "22C55E" },
  ] as PieSlice[],
  style: "donut" as PieChartStyle,
  showLabels: true,
  showPercent: true,
  showLegend: true,
  innerRadius: 60,
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const usePieChartStore = create<PieChartState>((set) => ({
  ...initialState,

  setSlices: (slices) => set({ slices }),
  updateSlice: (index, slice) =>
    set((s) => ({
      slices: s.slices.map((sl, i) => (i === index ? slice : sl)),
    })),
  addSlice: (slice) => set((s) => ({ slices: [...s.slices, slice] })),
  removeSlice: (index) =>
    set((s) => ({ slices: s.slices.filter((_, i) => i !== index) })),
  setStyle: (style) => set({ style }),
  setShowLabels: (showLabels) => set({ showLabels }),
  setShowPercent: (showPercent) => set({ showPercent }),
  setShowLegend: (showLegend) => set({ showLegend }),
  setInnerRadius: (innerRadius) => set({ innerRadius }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
