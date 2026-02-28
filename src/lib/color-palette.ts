export type PaletteLayout = "horizontal" | "vertical" | "grid";

export function serializeColors(colors: string[]): string {
  return colors.join("|");
}

export function deserializeColors(raw: string): string[] {
  if (!raw) return ["2563EB", "7C3AED", "EC4899", "F59E0B"];
  return raw.split("|").filter(Boolean);
}
