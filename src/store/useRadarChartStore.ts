import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { RadarItem } from "@/lib/radar-chart";

const widgetDefaults = {
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
};

interface RadarChartState extends CommonStyleState {
  items: RadarItem[];
  showValues: boolean;
  showGrid: boolean;
  gridLevels: number;
  fillOpacity: number;
  color: string;
  gridColor: string;
  textColor: string;

  setItems: (v: RadarItem[]) => void;
  setShowValues: (v: boolean) => void;
  setShowGrid: (v: boolean) => void;
  setGridLevels: (v: number) => void;
  setFillOpacity: (v: number) => void;
  setColor: (v: string) => void;
  setGridColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useRadarChartStore = create<RadarChartState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setItems: (v: RadarItem[]) => set({ items: v }),
    setShowValues: (v: boolean) => set({ showValues: v }),
    setShowGrid: (v: boolean) => set({ showGrid: v }),
    setGridLevels: (v: number) => set({ gridLevels: v }),
    setFillOpacity: (v: number) => set({ fillOpacity: v }),
    setColor: (v: string) => set({ color: v }),
    setGridColor: (v: string) => set({ gridColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
