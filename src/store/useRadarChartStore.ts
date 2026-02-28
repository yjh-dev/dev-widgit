import { create } from "zustand";
import type { RadarItem } from "@/lib/radar-chart";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface RadarChartState {
  items: RadarItem[];
  showValues: boolean;
  showGrid: boolean;
  gridLevels: number;
  fillOpacity: number;
  color: string;
  gridColor: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setItems: (v: RadarItem[]) => void;
  setShowValues: (v: boolean) => void;
  setShowGrid: (v: boolean) => void;
  setGridLevels: (v: number) => void;
  setFillOpacity: (v: number) => void;
  setColor: (v: string) => void;
  setGridColor: (v: string) => void;
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
    { label: "코딩", value: 80 },
    { label: "디자인", value: 60 },
    { label: "기획", value: 70 },
    { label: "소통", value: 85 },
    { label: "리더십", value: 65 },
  ] as RadarItem[],
  showValues: false,
  showGrid: true,
  gridLevels: 4,
  fillOpacity: 30,
  color: "6366F1",
  gridColor: "E5E7EB",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useRadarChartStore = create<RadarChartState>((set) => ({
  ...initialState,

  setItems: (items) => set({ items }),
  setShowValues: (showValues) => set({ showValues }),
  setShowGrid: (showGrid) => set({ showGrid }),
  setGridLevels: (gridLevels) => set({ gridLevels }),
  setFillOpacity: (fillOpacity) => set({ fillOpacity }),
  setColor: (color) => set({ color }),
  setGridColor: (gridColor) => set({ gridColor }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
