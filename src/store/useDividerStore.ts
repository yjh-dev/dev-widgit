import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { DividerStyle, DividerWeight } from "@/lib/divider";

const widgetDefaults = {
  style: "solid" as DividerStyle,
  weight: "medium" as DividerWeight,
  color: "D4D4D8",
  color2: "A1A1AA",
  text: "",
  // Non-default common style overrides
  transparentBg: true,
  padding: 8,
};

interface DividerState extends CommonStyleState {
  style: DividerStyle;
  weight: DividerWeight;
  color: string;
  color2: string;
  text: string;

  setStyle: (v: DividerStyle) => void;
  setWeight: (v: DividerWeight) => void;
  setColor: (v: string) => void;
  setColor2: (v: string) => void;
  setText: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useDividerStore = create<DividerState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setStyle: (v: DividerStyle) => set({ style: v }),
    setWeight: (v: DividerWeight) => set({ weight: v }),
    setColor: (v: string) => set({ color: v }),
    setColor2: (v: string) => set({ color2: v }),
    setText: (v: string) => set({ text: v }),
  })),
);
