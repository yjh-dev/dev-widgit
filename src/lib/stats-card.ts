export type TrendDirection = "up" | "down" | "none";

export interface StatItem {
  label: string;
  value: string;
  trend: TrendDirection;
  trendValue: string; // e.g. "+12%"
}

export function serializeStats(stats: StatItem[]): string {
  return stats
    .map(
      (s) =>
        `${encodeURIComponent(s.label)}~${encodeURIComponent(s.value)}~${s.trend}~${encodeURIComponent(s.trendValue)}`,
    )
    .join("|");
}

export function deserializeStats(raw: string): StatItem[] {
  if (!raw) return [];
  return raw.split("|").map((entry) => {
    const parts = entry.split("~");
    return {
      label: decodeURIComponent(parts[0] || ""),
      value: decodeURIComponent(parts[1] || "0"),
      trend: (parts[2] || "none") as TrendDirection,
      trendValue: decodeURIComponent(parts[3] || ""),
    };
  });
}
