import { create } from "zustand";

interface PomodoroState {
  workTime: number;
  breakTime: number;
  color: string;
  bg: string;
  transparentBg: boolean;

  setWorkTime: (workTime: number) => void;
  setBreakTime: (breakTime: number) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  reset: () => void;
}

const initialState = {
  workTime: 25,
  breakTime: 5,
  color: "E11D48",
  bg: "FFFFFF",
  transparentBg: false,
};

export const usePomodoroStore = create<PomodoroState>((set) => ({
  ...initialState,

  setWorkTime: (workTime) => set({ workTime }),
  setBreakTime: (breakTime) => set({ breakTime }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  reset: () => set(initialState),
}));
