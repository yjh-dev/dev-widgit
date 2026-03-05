"use client";

import { formatCount, type SocialItem, type SocialLayout } from "@/lib/social-counter";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const COUNT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

/** Simple SVG icons per platform */
function PlatformIcon({ platform, color, size }: { platform: string; color: string; size: number }) {
  const s = size;
  const c = `#${color}`;

  switch (platform) {
    case "YouTube":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill={c} stroke="none" />
        </svg>
      );
    case "Twitter":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.11v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.3 6.34 6.34 0 009.49 21.65a6.34 6.34 0 006.34-6.34V8.66a8.27 8.27 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.07z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "Blog":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
  }
}

interface SocialCounterPreviewProps {
  items?: SocialItem[];
  layout?: SocialLayout;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function SocialCounterPreview({
  items = [{ platform: "YouTube", count: 1000 }],
  layout = "row",
  color = "E11D48",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: SocialCounterPreviewProps) {
  const resolvedTextColor = textColor || color;
  const fontStyle = resolveFontStyle(font);
  const iconSize = fontSize === "sm" ? 20 : fontSize === "xl" ? 32 : 24;

  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 gap-4"
      : "flex flex-wrap items-center justify-center gap-6";

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <div className={containerClass}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <PlatformIcon platform={item.platform} color={color} size={iconSize} />
            <span
              className={`${COUNT_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {formatCount(item.count)}
            </span>
            <span
              className={`${LABEL_SIZE_MAP[fontSize]} opacity-50`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {item.platform}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
