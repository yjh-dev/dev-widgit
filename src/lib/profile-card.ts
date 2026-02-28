export type ProfileLayout = "horizontal" | "vertical";
export type AvatarShape = "circle" | "rounded" | "square";

export interface SocialLink {
  type: string;   // "github" | "twitter" | "instagram" | "link" | etc.
  url: string;
  label: string;
}

export const SOCIAL_ICONS: Record<string, { label: string; prefix: string }> = {
  github: { label: "GitHub", prefix: "https://github.com/" },
  twitter: { label: "Twitter / X", prefix: "https://x.com/" },
  instagram: { label: "Instagram", prefix: "https://instagram.com/" },
  linkedin: { label: "LinkedIn", prefix: "https://linkedin.com/in/" },
  link: { label: "웹사이트", prefix: "" },
};

export const SOCIAL_TYPES = Object.keys(SOCIAL_ICONS);

/** Serialize social links to pipe-separated format: type:url|type:url */
export function serializeSocials(links: SocialLink[]): string {
  return links
    .filter((l) => l.url.trim())
    .map((l) => `${l.type}:${encodeURIComponent(l.url)}`)
    .join("|");
}

/** Deserialize pipe-separated social links */
export function deserializeSocials(raw: string): SocialLink[] {
  if (!raw) return [];
  return raw.split("|").map((entry) => {
    const colonIdx = entry.indexOf(":");
    if (colonIdx < 0) return { type: "link", url: decodeURIComponent(entry), label: "" };
    const type = entry.slice(0, colonIdx);
    const url = decodeURIComponent(entry.slice(colonIdx + 1));
    const meta = SOCIAL_ICONS[type];
    return { type, url, label: meta?.label ?? type };
  });
}

/** Get favicon URL for social link */
export function getSocialFaviconUrl(type: string, url: string): string {
  const meta = SOCIAL_ICONS[type];
  if (meta && type !== "link") {
    // known platform — use platform domain
    try {
      const u = new URL(meta.prefix || `https://${type}.com`);
      return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
    } catch {
      return "";
    }
  }
  // generic link — try to extract domain from url
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
  } catch {
    return "";
  }
}
