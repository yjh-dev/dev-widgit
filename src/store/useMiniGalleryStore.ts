import { create } from "zustand";
import type { GalleryTransition } from "@/lib/mini-gallery";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  images: [] as string[],
  interval: 5,
  transition: "fade" as GalleryTransition,
  showDots: true,
  color: "1E1E1E",
  textColor: "",
  font: "sans",
};

interface MiniGalleryState extends CommonStyleState {
  images: string[];
  interval: number;
  transition: GalleryTransition;
  showDots: boolean;
  color: string;
  textColor: string;
  font: string;
  setImages: (v: string[]) => void;
  setInterval: (v: number) => void;
  setTransition: (v: GalleryTransition) => void;
  setShowDots: (v: boolean) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMiniGalleryStore = create<MiniGalleryState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setImages: (v: string[]) => set({ images: v }),
    setInterval: (v: number) => set({ interval: v }),
    setTransition: (v: GalleryTransition) => set({ transition: v }),
    setShowDots: (v: boolean) => set({ showDots: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
