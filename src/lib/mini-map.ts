export type MapStyle = "standard" | "dark";

export function getStaticMapUrl(
  lat: number,
  lon: number,
  zoom: number,
  width: number,
  height: number,
): string {
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${zoom}&size=${width}x${height}&maptype=mapnik`;
}

export const MAP_STYLE_OPTIONS: { value: MapStyle; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "dark", label: "Dark" },
];
