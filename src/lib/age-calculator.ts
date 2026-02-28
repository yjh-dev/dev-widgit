import { isValid } from "date-fns";

export type AgeStyle = "full" | "compact" | "years-only";

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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

export function calcAge(birthdate: Date): AgeResult {
  const now = new Date();
  const today = todayLocal();

  let years = today.getFullYear() - birthdate.getFullYear();
  let months = today.getMonth() - birthdate.getMonth();
  let days = today.getDate() - birthdate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return { years, months, days, hours, minutes, seconds };
}

export function formatKoreanAge(age: AgeResult): string {
  return `${age.years}년 ${age.months}개월 ${age.days}일`;
}

export function formatCompactAge(age: AgeResult): string {
  const time = `${String(age.hours).padStart(2, "0")}:${String(age.minutes).padStart(2, "0")}:${String(age.seconds).padStart(2, "0")}`;
  return `${age.years}y ${age.months}m ${age.days}d ${time}`;
}
