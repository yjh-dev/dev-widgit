import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

export type TextAlign = "left" | "center" | "right";
export type LineHeight = "tight" | "normal" | "relaxed";

interface QuoteState {
  text: string;
  author: string;
  font: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  align: TextAlign;
  showMarks: boolean;
  italic: boolean;
  lineHeight: LineHeight;
  authorColor: string;
  divider: boolean;

  setText: (text: string) => void;
  setAuthor: (author: string) => void;
  setFont: (font: string) => void;
  setTextColor: (textColor: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setAlign: (align: TextAlign) => void;
  setShowMarks: (showMarks: boolean) => void;
  setItalic: (italic: boolean) => void;
  setLineHeight: (lineHeight: LineHeight) => void;
  setAuthorColor: (authorColor: string) => void;
  setDivider: (divider: boolean) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  text: "",
  author: "",
  font: "serif",
  textColor: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  align: "center" as TextAlign,
  showMarks: true,
  italic: false,
  lineHeight: "relaxed" as LineHeight,
  authorColor: "",
  divider: false,
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,

  setText: (text) => set({ text }),
  setAuthor: (author) => set({ author }),
  setFont: (font) => set({ font }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setAlign: (align) => set({ align }),
  setShowMarks: (showMarks) => set({ showMarks }),
  setItalic: (italic) => set({ italic }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setAuthorColor: (authorColor) => set({ authorColor }),
  setDivider: (divider) => set({ divider }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
