export const DEFAULT_EMOJIS = "🎉🎊✨💖🌟";

export type SpeedKey = "slow" | "normal" | "fast";
export type DensityKey = "sparse" | "normal" | "dense";

export const SPEED_OPTIONS: { value: SpeedKey; label: string }[] = [
  { value: "slow", label: "느리게" },
  { value: "normal", label: "보통" },
  { value: "fast", label: "빠르게" },
];

export const DENSITY_OPTIONS: { value: DensityKey; label: string }[] = [
  { value: "sparse", label: "적게" },
  { value: "normal", label: "보통" },
  { value: "dense", label: "많이" },
];

export const SPEED_MULTIPLIER: Record<SpeedKey, number> = {
  slow: 0.5,
  normal: 1,
  fast: 2,
};

export const DENSITY_COUNT: Record<DensityKey, number> = {
  sparse: 8,
  normal: 15,
  dense: 25,
};

export interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

export function parseEmojis(s: string): string[] {
  if (!s) return Array.from(DEFAULT_EMOJIS);
  const chars = Array.from(s);
  return chars.length > 0 ? chars : Array.from(DEFAULT_EMOJIS);
}

let nextId = 0;

export function createParticle(
  emojis: string[],
  width: number,
  height: number,
  minSize: number,
  maxSize: number,
): Particle {
  return {
    id: nextId++,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    x: Math.random() * width,
    y: -(Math.random() * height),
    speed: 0.5 + Math.random() * 1.5,
    size: minSize + Math.random() * (maxSize - minSize),
    opacity: 0.5 + Math.random() * 0.5,
  };
}

export function parseSpeed(raw: string | null): SpeedKey {
  if (!raw) return "normal";
  const valid: SpeedKey[] = ["slow", "normal", "fast"];
  return valid.includes(raw as SpeedKey) ? (raw as SpeedKey) : "normal";
}

export function parseDensity(raw: string | null): DensityKey {
  if (!raw) return "normal";
  const valid: DensityKey[] = ["sparse", "normal", "dense"];
  return valid.includes(raw as DensityKey) ? (raw as DensityKey) : "normal";
}
