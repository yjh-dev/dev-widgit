import { differenceInDays, isValid } from "date-fns";

type CalcType = "down" | "up";

interface DdayResult {
  dday: number | null;
  ddayLabel: string;
  effectiveDate: string;
}

/** "2026-02-25" → 로컬 자정 Date (시간대 안전) */
export function toLocalDate(dateStr: string): Date | null {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isValid(d) ? d : null;
}

function todayLocal(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function resolveAnnualDate(dateStr: string): string {
  const parsed = toLocalDate(dateStr);
  if (!parsed) return dateStr;

  const today = todayLocal();
  const thisYear = today.getFullYear();

  const thisYearDate = new Date(thisYear, parsed.getMonth(), parsed.getDate());
  if (thisYearDate >= today) {
    return `${thisYear}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
  }

  const nextYear = thisYear + 1;
  return `${nextYear}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
}

export function calculateDday(
  targetDate: string,
  calcType: CalcType = "down",
  isAnnual: boolean = false,
): DdayResult {
  const effectiveDate = isAnnual ? resolveAnnualDate(targetDate) : targetDate;
  const parsed = effectiveDate ? toLocalDate(effectiveDate) : null;

  if (!parsed) {
    return { dday: null, ddayLabel: "날짜를 선택하세요", effectiveDate: "" };
  }

  const today = todayLocal();
  const dday = differenceInDays(parsed, today);

  let ddayLabel: string;

  if (calcType === "up") {
    const elapsed = Math.abs(dday) + 1;
    ddayLabel = dday <= 0 ? `${elapsed}일째` : `D-${dday}`;
  } else {
    if (dday === 0) ddayLabel = "D-Day";
    else if (dday > 0) ddayLabel = `D-${dday}`;
    else ddayLabel = `D+${Math.abs(dday)}`;
  }

  return { dday, ddayLabel, effectiveDate };
}

export interface DdayTimeResult {
  hours: string;
  minutes: string;
  seconds: string;
}

export function calculateDdayWithTime(
  targetDate: string,
  isAnnual: boolean = false,
): DdayTimeResult | null {
  const effectiveDate = isAnnual ? resolveAnnualDate(targetDate) : targetDate;
  const parsed = effectiveDate ? toLocalDate(effectiveDate) : null;

  if (!parsed) return null;

  const now = new Date();
  const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  const diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return { hours, minutes, seconds };
}

export function calculateProgress(
  startDate: string,
  targetDate: string,
): number {
  const start = toLocalDate(startDate);
  const end = toLocalDate(targetDate);

  if (!start || !end) return 0;

  const today = todayLocal();
  const total = differenceInDays(end, start);
  if (total <= 0) return 100;

  const elapsed = differenceInDays(today, start);
  if (elapsed < 0) return 0;

  const percent = (elapsed / total) * 100;

  return Math.min(100, Math.round(percent));
}
