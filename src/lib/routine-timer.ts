export interface RoutineStep {
  name: string;
  minutes: number;
}

export function parseSteps(raw: string): RoutineStep[] {
  if (!raw) return [];
  return raw.split("|").map((s) => {
    const [name, min] = s.split("~");
    return { name: name || "", minutes: Math.max(1, Number(min) || 5) };
  }).filter((s) => s.name);
}

export function serializeSteps(steps: RoutineStep[]): string {
  return steps.map((s) => `${s.name}~${s.minutes}`).join("|");
}

export function getTotalMinutes(steps: RoutineStep[]): number {
  return steps.reduce((sum, s) => sum + s.minutes, 0);
}
