import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  rating: 4.5,
  maxStars: 5,
  label: "",
  color: "F59E0B",
  textColor: "",
  font: "sans",
};

interface RatingCardState extends CommonStyleState {
  title: string;
  rating: number;
  maxStars: number;
  label: string;
  color: string;
  textColor: string;
  font: string;
  setTitle: (v: string) => void;
  setRating: (v: number) => void;
  setMaxStars: (v: number) => void;
  setLabel: (v: string) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useRatingCardStore = create<RatingCardState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setRating: (v: number) => set({ rating: v }),
    setMaxStars: (v: number) => set({ maxStars: v }),
    setLabel: (v: string) => set({ label: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
