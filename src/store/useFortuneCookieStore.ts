import { create } from "zustand";
import type { CookieStyle } from "@/lib/fortune-cookie";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  customMessage: "",
  lang: "ko" as "ko" | "en",
  style: "classic" as CookieStyle,
  cookieColor: "D97706",
  textColor: "",
};

interface FortuneCookieState extends CommonStyleState {
  customMessage: string;
  lang: "ko" | "en";
  style: CookieStyle;
  cookieColor: string;
  textColor: string;
  setCustomMessage: (v: string) => void;
  setLang: (v: "ko" | "en") => void;
  setStyle: (v: CookieStyle) => void;
  setCookieColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useFortuneCookieStore = create<FortuneCookieState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setCustomMessage: (v: string) => set({ customMessage: v }),
    setLang: (v: "ko" | "en") => set({ lang: v }),
    setStyle: (v: CookieStyle) => set({ style: v }),
    setCookieColor: (v: string) => set({ cookieColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
