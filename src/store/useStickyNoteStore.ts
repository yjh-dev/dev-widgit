import { create } from "zustand";
import type { StickyPinType, StickyLineHeight } from "@/lib/sticky-note";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface StickyNoteState {
  text: string;
  noteColor: string;
  textColor: string;
  pin: StickyPinType;
  rotation: number;
  font: string;
  lh: StickyLineHeight;
  shadow: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setText: (v: string) => void;
  setNoteColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setPin: (v: StickyPinType) => void;
  setRotation: (v: number) => void;
  setFont: (v: string) => void;
  setLh: (v: StickyLineHeight) => void;
  setShadow: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  text: "메모를 입력하세요",
  noteColor: "FBBF24",
  textColor: "1E1E1E",
  pin: "pin" as StickyPinType,
  rotation: 2,
  font: "gaegu",
  lh: "normal" as StickyLineHeight,
  shadow: true,
  borderRadius: 4,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useStickyNoteStore = create<StickyNoteState>((set) => ({
  ...initialState,

  setText: (text) => set({ text }),
  setNoteColor: (noteColor) => set({ noteColor }),
  setTextColor: (textColor) => set({ textColor }),
  setPin: (pin) => set({ pin }),
  setRotation: (rotation) => set({ rotation }),
  setFont: (font) => set({ font }),
  setLh: (lh) => set({ lh }),
  setShadow: (shadow) => set({ shadow }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
