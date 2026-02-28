export type BreathingTechnique = "478" | "box" | "22" | "custom";

export interface BreathingPhase {
  name: string;
  duration: number; // seconds
}

export interface TechniqueInfo {
  label: string;
  desc: string;
  phases: BreathingPhase[];
}

export const TECHNIQUES: Record<BreathingTechnique, TechniqueInfo> = {
  "478": {
    label: "4-7-8 호흡",
    desc: "들이쉬기 4초, 참기 7초, 내쉬기 8초",
    phases: [
      { name: "들이쉬기", duration: 4 },
      { name: "참기", duration: 7 },
      { name: "내쉬기", duration: 8 },
    ],
  },
  box: {
    label: "박스 호흡",
    desc: "4초씩 균등하게 (들이쉬기-참기-내쉬기-참기)",
    phases: [
      { name: "들이쉬기", duration: 4 },
      { name: "참기", duration: 4 },
      { name: "내쉬기", duration: 4 },
      { name: "참기", duration: 4 },
    ],
  },
  "22": {
    label: "2-2 호흡",
    desc: "간단한 2초 들이쉬기, 2초 내쉬기",
    phases: [
      { name: "들이쉬기", duration: 2 },
      { name: "내쉬기", duration: 2 },
    ],
  },
  custom: {
    label: "커스텀",
    desc: "직접 설정",
    phases: [
      { name: "들이쉬기", duration: 4 },
      { name: "내쉬기", duration: 4 },
    ],
  },
};

/** Total cycle duration in seconds */
export function cycleDuration(phases: BreathingPhase[]): number {
  return phases.reduce((sum, p) => sum + p.duration, 0);
}
