export type GoalStyle = "bar" | "ring";

export interface GoalProgress {
  percentage: number;
  current: number;
  target: number;
}

export function calculateGoalProgress(
  current: number,
  target: number,
): GoalProgress {
  if (target <= 0) return { percentage: 0, current: 0, target: 0 };
  const clamped = Math.max(0, Math.min(current, target));
  return {
    percentage: (clamped / target) * 100,
    current: clamped,
    target,
  };
}
