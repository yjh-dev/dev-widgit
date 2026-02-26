export type WeekStartDay = "sun" | "mon";
export type HeaderFormat = "full" | "short" | "none";
export type DayNameLang = "ko" | "en";

export interface CalendarDay {
  day: number;
  currentMonth: boolean;
  isToday: boolean;
}

const DAY_NAMES_KO_SUN = ["일", "월", "화", "수", "목", "금", "토"];
const DAY_NAMES_KO_MON = ["월", "화", "수", "목", "금", "토", "일"];
const DAY_NAMES_EN_SUN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_EN_MON = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getDayNames(lang: DayNameLang, weekStart: WeekStartDay): string[] {
  if (lang === "ko") return weekStart === "sun" ? DAY_NAMES_KO_SUN : DAY_NAMES_KO_MON;
  return weekStart === "sun" ? DAY_NAMES_EN_SUN : DAY_NAMES_EN_MON;
}

export function todayLocal(): { year: number; month: number; day: number } {
  const n = new Date();
  return { year: n.getFullYear(), month: n.getMonth(), day: n.getDate() };
}

export function getCalendarMonth(
  year: number,
  month: number,
  weekStart: WeekStartDay,
): CalendarDay[] {
  const today = todayLocal();
  const firstDay = new Date(year, month, 1);
  const firstDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const startOffset = weekStart === "mon"
    ? (firstDow === 0 ? 6 : firstDow - 1)
    : firstDow;

  const cells: CalendarDay[] = [];

  // Previous month days
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({
      day: prevDays - i,
      currentMonth: false,
      isToday: false,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      currentMonth: true,
      isToday: year === today.year && month === today.month && d === today.day,
    });
  }

  // Next month days (fill to 42)
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      day: d,
      currentMonth: false,
      isToday: false,
    });
  }

  return cells;
}

export function formatHeader(
  year: number,
  month: number,
  lang: DayNameLang,
  format: HeaderFormat,
): string {
  if (format === "none") return "";
  if (lang === "ko") {
    if (format === "short") return `${year}.${String(month + 1).padStart(2, "0")}`;
    return `${year}년 ${month + 1}월`;
  }
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const shortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (format === "short") return `${shortNames[month]} ${year}`;
  return `${monthNames[month]} ${year}`;
}
