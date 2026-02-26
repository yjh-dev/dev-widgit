export type NumberStyle = "quarter" | "all";

export interface HandAngles {
  hour: number;
  minute: number;
  second: number;
}

export function getHandAngles(timezone: string): HandAngles {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    const s = Number(parts.find((p) => p.type === "second")?.value ?? 0);

    return {
      hour: (h % 12) * 30 + m * 0.5,
      minute: m * 6 + s * 0.1,
      second: s * 6,
    };
  } catch {
    return getHandAngles("Asia/Seoul");
  }
}

export interface NumberPosition {
  num: number;
  x: number;
  y: number;
}

const RADIUS = 80;
const CX = 100;
const CY = 100;

function numPos(n: number): NumberPosition {
  const angle = ((n * 30 - 90) * Math.PI) / 180;
  return {
    num: n,
    x: CX + RADIUS * Math.cos(angle),
    y: CY + RADIUS * Math.sin(angle),
  };
}

export function getQuarterNumbers(): NumberPosition[] {
  return [12, 3, 6, 9].map(numPos);
}

export function getAllNumbers(): NumberPosition[] {
  return Array.from({ length: 12 }, (_, i) => numPos(i + 1));
}

export interface TickMark {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isHour: boolean;
}

export function getTickMarks(): TickMark[] {
  const ticks: TickMark[] = [];
  const outerR = 92;
  const hourInnerR = 82;
  const minInnerR = 87;

  for (let i = 0; i < 60; i++) {
    const angle = ((i * 6 - 90) * Math.PI) / 180;
    const isHour = i % 5 === 0;
    const innerR = isHour ? hourInnerR : minInnerR;
    ticks.push({
      x1: CX + outerR * Math.cos(angle),
      y1: CY + outerR * Math.sin(angle),
      x2: CX + innerR * Math.cos(angle),
      y2: CY + innerR * Math.sin(angle),
      isHour,
    });
  }
  return ticks;
}
