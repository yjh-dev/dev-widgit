import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { PieSlice, PieChartStyle } from "@/lib/pie-chart";

const widgetDefaults = {
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
};

interface PieChartState extends CommonStyleState {
  slices: PieSlice[];
  style: PieChartStyle;
  showLabels: boolean;
  showPercent: boolean;
  showLegend: boolean;
  innerRadius: number;
  textColor: string;

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
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const usePieChartStore = create<PieChartState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setSlices: (v: PieSlice[]) => set({ slices: v }),
    updateSlice: (index: number, slice: PieSlice) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: PieChartState) => ({
        slices: s.slices.map((sl: PieSlice, i: number) => (i === index ? slice : sl)),
      })),
    addSlice: (slice: PieSlice) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: PieChartState) => ({ slices: [...s.slices, slice] })),
    removeSlice: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: PieChartState) => ({ slices: s.slices.filter((_: PieSlice, i: number) => i !== index) })),
    setStyle: (v: PieChartStyle) => set({ style: v }),
    setShowLabels: (v: boolean) => set({ showLabels: v }),
    setShowPercent: (v: boolean) => set({ showPercent: v }),
    setShowLegend: (v: boolean) => set({ showLegend: v }),
    setInnerRadius: (v: number) => set({ innerRadius: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
