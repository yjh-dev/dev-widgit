import { create } from "zustand";
import type { StickyPinType, StickyLineHeight } from "@/lib/sticky-note";
import type { FontSizeKey, TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey } from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

interface StickyNoteState {
  text: string;
  noteColor: string;
  textColor: string;
  pin: StickyPinType;
  rotation: number;
  font: string;
  lh: StickyLineHeight;
  shadow: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;

  setText: (v: string) => void;
  setNoteColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setPin: (v: StickyPinType) => void;
  setRotation: (v: number) => void;
  setFont: (v: string) => void;
  setLh: (v: StickyLineHeight) => void;
  setShadow: (v: boolean) => void;
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
  text: "메모를 입력하세요",
  noteColor: "FBBF24",
  textColor: "1E1E1E",
  pin: "pin" as StickyPinType,
  rotation: 2,
  font: "gaegu",
  lh: "normal" as StickyLineHeight,
  shadow: true,
  borderRadius: 4,
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

export const useStickyNoteStore = create<StickyNoteState>((set) => ({
  ...initialState,

  setText: (text) => set({ text }),
  setNoteColor: (noteColor) => set({ noteColor }),
  setTextColor: (textColor) => set({ textColor }),
  setPin: (pin) => set({ pin }),
  setRotation: (rotation) => set({ rotation }),
  setFont: (font) => set({ font }),
  setLh: (lh) => set({ lh }),
  setShadow: (shadow) => set({ shadow }),
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
