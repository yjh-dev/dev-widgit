export interface ChangelogEntry {
  version: string;
  date: string; // YYYY-MM-DD
  desc: string;
}

export function serializeEntries(entries: ChangelogEntry[]): string {
  return entries
    .map(
      (e) =>
        `${encodeURIComponent(e.version)}~${e.date}~${encodeURIComponent(e.desc)}`,
    )
    .join("|");
}

export function deserializeEntries(s: string): ChangelogEntry[] {
  if (!s) return [];
  try {
    return s
      .split("|")
      .map((item) => {
        const [version, date, desc] = item.split("~");
        return {
          version: decodeURIComponent(version || ""),
          date: date || "",
          desc: decodeURIComponent(desc || ""),
        };
      })
      .filter((e) => e.version || e.desc);
  } catch {
    return [];
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  return `${y}년 ${m}월 ${d}일`;
}
