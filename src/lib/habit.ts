export type HabitView = "week" | "month";

export interface HabitDay {
  date: string; // YYYY-MM-DD
  dayOfWeek: number; // 0=Sun
  dayLabel: string;
  isToday: boolean;
  isPast: boolean;
}

const DAY_LABELS_KO = ["일", "월", "화", "수", "목", "금", "토"];

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getWeekDays(weekStart: "sun" | "mon"): HabitDay[] {
  const now = new Date();
  const today = toDateStr(now);
  const dow = now.getDay();
  const startOffset = weekStart === "mon" ? (dow === 0 ? 6 : dow - 1) : dow;

  const days: HabitDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - startOffset + i);
    const dateStr = toDateStr(d);
    days.push({
      date: dateStr,
      dayOfWeek: d.getDay(),
      dayLabel: DAY_LABELS_KO[d.getDay()],
      isToday: dateStr === today,
      isPast: dateStr < today,
    });
  }
  return days;
}

export function getMonthGrid(): HabitDay[] {
  const now = new Date();
  const today = toDateStr(now);
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: HabitDay[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = toDateStr(date);
    days.push({
      date: dateStr,
      dayOfWeek: date.getDay(),
      dayLabel: DAY_LABELS_KO[date.getDay()],
      isToday: dateStr === today,
      isPast: dateStr < today,
    });
  }
  return days;
}

export function parseCheckedDates(raw: string): Set<string> {
  if (!raw) return new Set();
  return new Set(raw.split(",").filter(Boolean));
}

export function serializeCheckedDates(dates: Set<string>): string {
  return Array.from(dates).sort().join(",");
}
