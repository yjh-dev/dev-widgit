export interface TimetableEntry {
  day: number; // 0=Mon, 1=Tue, ... 4=Fri
  hour: number; // start hour (9-18)
  duration: number; // in hours (1 or 2)
  title: string;
  color: string; // hex
}

export const DAY_LABELS = ["월", "화", "수", "목", "금"];
export const DAY_LABELS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function serializeEntries(entries: TimetableEntry[]): string {
  return entries
    .map(
      (e) =>
        `${e.day}~${e.hour}~${e.duration}~${encodeURIComponent(e.title)}~${e.color}`,
    )
    .join("|");
}

export function deserializeEntries(raw: string): TimetableEntry[] {
  if (!raw) return [];
  try {
    return raw
      .split("|")
      .map((s) => {
        const p = s.split("~");
        return {
          day: Number(p[0]),
          hour: Number(p[1]),
          duration: Number(p[2] || 1),
          title: decodeURIComponent(p[3] || ""),
          color: p[4] || "2563EB",
        };
      })
      .filter((e) => e.title);
  } catch {
    return [];
  }
}

export const ENTRY_COLORS = [
  "2563EB",
  "E11D48",
  "22C55E",
  "F59E0B",
  "7C3AED",
  "06B6D4",
  "EC4899",
  "F97316",
];
