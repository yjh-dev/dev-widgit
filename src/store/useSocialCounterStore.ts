import { create } from "zustand";
import type { SocialItem, SocialLayout } from "@/lib/social-counter";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  items: [{ platform: "YouTube", count: 1000 }] as SocialItem[],
  layout: "row" as SocialLayout,
  color: "E11D48",
  textColor: "",
  font: "sans",
};

interface SocialCounterState extends CommonStyleState {
  items: SocialItem[];
  layout: SocialLayout;
  color: string;
  textColor: string;
  font: string;
  setItems: (v: SocialItem[]) => void;
  setLayout: (v: SocialLayout) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useSocialCounterStore = create<SocialCounterState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setItems: (v: SocialItem[]) => set({ items: v }),
    setLayout: (v: SocialLayout) => set({ layout: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
