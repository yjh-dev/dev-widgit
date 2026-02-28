export type LinkStyle = "filled" | "outline" | "ghost";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string; // emoji or empty
}

/** Generate a unique id */
export function genLinkId(): string {
  return `lk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Serialize links to pipe format: title~url~icon|title~url~icon */
export function serializeLinks(links: LinkItem[]): string {
  return links
    .filter((l) => l.title.trim() || l.url.trim())
    .map((l) => `${encodeURIComponent(l.title)}~${encodeURIComponent(l.url)}~${encodeURIComponent(l.icon)}`)
    .join("|");
}

/** Deserialize pipe-separated links */
export function deserializeLinks(raw: string): LinkItem[] {
  if (!raw) return [];
  return raw.split("|").map((entry, i) => {
    const parts = entry.split("~");
    return {
      id: `lk-${i}`,
      title: decodeURIComponent(parts[0] || ""),
      url: decodeURIComponent(parts[1] || ""),
      icon: decodeURIComponent(parts[2] || ""),
    };
  });
}

/** Extract domain for favicon */
export function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname;
  } catch {
    return "";
  }
}

export function getFaviconUrl(url: string): string {
  const domain = extractDomain(url);
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

export function normalizeUrl(url: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
}
