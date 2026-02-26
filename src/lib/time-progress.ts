import {
  getDaysInMonth,
  getDaysInYear,
  getDayOfYear,
  isLeapYear,
} from "date-fns";

export type ProgressType = "day" | "week" | "month" | "year";
export type WeekStart = "sun" | "mon";

interface TimeProgressResult {
  percentage: number;
  label: string;
  remaining: string;
}

function now(): Date {
  return new Date();
}

function formatRemaining(remainSeconds: number): string {
  if (remainSeconds <= 0) return "0분";
  const days = Math.floor(remainSeconds / 86400);
  const hours = Math.floor((remainSeconds % 86400) / 3600);
  const minutes = Math.floor((remainSeconds % 3600) / 60);
  if (days > 0) return hours > 0 ? `${days}일 ${hours}시간` : `${days}일`;
  if (hours > 0) return minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`;
  return `${minutes}분`;
}

function calcDayProgress(d: Date): TimeProgressResult {
  const totalSeconds = 24 * 60 * 60;
  const elapsed = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
  const percentage = (elapsed / totalSeconds) * 100;
  const remainSec = totalSeconds - elapsed;
  return { percentage, label: "오늘", remaining: formatRemaining(remainSec) };
}

function calcMonthProgress(d: Date): TimeProgressResult {
  const daysInMonth = getDaysInMonth(d);
  const elapsed = d.getDate() - 1 + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400;
  const percentage = (elapsed / daysInMonth) * 100;
  const month = d.getMonth() + 1;
  const remainSec = (daysInMonth - elapsed) * 86400;
  return { percentage, label: `${month}월`, remaining: formatRemaining(remainSec) };
}

function calcWeekProgress(d: Date, weekStart: WeekStart = "sun"): TimeProgressResult {
  let dayOfWeek = d.getDay(); // 0=Sun ... 6=Sat
  if (weekStart === "mon") {
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Mon=0 ... Sun=6
  }
  const elapsed = dayOfWeek + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400;
  const percentage = (elapsed / 7) * 100;
  const remainSec = (7 - elapsed) * 86400;
  return { percentage, label: "이번 주", remaining: formatRemaining(remainSec) };
}

function calcYearProgress(d: Date): TimeProgressResult {
  const totalDays = getDaysInYear(d);
  const dayOfYear = getDayOfYear(d);
  const elapsed = dayOfYear - 1 + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400;
  const percentage = (elapsed / totalDays) * 100;
  const remainSec = (totalDays - elapsed) * 86400;
  return { percentage, label: `${d.getFullYear()}년`, remaining: formatRemaining(remainSec) };
}

export function calculateTimeProgress(type: ProgressType, weekStart: WeekStart = "sun"): TimeProgressResult {
  const d = now();

  switch (type) {
    case "day":
      return calcDayProgress(d);
    case "week":
      return calcWeekProgress(d, weekStart);
    case "month":
      return calcMonthProgress(d);
    case "year":
      return calcYearProgress(d);
  }
}
