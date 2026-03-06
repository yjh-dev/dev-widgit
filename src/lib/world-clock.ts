export const WORLD_CLOCK_TIMEZONE_OPTIONS = [
  { value: "Asia/Seoul", label: "서울", short: "KST" },
  { value: "Asia/Tokyo", label: "도쿄", short: "JST" },
  { value: "Asia/Shanghai", label: "상하이", short: "CST" },
  { value: "America/New_York", label: "뉴욕", short: "EST" },
  { value: "America/Los_Angeles", label: "LA", short: "PST" },
  { value: "Europe/London", label: "런던", short: "GMT" },
  { value: "Europe/Paris", label: "파리", short: "CET" },
  { value: "Australia/Sydney", label: "시드니", short: "AEST" },
  { value: "Asia/Dubai", label: "두바이", short: "GST" },
  { value: "Asia/Singapore", label: "싱가포르", short: "SGT" },
];

export type WorldClockFormat = "12h" | "24h";

export function serializeZones(zones: string[]): string {
  return zones.join("|");
}

export function deserializeZones(raw: string): string[] {
  if (!raw) return ["Asia/Seoul", "America/New_York"];
  return raw.split("|").filter(Boolean);
}

export function getTimezoneShort(tz: string): string {
  return WORLD_CLOCK_TIMEZONE_OPTIONS.find((t) => t.value === tz)?.short ?? tz.split("/").pop() ?? tz;
}

export function getTimezoneLabel(tz: string): string {
  return WORLD_CLOCK_TIMEZONE_OPTIONS.find((t) => t.value === tz)?.label ?? tz.split("/").pop() ?? tz;
}

export function serializeLabels(labels: string[]): string {
  return labels.join("|");
}

export function deserializeLabels(raw: string): string[] {
  if (!raw) return [];
  return raw.split("|");
}

export function getWorldClockTime(
  tz: string,
  format: WorldClockFormat,
): { hours: string; minutes: string; seconds: string; ampm: string } {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: format === "12h",
  });
  const parts = formatter.formatToParts(now);
  const h = parts.find((p) => p.type === "hour")?.value ?? "00";
  const m = parts.find((p) => p.type === "minute")?.value ?? "00";
  const s = parts.find((p) => p.type === "second")?.value ?? "00";
  const ampm = parts.find((p) => p.type === "dayPeriod")?.value ?? "";

  return {
    hours: h.padStart(2, "0"),
    minutes: m.padStart(2, "0"),
    seconds: s.padStart(2, "0"),
    ampm,
  };
}

export function getWorldClockDate(tz: string): string {
  try {
    const now = new Date();
    const dateFmt = new Intl.DateTimeFormat("ko-KR", {
      timeZone: tz,
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    return dateFmt.format(now);
  } catch {
    return "";
  }
}
