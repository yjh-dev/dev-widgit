export type GpaStyle = "bar" | "ring";
export type GpaScale = "4.5" | "4.3" | "4.0";

export interface GpaProgress {
  percentage: number;
  grade: string;
}

export function calculateGpaProgress(
  current: number,
  max: number,
): GpaProgress {
  if (max <= 0) return { percentage: 0, grade: "F" };
  const clamped = Math.max(0, Math.min(current, max));
  const pct = (clamped / max) * 100;
  const grade =
    clamped >= max * 0.95
      ? "A+"
      : clamped >= max * 0.9
        ? "A"
        : clamped >= max * 0.85
          ? "B+"
          : clamped >= max * 0.8
            ? "B"
            : clamped >= max * 0.7
              ? "C+"
              : clamped >= max * 0.6
                ? "C"
                : "F";
  return { percentage: pct, grade };
}
