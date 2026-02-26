export interface CounterConfig {
  label: string;
  initial: number;
  step: number;
  min?: number;
  max?: number;
}

export function buildStorageKey(config: CounterConfig): string {
  return `widgit-counter:${config.label}:${config.initial}:${config.step}`;
}

export function loadCount(key: string, initial: number): number {
  if (typeof window === "undefined") return initial;
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return initial;
    const n = Number(stored);
    return Number.isFinite(n) ? n : initial;
  } catch {
    return initial;
  }
}

export function saveCount(key: string, value: number): void {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // localStorage unavailable
  }
}

export function clampCount(value: number, min?: number, max?: number): number {
  let v = value;
  if (min !== undefined && v < min) v = min;
  if (max !== undefined && v > max) v = max;
  return v;
}

export function formatCount(n: number): string {
  return n.toLocaleString();
}
