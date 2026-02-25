import { differenceInWeeks, isValid } from "date-fns";

interface LifeCalendarResult {
  totalWeeks: number;
  livedWeeks: number;
  livedYears: number;
  livedRemainWeeks: number;
  percentage: number;
}

/** "2026-02-25" → 로컬 자정 Date (시간대 안전) */
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

export function calculateLifeCalendar(
  birthdate: string,
  lifespan: number,
): LifeCalendarResult {
  const totalWeeks = lifespan * 52;
  const parsed = toLocalDate(birthdate);

  if (!parsed) {
    return { totalWeeks, livedWeeks: 0, livedYears: 0, livedRemainWeeks: 0, percentage: 0 };
  }

  const today = todayLocal();
  const raw = differenceInWeeks(today, parsed);
  const livedWeeks = Math.max(0, Math.min(raw, totalWeeks));
  const livedYears = Math.floor(livedWeeks / 52);
  const livedRemainWeeks = livedWeeks % 52;
  const percentage = totalWeeks > 0 ? (livedWeeks / totalWeeks) * 100 : 0;

  return { totalWeeks, livedWeeks, livedYears, livedRemainWeeks, percentage };
}
