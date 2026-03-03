"use client";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  contributions: ContributionDay[];
}

const API_BASE = "https://github-contributions-api.jogruber.de/v4";

export async function fetchContributions(
  username: string,
  year?: number,
): Promise<ContributionData> {
  const url = year
    ? `${API_BASE}/${encodeURIComponent(username)}?y=${year}`
    : `${API_BASE}/${encodeURIComponent(username)}?y=last`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub 기여도를 불러올 수 없습니다 (${res.status})`);

  const json = await res.json();
  const totalMap: Record<string, number> = json.total ?? {};
  const total = Object.values(totalMap).reduce((a: number, b) => a + (b as number), 0);

  return {
    total,
    contributions: (json.contributions ?? []).map(
      (c: { date: string; count: number; level: number }) => ({
        date: c.date,
        count: c.count,
        level: Math.min(4, Math.max(0, c.level)) as 0 | 1 | 2 | 3 | 4,
      }),
    ),
  };
}

/**
 * Group contributions into weeks (columns) for the heatmap grid.
 * Each week is a column of 7 rows (Sun=0 .. Sat=6).
 * The first week may have empty slots at the top (before the first day's dow).
 */
export function groupByWeeks(contributions: ContributionDay[]): (ContributionDay | null)[][] {
  if (contributions.length === 0) return [];

  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  // Pad the first week with nulls for days before the start
  const firstDow = new Date(contributions[0].date).getDay(); // 0=Sun
  for (let i = 0; i < firstDow; i++) {
    currentWeek.push(null);
  }

  for (const day of contributions) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

/** Generate color for a given level using the accent color */
export function levelColor(level: 0 | 1 | 2 | 3 | 4, color: string): string {
  const opacities = ["15", "40", "80", "B0", "FF"];
  return `#${color}${opacities[level]}`;
}

/** Generate placeholder data for preview (no API call) */
export function generatePlaceholderData(year: number): ContributionDay[] {
  const days: ContributionDay[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const doy = Math.floor(
      (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000,
    );
    const hash = ((doy * 2654435761) >>> 0) % 100;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let count = 0;
    if (hash < 35) {
      level = 0;
      count = 0;
    } else if (hash < 55) {
      level = 1;
      count = 1 + (hash % 3);
    } else if (hash < 75) {
      level = 2;
      count = 4 + (hash % 4);
    } else if (hash < 90) {
      level = 3;
      count = 8 + (hash % 5);
    } else {
      level = 4;
      count = 13 + (hash % 8);
    }

    days.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      count,
      level,
    });
  }

  return days;
}

export interface ContributionStats {
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
}

/** Calculate streak and activity stats from contribution data */
export function calculateStats(contributions: ContributionDay[]): ContributionStats {
  if (contributions.length === 0) return { currentStreak: 0, longestStreak: 0, activeDays: 0 };

  let activeDays = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (const day of contributions) {
    if (day.count > 0) {
      activeDays++;
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Current streak: count backwards from the end
  // Allow today to have 0 contributions (check from yesterday)
  let currentStreak = 0;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  let startIdx = contributions.length - 1;
  // If the last entry is today and has 0 contributions, start from the day before
  if (contributions[startIdx]?.date === todayStr && contributions[startIdx]?.count === 0) {
    startIdx--;
  }

  for (let i = startIdx; i >= 0; i--) {
    if (contributions[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak, activeDays };
}

const MONTH_LABELS_KO = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

const MONTH_LABELS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function getMonthLabels(lang: "ko" | "en" = "ko") {
  return lang === "ko" ? MONTH_LABELS_KO : MONTH_LABELS_EN;
}
