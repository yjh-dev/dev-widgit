import type {
  FontSizeKey,
  TextShadowKey,
  BorderWidthKey,
  OpacityKey,
  LetterSpacingKey,
} from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

/* ─── Common Style State ─── */

export interface CommonStyleState {
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;
  tshadow: TextShadowKey;
  bw: BorderWidthKey;
  bc: string;
  opacity: OpacityKey;
  ls: LetterSpacingKey;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setFx: (fx: EffectType) => void;
  setFxInt: (fxInt: EffectIntensity) => void;
  setGbg: (gbg: string) => void;
  setGbgDir: (gbgDir: number) => void;
  setNeonColor: (neonColor: string) => void;
  setBshadow: (bshadow: BoxShadowPreset) => void;
  setTshadow: (tshadow: TextShadowKey) => void;
  setBw: (bw: BorderWidthKey) => void;
  setBc: (bc: string) => void;
  setOpacity: (opacity: OpacityKey) => void;
  setLs: (ls: LetterSpacingKey) => void;
}

export const commonStyleDefaults = {
  bg: "FFFFFF",
  transparentBg: false,
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

/* ─── Simple Factory ─── */

/**
 * 위젯 스토어의 initialState + 공통 setter를 결합하여
 * Zustand `create()` 에 전달할 StateCreator 함수를 반환한다.
 *
 * Usage:
 * ```ts
 * const widgetDefaults = { color: "1E1E1E", ... };
 * export const useMyStore = create<MyState>(
 *   widgetStoreCreator(widgetDefaults, (set) => ({
 *     setColor: (v: string) => set({ color: v }),
 *   })),
 * );
 * ```
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function widgetStoreCreator<D extends Record<string, any>, S extends Record<string, any>>(
  widgetDefaults: D,
  widgetSetters: (set: ((partial: Partial<D & typeof commonStyleDefaults>) => void) & ((fn: (state: any) => Partial<D & typeof commonStyleDefaults>) => void)) => S,
) {
/* eslint-enable @typescript-eslint/no-explicit-any */
  const initialState = { ...commonStyleDefaults, ...widgetDefaults };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (set: any) => ({
    ...initialState,
    // Common style setters
    setBg: (bg: string) => set({ bg }),
    setTransparentBg: (transparentBg: boolean) => set({ transparentBg }),
    setBorderRadius: (borderRadius: number) => set({ borderRadius }),
    setPadding: (padding: number) => set({ padding }),
    setFontSize: (fontSize: FontSizeKey) => set({ fontSize }),
    setFx: (fx: EffectType) => set({ fx }),
    setFxInt: (fxInt: EffectIntensity) => set({ fxInt }),
    setGbg: (gbg: string) => set({ gbg }),
    setGbgDir: (gbgDir: number) => set({ gbgDir }),
    setNeonColor: (neonColor: string) => set({ neonColor }),
    setBshadow: (bshadow: BoxShadowPreset) => set({ bshadow }),
    setTshadow: (tshadow: TextShadowKey) => set({ tshadow }),
    setBw: (bw: BorderWidthKey) => set({ bw }),
    setBc: (bc: string) => set({ bc }),
    setOpacity: (opacity: OpacityKey) => set({ opacity }),
    setLs: (ls: LetterSpacingKey) => set({ ls }),
    // Widget-specific setters
    ...widgetSetters(set),
    // loadPreset / reset
    loadPreset: (preset: Record<string, unknown>) =>
      set({ ...initialState, ...preset }),
    reset: () => set(initialState),
  });
}
