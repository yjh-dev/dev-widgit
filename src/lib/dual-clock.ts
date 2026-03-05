export type DualClockFormat = "12h" | "24h";

export interface DualTimeInfo {
  time: string;
  date: string;
  label: string;
}

export const DUAL_TIMEZONE_OPTIONS = [
  { value: "Asia/Seoul", label: "서울" },
  { value: "Asia/Tokyo", label: "도쿄" },
  { value: "Asia/Shanghai", label: "상하이" },
  { value: "Asia/Hong_Kong", label: "홍콩" },
  { value: "Asia/Bangkok", label: "방콕" },
  { value: "Asia/Singapore", label: "싱가포르" },
  { value: "Asia/Kolkata", label: "뭄바이" },
  { value: "Asia/Dubai", label: "두바이" },
  { value: "Australia/Sydney", label: "시드니" },
  { value: "Pacific/Auckland", label: "오클랜드" },
  { value: "Europe/London", label: "런던" },
  { value: "Europe/Paris", label: "파리" },
  { value: "Europe/Berlin", label: "베를린" },
  { value: "Europe/Moscow", label: "모스크바" },
  { value: "America/New_York", label: "뉴욕" },
  { value: "America/Chicago", label: "시카고" },
  { value: "America/Los_Angeles", label: "LA" },
  { value: "America/Sao_Paulo", label: "상파울루" },
  { value: "Pacific/Honolulu", label: "하와이" },
];

export function formatDualTime(
  timezone: string,
  format: DualClockFormat,
): { time: string; date: string } {
  try {
    const now = new Date();

    const timeFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: format === "12h",
    });
    const time = timeFmt.format(now);

    const dateFmt = new Intl.DateTimeFormat("ko-KR", {
      timeZone: timezone,
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    const date = dateFmt.format(now);

    return { time, date };
  } catch {
    return formatDualTime("Asia/Seoul", format);
  }
}
