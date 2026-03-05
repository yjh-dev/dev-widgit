import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "방명록",
  maxItems: 10,
  color: "6366F1",
  textColor: "",
  font: "sans",
};

interface GuestbookState extends CommonStyleState {
  title: string;
  maxItems: number;
  color: string;
  textColor: string;
  font: string;
  setTitle: (v: string) => void;
  setMaxItems: (v: number) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useGuestbookStore = create<GuestbookState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setMaxItems: (v: number) => set({ maxItems: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
