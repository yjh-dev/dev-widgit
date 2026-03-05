import { create } from "zustand";
import type { AsciiFont } from "@/lib/ascii-art";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  text: "HELLO",
  font: "standard" as AsciiFont,
  color: "22C55E",
  textColor: "",
  bg: "0F172A",
};

interface AsciiArtState extends CommonStyleState {
  text: string;
  font: AsciiFont;
  color: string;
  textColor: string;
  setText: (v: string) => void;
  setFont: (v: AsciiFont) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useAsciiArtStore = create<AsciiArtState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setText: (v: string) => set({ text: v }),
    setFont: (v: AsciiFont) => set({ font: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
