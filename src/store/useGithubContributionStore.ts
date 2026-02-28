import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface GithubContributionState {
  username: string;
  year: string; // "last" or "2025" etc.
  showTotal: boolean;
  showUsername: boolean;
  lang: "ko" | "en";
  cellSize: "sm" | "md" | "lg";
  cellRadius: "square" | "rounded" | "circle";

  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setUsername: (v: string) => void;
  setYear: (v: string) => void;
  setShowTotal: (v: boolean) => void;
  setShowUsername: (v: boolean) => void;
  setLang: (v: "ko" | "en") => void;
  setCellSize: (v: "sm" | "md" | "lg") => void;
  setCellRadius: (v: "square" | "rounded" | "circle") => void;

  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;

  loadPreset: (p: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  username: "",
  year: "last",
  showTotal: true,
  showUsername: true,
  lang: "ko" as "ko" | "en",
  cellSize: "sm" as "sm" | "md" | "lg",
  cellRadius: "rounded" as "square" | "rounded" | "circle",

  color: "22C55E",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useGithubContributionStore = create<GithubContributionState>(
  (set) => ({
    ...initialState,

    setUsername: (username) => set({ username }),
    setYear: (year) => set({ year }),
    setShowTotal: (showTotal) => set({ showTotal }),
    setShowUsername: (showUsername) => set({ showUsername }),
    setLang: (lang) => set({ lang }),
    setCellSize: (cellSize) => set({ cellSize }),
    setCellRadius: (cellRadius) => set({ cellRadius }),

    setColor: (color) => set({ color }),
    setTextColor: (textColor) => set({ textColor }),
    setBg: (bg) => set({ bg }),
    setTransparentBg: (transparentBg) => set({ transparentBg }),
    setBorderRadius: (borderRadius) => set({ borderRadius }),
    setPadding: (padding) => set({ padding }),
    setFontSize: (fontSize) => set({ fontSize }),

    loadPreset: (p) => set({ ...initialState, ...p }),
    reset: () => set(initialState),
  }),
);
