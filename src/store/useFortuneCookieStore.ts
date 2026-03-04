import { create } from "zustand";
import type { CookieStyle } from "@/lib/fortune-cookie";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  customMessages: [] as string[],
  lang: "ko" as "ko" | "en",
  style: "classic" as CookieStyle,
  cookieColor: "D97706",
  textColor: "",
  taps: 1,
};

interface FortuneCookieState extends CommonStyleState {
  customMessages: string[];
  lang: "ko" | "en";
  style: CookieStyle;
  cookieColor: string;
  textColor: string;
  taps: number;
  setCustomMessages: (v: string[]) => void;
  setLang: (v: "ko" | "en") => void;
  setStyle: (v: CookieStyle) => void;
  setCookieColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setTaps: (v: number) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useFortuneCookieStore = create<FortuneCookieState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setCustomMessages: (v: string[]) => set({ customMessages: v }),
    setLang: (v: "ko" | "en") => set({ lang: v }),
    setStyle: (v: CookieStyle) => set({ style: v }),
    setCookieColor: (v: string) => set({ cookieColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setTaps: (v: number) => set({ taps: v }),
  })),
);
