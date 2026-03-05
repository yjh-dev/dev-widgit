import { isValid } from "date-fns";

/** "2026-03-05" → 로컬 자정 Date (시간대 안전) */
function toLocalDate(dateStr: string): Date | null {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isValid(d) ? d : null;
}

export interface CountupResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

/**
 * 시작 날짜로부터 현재까지 경과한 실시간 시간을 계산한다.
 */
export function calculateCountup(startDate: string): CountupResult | null {
  const start = toLocalDate(startDate);
  if (!start) return null;

  const now = new Date();
  const diffMs = now.getTime() - start.getTime();

  if (diffMs < 0) return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days: totalDays, hours, minutes, seconds, totalDays };
}
