import { create } from "zustand";
import type { CursorStyle, TypewriterAlign } from "@/lib/typewriter";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  texts: ["타이핑 효과 위젯"],
  speed: 80,
  pause: 2000,
  cursor: "bar" as CursorStyle,
  loop: true,
  deleteAnim: true,
  align: "center" as TypewriterAlign,
  bold: true,
  font: "sans",
  color: "1E1E1E",
  cursorColor: "",
  fontSize: "lg" as FontSizeKey,
};

interface TypewriterState extends CommonStyleState {
  texts: string[];
  speed: number;
  pause: number;
  cursor: CursorStyle;
  loop: boolean;
  deleteAnim: boolean;
  align: TypewriterAlign;
  bold: boolean;
  font: string;
  color: string;
  cursorColor: string;
  setTexts: (v: string[]) => void;
  setSpeed: (v: number) => void;
  setPause: (v: number) => void;
  setCursor: (v: CursorStyle) => void;
  setLoop: (v: boolean) => void;
  setDeleteAnim: (v: boolean) => void;
  setAlign: (v: TypewriterAlign) => void;
  setBold: (v: boolean) => void;
  setFont: (v: string) => void;
  setColor: (v: string) => void;
  setCursorColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTypewriterStore = create<TypewriterState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTexts: (v: string[]) => set({ texts: v }),
    setSpeed: (v: number) => set({ speed: v }),
    setPause: (v: number) => set({ pause: v }),
    setCursor: (v: CursorStyle) => set({ cursor: v }),
    setLoop: (v: boolean) => set({ loop: v }),
    setDeleteAnim: (v: boolean) => set({ deleteAnim: v }),
    setAlign: (v: TypewriterAlign) => set({ align: v }),
    setBold: (v: boolean) => set({ bold: v }),
    setFont: (v: string) => set({ font: v }),
    setColor: (v: string) => set({ color: v }),
    setCursorColor: (v: string) => set({ cursorColor: v }),
  })),
);
