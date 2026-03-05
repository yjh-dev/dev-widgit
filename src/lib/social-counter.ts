export type SocialPlatform = "YouTube" | "Instagram" | "Twitter" | "TikTok" | "GitHub" | "Blog";
export type SocialLayout = "row" | "grid";

export interface SocialItem {
  platform: string;
  count: number;
}

/**
 * 숫자를 K, M 형식으로 포맷한다.
 */
export function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return String(count);
}

/**
 * "YouTube~1200|Instagram~850" 형태의 문자열을 파싱한다.
 */
export function parseSocialItems(raw: string): SocialItem[] {
  if (!raw) return [];
  return raw
    .split("|")
    .filter(Boolean)
    .map((segment) => {
      const [platform, countStr] = segment.split("~");
      return {
        platform: platform || "YouTube",
        count: Number(countStr) || 0,
      };
    });
}

/**
 * SocialItem 배열을 URL 파라미터 형태로 직렬화한다.
 */
export function serializeSocialItems(items: SocialItem[]): string {
  return items.map((item) => `${item.platform}~${item.count}`).join("|");
}
