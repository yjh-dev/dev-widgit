export function clampLevel(v: number): number {
  return Math.max(0, Math.min(100, v));
}

export function getBatteryColor(level: number, customColor?: string): string {
  if (customColor) return customColor;
  if (level < 20) return "EF4444";
  if (level < 50) return "F59E0B";
  return "22C55E";
}
