import { create } from "zustand";
import type { ImageFit, CaptionPosition } from "@/lib/image-card";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface ImageCardState {
  imageUrl: string;
  caption: string;
  linkUrl: string;
  fit: ImageFit;
  captionPos: CaptionPosition;
  showCaption: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setImageUrl: (v: string) => void;
  setCaption: (v: string) => void;
  setLinkUrl: (v: string) => void;
  setFit: (v: ImageFit) => void;
  setCaptionPos: (v: CaptionPosition) => void;
  setShowCaption: (v: boolean) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  imageUrl: "",
  caption: "",
  linkUrl: "",
  fit: "cover" as ImageFit,
  captionPos: "bottom" as CaptionPosition,
  showCaption: true,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useImageCardStore = create<ImageCardState>((set) => ({
  ...initialState,

  setImageUrl: (imageUrl) => set({ imageUrl }),
  setCaption: (caption) => set({ caption }),
  setLinkUrl: (linkUrl) => set({ linkUrl }),
  setFit: (fit) => set({ fit }),
  setCaptionPos: (captionPos) => set({ captionPos }),
  setShowCaption: (showCaption) => set({ showCaption }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
