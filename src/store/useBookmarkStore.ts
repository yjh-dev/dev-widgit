import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface BookmarkState {
  url: string;
  title: string;
  desc: string;
  showIcon: boolean;
  showUrl: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setUrl: (v: string) => void;
  setTitle: (v: string) => void;
  setDesc: (v: string) => void;
  setShowIcon: (v: boolean) => void;
  setShowUrl: (v: boolean) => void;
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
  url: "",
  title: "",
  desc: "",
  showIcon: true,
  showUrl: true,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useBookmarkStore = create<BookmarkState>((set) => ({
  ...initialState,

  setUrl: (url) => set({ url }),
  setTitle: (title) => set({ title }),
  setDesc: (desc) => set({ desc }),
  setShowIcon: (showIcon) => set({ showIcon }),
  setShowUrl: (showUrl) => set({ showUrl }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
