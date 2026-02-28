import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface TodoState {
  title: string;
  items: string; // pipe-separated: "할일1|할일2|!완료된할일"
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  showProgress: boolean;
  strikethrough: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTitle: (v: string) => void;
  setItems: (v: string) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setShowProgress: (v: boolean) => void;
  setStrikethrough: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  items: "",
  color: "2563EB",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  showProgress: true,
  strikethrough: true,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useTodoStore = create<TodoState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setItems: (items) => set({ items }),
  setColor: (color) => set({ color }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setShowProgress: (showProgress) => set({ showProgress }),
  setStrikethrough: (strikethrough) => set({ strikethrough }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
