export interface ProgressItem {
  label: string;
  value: number;
  max: number;
  color: string;
}

export type BarHeight = "thin" | "default" | "thick";
export type ProgressLayout = "stacked" | "grouped";

export const DEFAULT_COLORS: string[] = [
  "6366F1",
  "EC4899",
  "22C55E",
  "F59E0B",
  "3B82F6",
  "EF4444",
];

export const BAR_HEIGHT_MAP: Record<BarHeight, number> = {
  thin: 4,
  default: 8,
  thick: 16,
};

export function serializeItems(items: ProgressItem[]): string {
  return items
    .map(
      (item) =>
        `${encodeURIComponent(item.label)}~${item.value}~${item.max}~${item.color}`
    )
    .join("|");
}

export function deserializeItems(s: string): ProgressItem[] {
  if (!s) return [];
  try {
    return s
      .split("|")
      .map((part) => {
        const [label, value, max, color] = part.split("~");
        return {
          label: decodeURIComponent(label || ""),
          value: Math.max(0, Number(value) || 0),
          max: Math.max(1, Number(max) || 100),
          color: /^[0-9a-fA-F]{6}$/.test(color || "") ? color : "6366F1",
        };
      })
      .filter((item) => !!item.label);
  } catch {
    return [];
  }
}
