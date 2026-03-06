import { create } from "zustand";
import type { FontKey } from "@/lib/fonts";
import type { FontSizeKey, TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey, EntranceType, EntranceDelayKey } from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";
import type { DdayDisplayMode } from "@/lib/dday";

type CalcType = "down" | "up";
type LayoutType = "default" | "progress";

type DdayDateFormat = "full" | "short" | "dot" | "none";

interface DdayWidgetState {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  isDarkMode: boolean;
  calcType: CalcType;
  isAnnual: boolean;
  layout: LayoutType;
  startDate: string;
  isTransparent: boolean;
  font: FontKey;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  showTime: boolean;
  blink: boolean;
  doneMsg: string;
  barColor: string;
  dateFmt: DdayDateFormat;
  displayMode: DdayDisplayMode;
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;

  setTitle: (title: string) => void;
  setTargetDate: (date: string) => void;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setCalcType: (calcType: CalcType) => void;
  setIsAnnual: (isAnnual: boolean) => void;
  setLayout: (layout: LayoutType) => void;
  setStartDate: (date: string) => void;
  setIsTransparent: (isTransparent: boolean) => void;
  setFont: (font: FontKey) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
  setShowTime: (showTime: boolean) => void;
  setBlink: (blink: boolean) => void;
  setDoneMsg: (doneMsg: string) => void;
  setBarColor: (barColor: string) => void;
  setDateFmt: (dateFmt: DdayDateFormat) => void;
  setDisplayMode: (displayMode: DdayDisplayMode) => void;
  setFx: (fx: EffectType) => void;
  setFxInt: (fxInt: EffectIntensity) => void;
  setGbg: (gbg: string) => void;
  setGbgDir: (gbgDir: number) => void;
  setNeonColor: (neonColor: string) => void;
  setBshadow: (bshadow: BoxShadowPreset) => void;
  tshadow: TextShadowKey;
  bw: BorderWidthKey;
  bc: string;
  opacity: OpacityKey;
  ls: LetterSpacingKey;
  setTshadow: (tshadow: TextShadowKey) => void;
  setBw: (bw: BorderWidthKey) => void;
  setBc: (bc: string) => void;
  setOpacity: (opacity: OpacityKey) => void;
  setLs: (ls: LetterSpacingKey) => void;
  hideOnDone: boolean;
  entrance: EntranceType;
  entranceDelay: EntranceDelayKey;
  setHideOnDone: (hideOnDone: boolean) => void;
  setEntrance: (entrance: EntranceType) => void;
  setEntranceDelay: (entranceDelay: EntranceDelayKey) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

const initialState = {
  title: "D-Day",
  targetDate: "",
  bgColor: "FFFFFF",
  textColor: "1E1E1E",
  isDarkMode: false,
  calcType: "down" as CalcType,
  isAnnual: false,
  layout: "default" as LayoutType,
  startDate: "",
  isTransparent: false,
  font: "noto-sans-kr" as FontKey,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
  showTime: false,
  blink: true,
  doneMsg: "",
  barColor: "",
  dateFmt: "full" as DdayDateFormat,
  displayMode: "default" as DdayDisplayMode,
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
  hideOnDone: false,
  entrance: "none" as EntranceType,
  entranceDelay: "0" as EntranceDelayKey,
};

export const useDdayWidgetStore = create<DdayWidgetState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setTargetDate: (date) => set({ targetDate: date }),
  setBgColor: (color) => set({ bgColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setIsDarkMode: (isDark) =>
    set({
      isDarkMode: isDark,
      bgColor: isDark ? "1E1E1E" : "FFFFFF",
      textColor: isDark ? "FFFFFF" : "1E1E1E",
    }),
  setCalcType: (calcType) => set({ calcType }),
  setIsAnnual: (isAnnual) => set({ isAnnual }),
  setLayout: (layout) => set({ layout }),
  setStartDate: (date) => set({ startDate: date }),
  setIsTransparent: (isTransparent) => set({ isTransparent }),
  setFont: (font) => set({ font }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  setShowTime: (showTime) => set({ showTime }),
  setBlink: (blink) => set({ blink }),
  setDoneMsg: (doneMsg) => set({ doneMsg }),
  setBarColor: (barColor) => set({ barColor }),
  setDateFmt: (dateFmt) => set({ dateFmt }),
  setDisplayMode: (displayMode) => set({ displayMode }),
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
  setHideOnDone: (hideOnDone) => set({ hideOnDone }),
  setEntrance: (entrance) => set({ entrance }),
  setEntranceDelay: (entranceDelay) => set({ entranceDelay }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
