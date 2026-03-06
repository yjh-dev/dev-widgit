export type GoalStyle = "bar" | "ring" | "icons";
export type GoalIcon = "" | "book" | "circle" | "star" | "heart" | "check";

export const VALID_STYLES: GoalStyle[] = ["bar", "ring", "icons"];
export const VALID_ICONS: GoalIcon[] = ["", "book", "circle", "star", "heart", "check"];

export interface GoalProgress {
  percentage: number;
  current: number;
  target: number;
  remaining: number;
}

export function calculateGoalProgress(
  current: number,
  target: number,
): GoalProgress {
  if (target <= 0) return { percentage: 0, current: 0, target: 0, remaining: 0 };
  const clamped = Math.max(0, Math.min(current, target));
  return {
    percentage: (clamped / target) * 100,
    current: clamped,
    target,
    remaining: Math.max(target - clamped, 0),
  };
}
