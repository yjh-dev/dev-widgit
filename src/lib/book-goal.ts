export interface BookProgress {
  percentage: number;
  remaining: number;
}

export function calculateBookProgress(
  current: number,
  target: number,
): BookProgress {
  if (target <= 0) return { percentage: 0, remaining: 0 };
  const clamped = Math.max(0, Math.min(current, target));
  return {
    percentage: (clamped / target) * 100,
    remaining: Math.max(target - clamped, 0),
  };
}
