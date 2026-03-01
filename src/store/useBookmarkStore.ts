import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  url: "",
  title: "",
  desc: "",
  showIcon: true,
  showUrl: true,
  color: "1E1E1E",
  font: "sans",
};

interface BookmarkState extends CommonStyleState {
  url: string;
  title: string;
  desc: string;
  showIcon: boolean;
  showUrl: boolean;
  color: string;
  font: string;
  setUrl: (v: string) => void;
  setTitle: (v: string) => void;
  setDesc: (v: string) => void;
  setShowIcon: (v: boolean) => void;
  setShowUrl: (v: boolean) => void;
  setColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useBookmarkStore = create<BookmarkState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setUrl: (v: string) => set({ url: v }),
    setTitle: (v: string) => set({ title: v }),
    setDesc: (v: string) => set({ desc: v }),
    setShowIcon: (v: boolean) => set({ showIcon: v }),
    setShowUrl: (v: boolean) => set({ showUrl: v }),
    setColor: (v: string) => set({ color: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
