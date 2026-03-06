import { create } from "zustand";
import type { StickyPinType, StickyLineHeight, StickyNoteMode } from "@/lib/sticky-note";
import type { FontSizeKey, TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey, EntranceType, EntranceDelayKey } from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

interface StickyNoteState {
  /* single mode */
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

  /* board mode (absorbed from memo-board) */
  mode: StickyNoteMode;
  memos: string;       // pipe-delimited, URI-encoded
  cols: number;
  interactive: boolean;

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
  setMode: (v: StickyNoteMode) => void;
  setMemos: (v: string) => void;
  setCols: (v: number) => void;
  setInteractive: (v: boolean) => void;
  entrance: EntranceType;
  entranceDelay: EntranceDelayKey;
  setEntrance: (v: EntranceType) => void;
  setEntranceDelay: (v: EntranceDelayKey) => void;
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
  entrance: "none" as EntranceType,
  entranceDelay: "0" as EntranceDelayKey,
  /* board mode defaults */
  mode: "single" as StickyNoteMode,
  memos: "회의 준비|장보기|운동",
  cols: 3,
  interactive: true,
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
  setMode: (mode) => set({ mode }),
  setMemos: (memos) => set({ memos }),
  setCols: (cols) => set({ cols }),
  setInteractive: (interactive) => set({ interactive }),
  setEntrance: (entrance) => set({ entrance }),
  setEntranceDelay: (entranceDelay) => set({ entranceDelay }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
