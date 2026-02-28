import { create } from "zustand";
import type { Step, StepperLayout } from "@/lib/stepper";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface StepperState {
  steps: Step[];
  currentStep: number;
  layout: StepperLayout;
  showDesc: boolean;
  showNumbers: boolean;
  color: string;
  completedColor: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setSteps: (v: Step[]) => void;
  updateStep: (index: number, step: Step) => void;
  addStep: (step: Step) => void;
  removeStep: (index: number) => void;
  setCurrentStep: (v: number) => void;
  setLayout: (v: StepperLayout) => void;
  setShowDesc: (v: boolean) => void;
  setShowNumbers: (v: boolean) => void;
  setColor: (v: string) => void;
  setCompletedColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  steps: [
    { label: "기획", desc: "아이디어 구상" },
    { label: "디자인", desc: "UI/UX 설계" },
    { label: "개발", desc: "코딩 및 구현" },
    { label: "배포", desc: "서비스 출시" },
  ] as Step[],
  currentStep: 1,
  layout: "horizontal" as StepperLayout,
  showDesc: true,
  showNumbers: true,
  color: "2563EB",
  completedColor: "22C55E",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useStepperStore = create<StepperState>((set) => ({
  ...initialState,

  setSteps: (steps) => set({ steps }),
  updateStep: (index, step) =>
    set((s) => ({
      steps: s.steps.map((st, i) => (i === index ? step : st)),
    })),
  addStep: (step) => set((s) => ({ steps: [...s.steps, step] })),
  removeStep: (index) =>
    set((s) => ({ steps: s.steps.filter((_, i) => i !== index) })),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setLayout: (layout) => set({ layout }),
  setShowDesc: (showDesc) => set({ showDesc }),
  setShowNumbers: (showNumbers) => set({ showNumbers }),
  setColor: (color) => set({ color }),
  setCompletedColor: (completedColor) => set({ completedColor }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
