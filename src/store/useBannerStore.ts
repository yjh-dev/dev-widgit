import { create } from "zustand";
import type { BannerAnimation, BannerAlign } from "@/lib/banner";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  texts: ["오늘도 화이팅! 💪"],
  animation: "none" as BannerAnimation,
  speed: 3,
  align: "center" as BannerAlign,
  bold: true,
  color: "1E1E1E",
  font: "sans",
  fontSize: "lg" as FontSizeKey,
};

interface BannerState extends CommonStyleState {
  texts: string[];
  animation: BannerAnimation;
  speed: number;
  align: BannerAlign;
  bold: boolean;
  color: string;
  font: string;
  setTexts: (v: string[]) => void;
  setAnimation: (v: BannerAnimation) => void;
  setSpeed: (v: number) => void;
  setAlign: (v: BannerAlign) => void;
  setBold: (v: boolean) => void;
  setColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useBannerStore = create<BannerState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTexts: (v: string[]) => set({ texts: v }),
    setAnimation: (v: BannerAnimation) => set({ animation: v }),
    setSpeed: (v: number) => set({ speed: v }),
    setAlign: (v: BannerAlign) => set({ align: v }),
    setBold: (v: boolean) => set({ bold: v }),
    setColor: (v: string) => set({ color: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
