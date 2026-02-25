import { create } from "zustand";

interface LifeCalendarState {
  birthdate: string;
  lifespan: number;
  color: string;
  bg: string;
  transparentBg: boolean;
  showStats: boolean;

  setBirthdate: (birthdate: string) => void;
  setLifespan: (lifespan: number) => void;
  setColor: (color: string) => void;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setShowStats: (showStats: boolean) => void;
  reset: () => void;
}

const initialState = {
  birthdate: "",
  lifespan: 80,
  color: "2563EB",
  bg: "FFFFFF",
  transparentBg: false,
  showStats: true,
};

export const useLifeCalendarStore = create<LifeCalendarState>((set) => ({
  ...initialState,

  setBirthdate: (birthdate) => set({ birthdate }),
  setLifespan: (lifespan) => set({ lifespan }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setShowStats: (showStats) => set({ showStats }),
  reset: () => set(initialState),
}));
