export type ReadingStyle = "bar" | "ring";

export interface ReadingProgress {
  percentage: number;
  currentPage: number;
  totalPages: number;
}

export function calculateReadingProgress(
  currentPage: number,
  totalPages: number,
): ReadingProgress {
  if (totalPages <= 0) return { percentage: 0, currentPage: 0, totalPages: 0 };
  const clamped = Math.max(0, Math.min(currentPage, totalPages));
  return {
    percentage: (clamped / totalPages) * 100,
    currentPage: clamped,
    totalPages,
  };
}
