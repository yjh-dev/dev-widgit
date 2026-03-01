import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { StatItem } from "@/lib/stats-card";

type LayoutType = "row" | "grid";

const widgetDefaults = {
  stats: [] as StatItem[],
  layout: "row" as LayoutType,
  accentColor: "2563EB",
  color: "1E1E1E",
};

interface StatsCardState extends CommonStyleState {
  stats: StatItem[];
  layout: LayoutType;
  accentColor: string;
  color: string;

  setStats: (v: StatItem[]) => void;
  setLayout: (v: LayoutType) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useStatsCardStore = create<StatsCardState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setStats: (v: StatItem[]) => set({ stats: v }),
    setLayout: (v: LayoutType) => set({ layout: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
