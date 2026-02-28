export function getGlassIcon(filled: boolean): string {
  return filled ? "💧" : "○";
}

export function calculateProgress(filled: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min((filled / goal) * 100, 100);
}

export function formatMl(glasses: number, glassSize: number): string {
  return `${glasses * glassSize}ml`;
}

export function formatTotalMl(goal: number, glassSize: number): string {
  return `${goal * glassSize}ml`;
}
