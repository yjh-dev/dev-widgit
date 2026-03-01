import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { PaletteLayout } from "@/lib/color-palette";

const widgetDefaults = {
  colors: ["2563EB", "7C3AED", "EC4899", "F59E0B"],
  layout: "horizontal" as PaletteLayout,
  showHex: true,
  showName: false,
  color: "1E1E1E",
};

interface ColorPaletteState extends CommonStyleState {
  colors: string[];
  layout: PaletteLayout;
  showHex: boolean;
  showName: boolean;
  color: string;

  setColors: (v: string[]) => void;
  setLayout: (v: PaletteLayout) => void;
  setShowHex: (v: boolean) => void;
  setShowName: (v: boolean) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useColorPaletteStore = create<ColorPaletteState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setColors: (v: string[]) => set({ colors: v }),
    setLayout: (v: PaletteLayout) => set({ layout: v }),
    setShowHex: (v: boolean) => set({ showHex: v }),
    setShowName: (v: boolean) => set({ showName: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
