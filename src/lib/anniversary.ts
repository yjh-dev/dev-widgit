import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, isValid } from "date-fns";

/** "2026-03-05" → 로컬 자정 Date (시간대 안전) */
function toLocalDate(dateStr: string): Date | null {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isValid(d) ? d : null;
}

function todayLocal(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

export interface AnniversaryResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
  nextHundred: number;
}

/**
 * 시작 날짜로부터 오늘까지의 기념일 정보를 계산한다.
 * 시작일 당일을 1일째로 카운트한다.
 */
export function calculateAnniversary(startDate: string): AnniversaryResult | null {
  const start = toLocalDate(startDate);
  if (!start) return null;

  const today = todayLocal();
  const rawDays = differenceInDays(today, start);
  const days = rawDays + 1; // 시작일 = 1일째

  const weeks = differenceInWeeks(today, start);
  const months = differenceInMonths(today, start);
  const years = differenceInYears(today, start);

  // 다음 100일 단위 기념일 계산
  const nextHundred = Math.ceil(days / 100) * 100;

  return { days, weeks, months, years, nextHundred };
}
