import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface PomodoroState {
  workTime: number;
  breakTime: number;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  longBreak: number;
  rounds: number;
  showRounds: boolean;
  breakColor: string;
  autoStart: boolean;

  setWorkTime: (workTime: number) => void;
  setBreakTime: (breakTime: number) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setLongBreak: (longBreak: number) => void;
  setRounds: (rounds: number) => void;
  setShowRounds: (showRounds: boolean) => void;
  setBreakColor: (breakColor: string) => void;
  setAutoStart: (autoStart: boolean) => void;
  reset: () => void;
}

const initialState = {
  workTime: 25,
  breakTime: 5,
  color: "E11D48",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  longBreak: 15,
  rounds: 4,
  showRounds: true,
  breakColor: "22C55E",
  autoStart: false,
};

export const usePomodoroStore = create<PomodoroState>((set) => ({
  ...initialState,

  setWorkTime: (workTime) => set({ workTime }),
  setBreakTime: (breakTime) => set({ breakTime }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setLongBreak: (longBreak) => set({ longBreak }),
  setRounds: (rounds) => set({ rounds }),
  setShowRounds: (showRounds) => set({ showRounds }),
  setBreakColor: (breakColor) => set({ breakColor }),
  setAutoStart: (autoStart) => set({ autoStart }),
  reset: () => set(initialState),
}));
