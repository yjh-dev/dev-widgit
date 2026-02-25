import { create } from "zustand";
import type { QuoteFont } from "@/lib/quote";

interface QuoteState {
  text: string;
  author: string;
  font: QuoteFont;
  textColor: string;
  bg: string;
  transparentBg: boolean;

  setText: (text: string) => void;
  setAuthor: (author: string) => void;
  setFont: (font: QuoteFont) => void;
  setTextColor: (textColor: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  reset: () => void;
}

const initialState = {
  text: "",
  author: "",
  font: "serif" as QuoteFont,
  textColor: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,

  setText: (text) => set({ text }),
  setAuthor: (author) => set({ author }),
  setFont: (font) => set({ font }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  reset: () => set(initialState),
}));
