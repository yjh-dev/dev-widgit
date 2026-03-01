import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { Step, StepperLayout } from "@/lib/stepper";

const widgetDefaults = {
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
};

interface StepperState extends CommonStyleState {
  steps: Step[];
  currentStep: number;
  layout: StepperLayout;
  showDesc: boolean;
  showNumbers: boolean;
  color: string;
  completedColor: string;
  textColor: string;

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
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useStepperStore = create<StepperState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setSteps: (v: Step[]) => set({ steps: v }),
    updateStep: (index: number, step: Step) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: StepperState) => ({
        steps: s.steps.map((st: Step, i: number) => (i === index ? step : st)),
      })),
    addStep: (step: Step) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: StepperState) => ({ steps: [...s.steps, step] })),
    removeStep: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: StepperState) => ({ steps: s.steps.filter((_: Step, i: number) => i !== index) })),
    setCurrentStep: (v: number) => set({ currentStep: v }),
    setLayout: (v: StepperLayout) => set({ layout: v }),
    setShowDesc: (v: boolean) => set({ showDesc: v }),
    setShowNumbers: (v: boolean) => set({ showNumbers: v }),
    setColor: (v: string) => set({ color: v }),
    setCompletedColor: (v: string) => set({ completedColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
