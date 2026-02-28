import { create } from "zustand";
import type { WorldClockFormat } from "@/lib/world-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface WorldClockState {
  zones: string[];
  format: WorldClockFormat;
  showLabel: boolean;
  showSeconds: boolean;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setZones: (v: string[]) => void;
  setFormat: (v: WorldClockFormat) => void;
  setShowLabel: (v: boolean) => void;
  setShowSeconds: (v: boolean) => void;
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
  zones: ["Asia/Seoul", "America/New_York"],
  format: "24h" as WorldClockFormat,
  showLabel: true,
  showSeconds: false,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useWorldClockStore = create<WorldClockState>((set) => ({
  ...initialState,

  setZones: (zones) => set({ zones }),
  setFormat: (format) => set({ format }),
  setShowLabel: (showLabel) => set({ showLabel }),
  setShowSeconds: (showSeconds) => set({ showSeconds }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
