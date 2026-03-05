export type GalleryTransition = "fade" | "slide";

export function parseImageUrls(raw: string): string[] {
  if (!raw) return [];
  return raw.split("|").filter((url) => url.trim());
}
