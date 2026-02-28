export interface MatrixItem {
  text: string;
  quadrant: 0 | 1 | 2 | 3; // 0=TL, 1=TR, 2=BL, 3=BR
}

export const DEFAULT_LABELS: [string, string, string, string] = [
  "긴급+중요",
  "중요+비긴급",
  "긴급+비중요",
  "비긴급+비중요",
];

export const QUADRANT_COLORS: [string, string, string, string] = [
  "EF4444",
  "3B82F6",
  "F59E0B",
  "6B7280",
];

export function serializeItems(items: MatrixItem[]): string {
  return items
    .map((item) => `${encodeURIComponent(item.text)}~${item.quadrant}`)
    .join("|");
}

export function deserializeItems(s: string): MatrixItem[] {
  if (!s) return [];
  try {
    return s
      .split("|")
      .map((part) => {
        const [text, q] = part.split("~");
        const quadrant = Number(q);
        if (quadrant < 0 || quadrant > 3) return null;
        return {
          text: decodeURIComponent(text || ""),
          quadrant: quadrant as 0 | 1 | 2 | 3,
        };
      })
      .filter((item): item is MatrixItem => item !== null && !!item.text);
  } catch {
    return [];
  }
}

export function serializeLabels(labels: [string, string, string, string]): string {
  return labels.map((l) => encodeURIComponent(l)).join("|");
}

export function deserializeLabels(s: string): [string, string, string, string] | null {
  if (!s) return null;
  try {
    const parts = s.split("|").map((p) => decodeURIComponent(p));
    if (parts.length !== 4) return null;
    return parts as [string, string, string, string];
  } catch {
    return null;
  }
}
