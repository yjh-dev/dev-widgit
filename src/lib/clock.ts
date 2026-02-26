export type ClockFormat = "12h" | "24h";
export type ClockFont = "sans" | "serif" | "mono";
export type ClockDateFormat = "kr" | "en" | "short";

export interface ClockTime {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
}

export const TIMEZONE_OPTIONS = [
  // 아시아
  { value: "Asia/Seoul", label: "서울 (KST)" },
  { value: "Asia/Tokyo", label: "도쿄 (JST)" },
  { value: "Asia/Shanghai", label: "상하이 (CST)" },
  { value: "Asia/Hong_Kong", label: "홍콩 (HKT)" },
  { value: "Asia/Bangkok", label: "방콕 (ICT)" },
  { value: "Asia/Singapore", label: "싱가포르 (SGT)" },
  { value: "Asia/Kolkata", label: "뭄바이 (IST)" },
  { value: "Asia/Dubai", label: "두바이 (GST)" },
  // 오세아니아
  { value: "Australia/Sydney", label: "시드니 (AEST)" },
  { value: "Pacific/Auckland", label: "오클랜드 (NZST)" },
  // 유럽
  { value: "Europe/London", label: "런던 (GMT)" },
  { value: "Europe/Paris", label: "파리 (CET)" },
  { value: "Europe/Berlin", label: "베를린 (CET)" },
  { value: "Europe/Moscow", label: "모스크바 (MSK)" },
  // 아메리카
  { value: "America/New_York", label: "뉴욕 (ET)" },
  { value: "America/Chicago", label: "시카고 (CT)" },
  { value: "America/Los_Angeles", label: "LA (PT)" },
  { value: "America/Sao_Paulo", label: "상파울루 (BRT)" },
  { value: "Pacific/Honolulu", label: "하와이 (HST)" },
] as const;

export const CLOCK_DATE_FORMAT_OPTIONS: { value: ClockDateFormat; label: string }[] = [
  { value: "kr", label: "한국어 (2026년 2월 26일 (수))" },
  { value: "en", label: "영어 (Feb 26, 2026 (Wed))" },
  { value: "short", label: "짧게 (02.26 (수))" },
];

export function getClockDate(timezone: string, dateFmt: ClockDateFormat = "kr"): string {
  try {
    const now = new Date();

    if (dateFmt === "en") {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      });
      const parts = formatter.formatToParts(now);
      const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
      const month = parts.find((p) => p.type === "month")?.value ?? "";
      const day = parts.find((p) => p.type === "day")?.value ?? "";
      const year = parts.find((p) => p.type === "year")?.value ?? "";
      return `${month} ${day}, ${year} (${weekday})`;
    }

    if (dateFmt === "short") {
      const formatter = new Intl.DateTimeFormat("ko-KR", {
        timeZone: timezone,
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
      });
      const parts = formatter.formatToParts(now);
      const month = parts.find((p) => p.type === "month")?.value ?? "";
      const day = parts.find((p) => p.type === "day")?.value ?? "";
      const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
      return `${month}.${day} (${weekday})`;
    }

    // kr (default)
    const formatter = new Intl.DateTimeFormat("ko-KR", {
      timeZone: timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    return formatter.format(now);
  } catch {
    return getClockDate("Asia/Seoul", dateFmt);
  }
}

export function getClockTime(
  timezone: string,
  format: ClockFormat,
): ClockTime {
  try {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: format === "12h",
    });

    const parts = formatter.formatToParts(now);

    const h = parts.find((p) => p.type === "hour")?.value ?? "0";
    const m = parts.find((p) => p.type === "minute")?.value ?? "00";
    const s = parts.find((p) => p.type === "second")?.value ?? "00";
    const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value ?? "";

    return {
      hours: format === "24h" ? h.padStart(2, "0") : h,
      minutes: m,
      seconds: s,
      ampm: dayPeriod.toUpperCase(),
    };
  } catch {
    return getClockTime("Asia/Seoul", format);
  }
}
