export type ClockFormat = "12h" | "24h";
export type ClockFont = "sans" | "serif" | "mono";

export interface ClockTime {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
}

export const TIMEZONE_OPTIONS = [
  { value: "Asia/Seoul", label: "서울 (KST)" },
  { value: "Asia/Tokyo", label: "도쿄 (JST)" },
  { value: "Asia/Shanghai", label: "상하이 (CST)" },
  { value: "America/New_York", label: "뉴욕 (ET)" },
  { value: "America/Los_Angeles", label: "LA (PT)" },
  { value: "America/Chicago", label: "시카고 (CT)" },
  { value: "Europe/London", label: "런던 (GMT)" },
  { value: "Europe/Paris", label: "파리 (CET)" },
  { value: "Pacific/Auckland", label: "오클랜드 (NZST)" },
] as const;

export const FONT_FAMILY_MAP: Record<ClockFont, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  mono: "ui-monospace, SFMono-Regular, monospace",
};

export function getClockTime(
  timezone: string,
  format: ClockFormat,
): ClockTime {
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
}
