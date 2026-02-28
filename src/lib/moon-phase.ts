export type MoonStyle = "realistic" | "simple" | "emoji";
export type MoonSize = "sm" | "md" | "lg";

export const MOON_SIZE_MAP: Record<MoonSize, number> = {
  sm: 80,
  md: 120,
  lg: 160,
};

export interface MoonPhaseData {
  phase: number; // 0~1
  name: string;
  emoji: string;
  illumination: number; // 0~100
}

const PHASE_NAMES: { max: number; name: string; emoji: string }[] = [
  { max: 0.0625, name: "삭 (새달)", emoji: "🌑" },
  { max: 0.1875, name: "초승달", emoji: "🌒" },
  { max: 0.3125, name: "상현달", emoji: "🌓" },
  { max: 0.4375, name: "볼록한 상현달", emoji: "🌔" },
  { max: 0.5625, name: "보름달", emoji: "🌕" },
  { max: 0.6875, name: "볼록한 하현달", emoji: "🌖" },
  { max: 0.8125, name: "하현달", emoji: "🌗" },
  { max: 0.9375, name: "그믐달", emoji: "🌘" },
  { max: 1.0, name: "삭 (새달)", emoji: "🌑" },
];

// Known new moon: 2000-01-06 18:14 UTC
const KNOWN_NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)).getTime();
const SYNODIC_MONTH = 29.53058770576;

export function getMoonPhase(date: Date = new Date()): MoonPhaseData {
  const diffDays = (date.getTime() - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
  const phase = ((diffDays % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH / SYNODIC_MONTH;

  const entry = PHASE_NAMES.find((p) => phase < p.max) ?? PHASE_NAMES[PHASE_NAMES.length - 1];

  // Illumination: 0 at new moon, 100 at full moon
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);

  return {
    phase,
    name: entry.name,
    emoji: entry.emoji,
    illumination,
  };
}

export function getNextFullMoon(from: Date = new Date()): Date {
  const diffDays = (from.getTime() - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
  const currentCycle = diffDays / SYNODIC_MONTH;
  const nextFullCycle = Math.ceil(currentCycle - 0.5) + 0.5;
  const nextFullMs = KNOWN_NEW_MOON + nextFullCycle * SYNODIC_MONTH * 24 * 60 * 60 * 1000;
  return new Date(nextFullMs);
}

export function daysUntil(target: Date, from: Date = new Date()): number {
  return Math.ceil((target.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
}
