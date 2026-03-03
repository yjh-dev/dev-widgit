import { create } from "zustand";
import type { QRErrorCorrection, QRModuleStyle, QRSize } from "@/lib/qr-code";
import type { FontSizeKey, TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey } from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

interface QRCodeState {
  data: string;
  label: string;
  fgColor: string;
  bgColor: string;
  size: QRSize;
  ec: QRErrorCorrection;
  module: QRModuleStyle;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;

  setData: (v: string) => void;
  setLabel: (v: string) => void;
  setFgColor: (v: string) => void;
  setBgColor: (v: string) => void;
  setSize: (v: QRSize) => void;
  setEc: (v: QRErrorCorrection) => void;
  setModule: (v: QRModuleStyle) => void;
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
  data: "",
  label: "",
  fgColor: "1E1E1E",
  bgColor: "FFFFFF",
  size: "md" as QRSize,
  ec: "M" as QRErrorCorrection,
  module: "square" as QRModuleStyle,
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

export const useQRCodeStore = create<QRCodeState>((set) => ({
  ...initialState,

  setData: (data) => set({ data }),
  setLabel: (label) => set({ label }),
  setFgColor: (fgColor) => set({ fgColor }),
  setBgColor: (bgColor) => set({ bgColor }),
  setSize: (size) => set({ size }),
  setEc: (ec) => set({ ec }),
  setModule: (module) => set({ module }),
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
