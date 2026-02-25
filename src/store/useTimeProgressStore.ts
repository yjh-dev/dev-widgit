import { create } from "zustand";
import type { ProgressType } from "@/lib/time-progress";

interface TimeProgressState {
  type: ProgressType;
  color: string;
  bg: string;
  transparentBg: boolean;

  setType: (type: ProgressType) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  reset: () => void;
}

const initialState = {
  type: "day" as ProgressType,
  color: "2563EB",
  bg: "FFFFFF",
  transparentBg: false,
};

export const useTimeProgressStore = create<TimeProgressState>((set) => ({
  ...initialState,

  setType: (type) => set({ type }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  reset: () => set(initialState),
}));
