export interface RadarItem {
  label: string;
  value: number; // 0-100
}

export function serializeItems(items: RadarItem[]): string {
  return items
    .map((item) => `${encodeURIComponent(item.label)}~${item.value}`)
    .join("|");
}

export function deserializeItems(raw: string): RadarItem[] {
  if (!raw) return [];
  try {
    return raw
      .split("|")
      .map((seg) => {
        const [label, val] = seg.split("~");
        return {
          label: decodeURIComponent(label || ""),
          value: Math.max(0, Math.min(100, Number(val) || 0)),
        };
      })
      .filter((item) => item.label);
  } catch {
    return [];
  }
}

export function getPolygonPoints(
  items: RadarItem[],
  cx: number,
  cy: number,
  radius: number,
): string {
  const count = items.length;
  if (count < 3) return "";

  return items
    .map((item, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const r = (item.value / 100) * radius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");
}

export function getAxisEndpoints(
  count: number,
  cx: number,
  cy: number,
  radius: number,
): { x: number; y: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

export function getGridPolygonPoints(
  count: number,
  cx: number,
  cy: number,
  radius: number,
): string {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");
}

export function getLabelPositions(
  count: number,
  cx: number,
  cy: number,
  radius: number,
): { x: number; y: number; anchor: string }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const labelR = radius + 14;
    const x = cx + labelR * Math.cos(angle);
    const y = cy + labelR * Math.sin(angle);

    let anchor = "middle";
    const cos = Math.cos(angle);
    if (cos > 0.3) anchor = "start";
    else if (cos < -0.3) anchor = "end";

    return { x, y, anchor };
  });
}
