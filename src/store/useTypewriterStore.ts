import { create } from "zustand";
import type { CursorStyle, TypewriterAlign } from "@/lib/typewriter";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface TypewriterState {
  texts: string[];
  speed: number;
  pause: number;
  cursor: CursorStyle;
  loop: boolean;
  deleteAnim: boolean;
  align: TypewriterAlign;
  bold: boolean;
  font: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  cursorColor: string;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTexts: (v: string[]) => void;
  setSpeed: (v: number) => void;
  setPause: (v: number) => void;
  setCursor: (v: CursorStyle) => void;
  setLoop: (v: boolean) => void;
  setDeleteAnim: (v: boolean) => void;
  setAlign: (v: TypewriterAlign) => void;
  setBold: (v: boolean) => void;
  setFont: (v: string) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setCursorColor: (v: string) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  texts: ["타이핑 효과 위젯"],
  speed: 80,
  pause: 2000,
  cursor: "bar" as CursorStyle,
  loop: true,
  deleteAnim: true,
  align: "center" as TypewriterAlign,
  bold: true,
  font: "sans",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  cursorColor: "",
  borderRadius: 16,
  padding: 24,
  fontSize: "lg" as FontSizeKey,
};

export const useTypewriterStore = create<TypewriterState>((set) => ({
  ...initialState,

  setTexts: (texts) => set({ texts }),
  setSpeed: (speed) => set({ speed }),
  setPause: (pause) => set({ pause }),
  setCursor: (cursor) => set({ cursor }),
  setLoop: (loop) => set({ loop }),
  setDeleteAnim: (deleteAnim) => set({ deleteAnim }),
  setAlign: (align) => set({ align }),
  setBold: (bold) => set({ bold }),
  setFont: (font) => set({ font }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setCursorColor: (cursorColor) => set({ cursorColor }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
