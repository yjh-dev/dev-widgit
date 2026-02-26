import { create } from "zustand";
import type { BannerAnimation, BannerAlign } from "@/lib/banner";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface BannerState {
  texts: string[];
  animation: BannerAnimation;
  speed: number;
  align: BannerAlign;
  bold: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  font: string;

  setTexts: (v: string[]) => void;
  setAnimation: (v: BannerAnimation) => void;
  setSpeed: (v: number) => void;
  setAlign: (v: BannerAlign) => void;
  setBold: (v: boolean) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  setFont: (v: string) => void;
  reset: () => void;
}

const initialState = {
  texts: ["오늘도 화이팅! 💪"],
  animation: "none" as BannerAnimation,
  speed: 3,
  align: "center" as BannerAlign,
  bold: true,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "lg" as FontSizeKey,
  font: "sans",
};

export const useBannerStore = create<BannerState>((set) => ({
  ...initialState,

  setTexts: (texts) => set({ texts }),
  setAnimation: (animation) => set({ animation }),
  setSpeed: (speed) => set({ speed }),
  setAlign: (align) => set({ align }),
  setBold: (bold) => set({ bold }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFont: (font) => set({ font }),
  reset: () => set(initialState),
}));
