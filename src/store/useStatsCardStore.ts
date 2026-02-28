import { create } from "zustand";
import type { StatItem } from "@/lib/stats-card";
import type { FontSizeKey } from "@/lib/common-widget-options";

type LayoutType = "row" | "grid";

interface StatsCardState {
  stats: StatItem[];
  layout: LayoutType;
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setStats: (v: StatItem[]) => void;
  setLayout: (v: LayoutType) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  stats: [] as StatItem[],
  layout: "row" as LayoutType,
  accentColor: "2563EB",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useStatsCardStore = create<StatsCardState>((set) => ({
  ...initialState,

  setStats: (stats) => set({ stats }),
  setLayout: (layout) => set({ layout }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
