import {
  getDaysInMonth,
  getDaysInYear,
  getDayOfYear,
  isLeapYear,
} from "date-fns";

export type ProgressType = "day" | "week" | "month" | "year";

interface TimeProgressResult {
  percentage: number;
  label: string;
}

function now(): Date {
  return new Date();
}

function calcDayProgress(d: Date): TimeProgressResult {
  const totalSeconds = 24 * 60 * 60;
  const elapsed = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  const percentage = (elapsed / totalSeconds) * 100;
  return { percentage, label: "오늘" };
}

function calcMonthProgress(d: Date): TimeProgressResult {
  const daysInMonth = getDaysInMonth(d);
  const elapsed = d.getDate() - 1 + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400;
  const percentage = (elapsed / daysInMonth) * 100;
  const month = d.getMonth() + 1;
  return { percentage, label: `${month}월` };
}

function calcWeekProgress(d: Date): TimeProgressResult {
  const dayOfWeek = d.getDay(); // 0=Sun ... 6=Sat
  const elapsed = dayOfWeek + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400;
  const percentage = (elapsed / 7) * 100;
  return { percentage, label: "이번 주" };
}

function calcYearProgress(d: Date): TimeProgressResult {
  const totalDays = getDaysInYear(d);
  const dayOfYear = getDayOfYear(d);
  const elapsed = dayOfYear - 1 + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400;
  const percentage = (elapsed / totalDays) * 100;
  return { percentage, label: `${d.getFullYear()}년` };
}

export function calculateTimeProgress(type: ProgressType): TimeProgressResult {
  const d = now();

  switch (type) {
    case "day":
      return calcDayProgress(d);
    case "week":
      return calcWeekProgress(d);
    case "month":
      return calcMonthProgress(d);
    case "year":
      return calcYearProgress(d);
  }
}
