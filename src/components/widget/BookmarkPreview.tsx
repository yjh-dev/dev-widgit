"use client";

import { ExternalLink } from "lucide-react";
import { extractDomain, getFaviconUrl, normalizeUrl } from "@/lib/bookmark";
import type { FontSizeKey } from "@/lib/common-widget-options";

const TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const DESC_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface BookmarkPreviewProps {
  url?: string;
  title?: string;
  desc?: string;
  showIcon?: boolean;
  showUrl?: boolean;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  linkable?: boolean;
}

export default function BookmarkPreview({
  url = "",
  title = "",
  desc = "",
  showIcon = true,
  showUrl = true,
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  linkable = true,
}: BookmarkPreviewProps) {
  const domain = extractDomain(url);
  const faviconUrl = getFaviconUrl(url);
  const href = normalizeUrl(url);
  const displayTitle = title || domain || "링크";

  const content = (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      <div className="flex items-center gap-4">
        {showIcon && domain && (
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faviconUrl}
              alt=""
              width={32}
              height={32}
              className="rounded"
              style={{ imageRendering: "auto" }}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className={`${TITLE_SIZE_MAP[fontSize]} font-semibold truncate`}>
              {displayTitle}
            </p>
            <ExternalLink className="w-3.5 h-3.5 opacity-40 shrink-0" />
          </div>

          {desc && (
            <p
              className={`${DESC_SIZE_MAP[fontSize]} opacity-60 truncate mt-0.5`}
            >
              {desc}
            </p>
          )}

          {showUrl && domain && (
            <p className="text-xs opacity-40 truncate mt-1">{domain}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (linkable && href) {
    return (
      <a
        href={href}
        target="_top"
        rel="noopener noreferrer"
        className="block w-full h-full no-underline"
        style={{ color: "inherit" }}
      >
        {content}
      </a>
    );
  }

  return content;
}
