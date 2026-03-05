import { create } from "zustand";
import type { MapStyle } from "@/lib/mini-map";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  lat: 37.5665,
  lon: 126.978,
  zoom: 13,
  label: "서울",
  style: "standard" as MapStyle,
  color: "E11D48",
  textColor: "",
  font: "sans",
};

interface MiniMapState extends CommonStyleState {
  lat: number;
  lon: number;
  zoom: number;
  label: string;
  style: MapStyle;
  color: string;
  textColor: string;
  font: string;
  setLat: (v: number) => void;
  setLon: (v: number) => void;
  setZoom: (v: number) => void;
  setLabel: (v: string) => void;
  setStyle: (v: MapStyle) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMiniMapStore = create<MiniMapState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setLat: (v: number) => set({ lat: v }),
    setLon: (v: number) => set({ lon: v }),
    setZoom: (v: number) => set({ zoom: v }),
    setLabel: (v: string) => set({ label: v }),
    setStyle: (v: MapStyle) => set({ style: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
