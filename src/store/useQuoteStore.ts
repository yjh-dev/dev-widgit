import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

export type TextAlign = "left" | "center" | "right";
export type LineHeight = "tight" | "normal" | "relaxed";

const widgetDefaults = {
  text: "",
  author: "",
  font: "serif",
  textColor: "1E1E1E",
  align: "center" as TextAlign,
  showMarks: true,
  italic: false,
  lineHeight: "relaxed" as LineHeight,
  authorColor: "",
  divider: false,
};

interface QuoteState extends CommonStyleState {
  text: string;
  author: string;
  font: string;
  textColor: string;
  align: TextAlign;
  showMarks: boolean;
  italic: boolean;
  lineHeight: LineHeight;
  authorColor: string;
  divider: boolean;
  setText: (v: string) => void;
  setAuthor: (v: string) => void;
  setFont: (v: string) => void;
  setTextColor: (v: string) => void;
  setAlign: (v: TextAlign) => void;
  setShowMarks: (v: boolean) => void;
  setItalic: (v: boolean) => void;
  setLineHeight: (v: LineHeight) => void;
  setAuthorColor: (v: string) => void;
  setDivider: (v: boolean) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useQuoteStore = create<QuoteState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setText: (v: string) => set({ text: v }),
    setAuthor: (v: string) => set({ author: v }),
    setFont: (v: string) => set({ font: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setAlign: (v: TextAlign) => set({ align: v }),
    setShowMarks: (v: boolean) => set({ showMarks: v }),
    setItalic: (v: boolean) => set({ italic: v }),
    setLineHeight: (v: LineHeight) => set({ lineHeight: v }),
    setAuthorColor: (v: string) => set({ authorColor: v }),
    setDivider: (v: boolean) => set({ divider: v }),
  })),
);
