import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  artist: "",
  progress: 35,
  artColor: "6366F1",
  showProgress: true,
  color: "1E1E1E",
};

interface MusicState extends CommonStyleState {
  title: string;
  artist: string;
  progress: number;
  artColor: string;
  showProgress: boolean;
  color: string;
  setTitle: (v: string) => void;
  setArtist: (v: string) => void;
  setProgress: (v: number) => void;
  setArtColor: (v: string) => void;
  setShowProgress: (v: boolean) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMusicStore = create<MusicState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setArtist: (v: string) => set({ artist: v }),
    setProgress: (v: number) => set({ progress: v }),
    setArtColor: (v: string) => set({ artColor: v }),
    setShowProgress: (v: boolean) => set({ showProgress: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
