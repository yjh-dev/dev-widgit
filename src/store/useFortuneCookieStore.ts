import { create } from "zustand";
import type { CookieStyle } from "@/lib/fortune-cookie";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface FortuneCookieState {
  customMessage: string;
  lang: "ko" | "en";
  style: CookieStyle;
  cookieColor: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  setCustomMessage: (v: string) => void;
  setLang: (v: "ko" | "en") => void;
  setStyle: (v: CookieStyle) => void;
  setCookieColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

const defaults = {
  customMessage: "",
  lang: "ko" as const,
  style: "classic" as CookieStyle,
  cookieColor: "D97706",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useFortuneCookieStore = create<FortuneCookieState>((set) => ({
  ...defaults,
  setCustomMessage: (v) => set({ customMessage: v }),
  setLang: (v) => set({ lang: v }),
  setStyle: (v) => set({ style: v }),
  setCookieColor: (v) => set({ cookieColor: v }),
  setTextColor: (v) => set({ textColor: v }),
  setBg: (v) => set({ bg: v }),
  setTransparentBg: (v) => set({ transparentBg: v }),
  setBorderRadius: (v) => set({ borderRadius: v }),
  setPadding: (v) => set({ padding: v }),
  setFontSize: (v) => set({ fontSize: v }),
  loadPreset: (preset) => set(preset as Partial<FortuneCookieState>),
  reset: () => set(defaults),
}));
