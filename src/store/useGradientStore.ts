import { create } from "zustand";
import type { GradientType } from "@/lib/gradient";
import type { FontSizeKey, TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey } from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

interface GradientState {
  colors: string[];
  dir: number;
  type: GradientType;
  animate: boolean;
  speed: number;
  text: string;
  textColor: string;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;

  setColors: (v: string[]) => void;
  setDir: (v: number) => void;
  setType: (v: GradientType) => void;
  setAnimate: (v: boolean) => void;
  setSpeed: (v: number) => void;
  setText: (v: string) => void;
  setTextColor: (v: string) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  setFx: (v: EffectType) => void;
  setFxInt: (v: EffectIntensity) => void;
  setGbg: (v: string) => void;
  setGbgDir: (v: number) => void;
  setNeonColor: (v: string) => void;
  setBshadow: (v: BoxShadowPreset) => void;
  tshadow: TextShadowKey;
  bw: BorderWidthKey;
  bc: string;
  opacity: OpacityKey;
  ls: LetterSpacingKey;
  setTshadow: (v: TextShadowKey) => void;
  setBw: (v: BorderWidthKey) => void;
  setBc: (v: string) => void;
  setOpacity: (v: OpacityKey) => void;
  setLs: (v: LetterSpacingKey) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

const initialState = {
  colors: ["6366F1", "EC4899"],
  dir: 135,
  type: "linear" as GradientType,
  animate: false,
  speed: 10,
  text: "",
  textColor: "FFFFFF",
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  fx: "none" as EffectType,
  fxInt: 2 as EffectIntensity,
  gbg: "",
  gbgDir: 135,
  neonColor: "",
  bshadow: "none" as BoxShadowPreset,
  tshadow: "none" as TextShadowKey,
  bw: "none" as BorderWidthKey,
  bc: "D1D5DB",
  opacity: "100" as OpacityKey,
  ls: "normal" as LetterSpacingKey,
};

export const useGradientStore = create<GradientState>((set) => ({
  ...initialState,

  setColors: (colors) => set({ colors }),
  setDir: (dir) => set({ dir }),
  setType: (type) => set({ type }),
  setAnimate: (animate) => set({ animate }),
  setSpeed: (speed) => set({ speed }),
  setText: (text) => set({ text }),
  setTextColor: (textColor) => set({ textColor }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFx: (fx) => set({ fx }),
  setFxInt: (fxInt) => set({ fxInt }),
  setGbg: (gbg) => set({ gbg }),
  setGbgDir: (gbgDir) => set({ gbgDir }),
  setNeonColor: (neonColor) => set({ neonColor }),
  setBshadow: (bshadow) => set({ bshadow }),
  setTshadow: (tshadow) => set({ tshadow }),
  setBw: (bw) => set({ bw }),
  setBc: (bc) => set({ bc }),
  setOpacity: (opacity) => set({ opacity }),
  setLs: (ls) => set({ ls }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
