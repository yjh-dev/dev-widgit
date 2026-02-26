import { create } from "zustand";
import type { ReadingStyle } from "@/lib/reading";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface ReadingState {
  title: string;
  currentPage: number;
  totalPages: number;
  style: ReadingStyle;
  showPages: boolean;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTitle: (v: string) => void;
  setCurrentPage: (v: number) => void;
  setTotalPages: (v: number) => void;
  setStyle: (v: ReadingStyle) => void;
  setShowPages: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  currentPage: 0,
  totalPages: 300,
  style: "bar" as ReadingStyle,
  showPages: true,
  color: "2563EB",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useReadingStore = create<ReadingState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setStyle: (style) => set({ style }),
  setShowPages: (showPages) => set({ showPages }),
  setColor: (color) => set({ color }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  reset: () => set(initialState),
}));
