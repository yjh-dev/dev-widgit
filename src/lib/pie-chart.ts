export interface PieSlice {
  label: string;
  value: number;
  color: string; // hex without #
}

export type PieChartStyle = "donut" | "pie";

export const DEFAULT_COLORS: string[] = [
  "6366F1",
  "EC4899",
  "F59E0B",
  "22C55E",
  "3B82F6",
  "EF4444",
  "8B5CF6",
  "06B6D4",
];

export function serializeSlices(slices: PieSlice[]): string {
  return slices
    .map(
      (s) =>
        `${encodeURIComponent(s.label)}~${s.value}~${s.color}`,
    )
    .join("|");
}

export function deserializeSlices(raw: string): PieSlice[] {
  if (!raw) return [];
  try {
    return raw
      .split("|")
      .map((item) => {
        const [label, valueStr, color] = item.split("~");
        return {
          label: decodeURIComponent(label || ""),
          value: Math.max(0, Number(valueStr) || 0),
          color: color || DEFAULT_COLORS[0],
        };
      })
      .filter((s) => s.label && s.value > 0);
  } catch {
    return [];
  }
}

export interface SliceAngle {
  startAngle: number;
  endAngle: number;
  percentage: number;
}

export function calcSliceAngles(slices: PieSlice[]): SliceAngle[] {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  if (total <= 0) return slices.map(() => ({ startAngle: 0, endAngle: 0, percentage: 0 }));

  let current = -90; // start from top
  return slices.map((s) => {
    const percentage = (s.value / total) * 100;
    const angle = (s.value / total) * 360;
    const startAngle = current;
    const endAngle = current + angle;
    current = endAngle;
    return { startAngle, endAngle, percentage };
  });
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const span = endAngle - startAngle;
  if (span >= 360) {
    // full circle — two arcs
    const mid = startAngle + 180;
    const s1 = polarToCartesian(cx, cy, r, startAngle);
    const m1 = polarToCartesian(cx, cy, r, mid);
    return [
      `M ${s1.x} ${s1.y}`,
      `A ${r} ${r} 0 1 1 ${m1.x} ${m1.y}`,
      `A ${r} ${r} 0 1 1 ${s1.x} ${s1.y}`,
      "Z",
    ].join(" ");
  }
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = span > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function describeDonutArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number,
): string {
  const span = endAngle - startAngle;
  if (span >= 360) {
    const os1 = polarToCartesian(cx, cy, outerR, startAngle);
    const om1 = polarToCartesian(cx, cy, outerR, startAngle + 180);
    const is1 = polarToCartesian(cx, cy, innerR, startAngle);
    const im1 = polarToCartesian(cx, cy, innerR, startAngle + 180);
    return [
      `M ${os1.x} ${os1.y}`,
      `A ${outerR} ${outerR} 0 1 1 ${om1.x} ${om1.y}`,
      `A ${outerR} ${outerR} 0 1 1 ${os1.x} ${os1.y}`,
      `M ${is1.x} ${is1.y}`,
      `A ${innerR} ${innerR} 0 1 0 ${im1.x} ${im1.y}`,
      `A ${innerR} ${innerR} 0 1 0 ${is1.x} ${is1.y}`,
      "Z",
    ].join(" ");
  }
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = span > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}
