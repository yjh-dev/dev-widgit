import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface MusicState {
  title: string;
  artist: string;
  progress: number;
  artColor: string;
  showProgress: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTitle: (v: string) => void;
  setArtist: (v: string) => void;
  setProgress: (v: number) => void;
  setArtColor: (v: string) => void;
  setShowProgress: (v: boolean) => void;
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
  title: "",
  artist: "",
  progress: 35,
  artColor: "6366F1",
  showProgress: true,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useMusicStore = create<MusicState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setArtist: (artist) => set({ artist }),
  setProgress: (progress) => set({ progress }),
  setArtColor: (artColor) => set({ artColor }),
  setShowProgress: (showProgress) => set({ showProgress }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
