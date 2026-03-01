import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { ImageFit, CaptionPosition } from "@/lib/image-card";

const widgetDefaults = {
  imageUrl: "",
  caption: "",
  linkUrl: "",
  fit: "cover" as ImageFit,
  captionPos: "bottom" as CaptionPosition,
  showCaption: true,
  color: "1E1E1E",
};

interface ImageCardState extends CommonStyleState {
  imageUrl: string;
  caption: string;
  linkUrl: string;
  fit: ImageFit;
  captionPos: CaptionPosition;
  showCaption: boolean;
  color: string;

  setImageUrl: (v: string) => void;
  setCaption: (v: string) => void;
  setLinkUrl: (v: string) => void;
  setFit: (v: ImageFit) => void;
  setCaptionPos: (v: CaptionPosition) => void;
  setShowCaption: (v: boolean) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useImageCardStore = create<ImageCardState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setImageUrl: (v: string) => set({ imageUrl: v }),
    setCaption: (v: string) => set({ caption: v }),
    setLinkUrl: (v: string) => set({ linkUrl: v }),
    setFit: (v: ImageFit) => set({ fit: v }),
    setCaptionPos: (v: CaptionPosition) => set({ captionPos: v }),
    setShowCaption: (v: boolean) => set({ showCaption: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
