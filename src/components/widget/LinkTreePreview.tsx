"use client";

import { ExternalLink } from "lucide-react";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { LinkItem, LinkStyle } from "@/lib/link-tree";
import { getFaviconUrl, normalizeUrl } from "@/lib/link-tree";

const TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const LINK_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const LINK_PAD_MAP: Record<FontSizeKey, string> = {
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-4 py-2.5",
  xl: "px-5 py-3",
};

interface LinkTreePreviewProps {
  title?: string;
  links?: LinkItem[];
  linkStyle?: LinkStyle;
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  linkable?: boolean;
}

export default function LinkTreePreview({
  title = "",
  links = [],
  linkStyle = "filled",
  accentColor = "2563EB",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  linkable = true,
}: LinkTreePreviewProps) {
  const displayTitle = title || "내 링크";
  const activeLinks = links.filter((l) => l.title.trim() || l.url.trim());

  const sampleLinks: LinkItem[] = activeLinks.length > 0
    ? activeLinks
    : [
        { id: "s1", title: "GitHub", url: "https://github.com", icon: "" },
        { id: "s2", title: "블로그", url: "https://blog.example.com", icon: "" },
        { id: "s3", title: "포트폴리오", url: "https://portfolio.example.com", icon: "" },
      ];

  const getLinkStyles = (style: LinkStyle) => {
    switch (style) {
      case "filled":
        return {
          backgroundColor: `#${accentColor}`,
          color: "#FFFFFF",
          border: "none",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: `#${accentColor}`,
          border: `2px solid #${accentColor}`,
        };
      case "ghost":
        return {
          backgroundColor: `#${accentColor}10`,
          color: `#${accentColor}`,
          border: "none",
        };
    }
  };

  const linkBtnStyles = getLinkStyles(linkStyle);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {/* Title */}
      <p className={`${TITLE_SIZE_MAP[fontSize]} font-bold mb-3 text-center`}>
        {displayTitle}
      </p>

      {/* Links */}
      <div className="w-full flex flex-col gap-2 max-w-[280px]">
        {sampleLinks.map((link) => {
          const favicon = getFaviconUrl(link.url);
          const href = normalizeUrl(link.url);
          const inner = (
            <div
              className={`${LINK_PAD_MAP[fontSize]} rounded-lg flex items-center gap-2 text-center justify-center transition-opacity hover:opacity-85 w-full`}
              style={{
                ...linkBtnStyles,
                borderRadius: Math.min(borderRadius, 12),
              }}
            >
              {link.icon ? (
                <span className="text-sm shrink-0">{link.icon}</span>
              ) : favicon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={favicon} alt="" className="w-4 h-4 shrink-0" />
              ) : (
                <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
              )}
              <span className={`${LINK_SIZE_MAP[fontSize]} font-medium truncate`}>
                {link.title || link.url}
              </span>
            </div>
          );

          if (linkable && href) {
            return (
              <a key={link.id} href={href} target="_top" rel="noopener noreferrer">
                {inner}
              </a>
            );
          }
          return <div key={link.id}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
