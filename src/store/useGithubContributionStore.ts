import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  username: "",
  year: "last",
  showTotal: true,
  showUsername: true,
  showStreak: false,
  showStats: false,
  lang: "ko" as "ko" | "en",
  cellSize: "sm" as "sm" | "md" | "lg",
  cellRadius: "rounded" as "square" | "rounded" | "circle",
  color: "22C55E",
  textColor: "",
};

interface GithubContributionState extends CommonStyleState {
  username: string;
  year: string;
  showTotal: boolean;
  showUsername: boolean;
  showStreak: boolean;
  showStats: boolean;
  lang: "ko" | "en";
  cellSize: "sm" | "md" | "lg";
  cellRadius: "square" | "rounded" | "circle";
  color: string;
  textColor: string;
  setUsername: (v: string) => void;
  setYear: (v: string) => void;
  setShowTotal: (v: boolean) => void;
  setShowUsername: (v: boolean) => void;
  setShowStreak: (v: boolean) => void;
  setShowStats: (v: boolean) => void;
  setLang: (v: "ko" | "en") => void;
  setCellSize: (v: "sm" | "md" | "lg") => void;
  setCellRadius: (v: "square" | "rounded" | "circle") => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useGithubContributionStore = create<GithubContributionState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setUsername: (v: string) => set({ username: v }),
    setYear: (v: string) => set({ year: v }),
    setShowTotal: (v: boolean) => set({ showTotal: v }),
    setShowUsername: (v: boolean) => set({ showUsername: v }),
    setShowStreak: (v: boolean) => set({ showStreak: v }),
    setShowStats: (v: boolean) => set({ showStats: v }),
    setLang: (v: "ko" | "en") => set({ lang: v }),
    setCellSize: (v: "sm" | "md" | "lg") => set({ cellSize: v }),
    setCellRadius: (v: "square" | "rounded" | "circle") => set({ cellRadius: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
