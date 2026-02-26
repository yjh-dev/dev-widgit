"use client";

import { Play, SkipBack, SkipForward } from "lucide-react";
import { clampProgress } from "@/lib/music";
import type { FontSizeKey } from "@/lib/common-widget-options";

const TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const ARTIST_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const ART_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 48,
  md: 56,
  lg: 64,
  xl: 72,
};

interface MusicPreviewProps {
  title?: string;
  artist?: string;
  progress?: number;
  artColor?: string;
  showProgress?: boolean;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function MusicPreview({
  title = "",
  artist = "",
  progress = 35,
  artColor = "6366F1",
  showProgress = true,
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: MusicPreviewProps) {
  const pct = clampProgress(progress);
  const artSize = ART_SIZE_MAP[fontSize];
  const displayTitle = title || "곡 제목";
  const displayArtist = artist || "아티스트";

  return (
    <div
      className="w-full h-full flex flex-col justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Album art placeholder */}
        <div
          className="shrink-0 rounded-lg flex items-center justify-center"
          style={{
            width: artSize,
            height: artSize,
            backgroundColor: `#${artColor}`,
          }}
        >
          <svg viewBox="0 0 24 24" width={artSize * 0.4} height={artSize * 0.4} fill="none">
            <path
              d="M9 18V5l12-2v13"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="18" r="3" fill="rgba(255,255,255,0.6)" />
            <circle cx="18" cy="16" r="3" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className={`${TITLE_SIZE_MAP[fontSize]} font-semibold truncate`}>
            {displayTitle}
          </p>
          <p className={`${ARTIST_SIZE_MAP[fontSize]} opacity-60 truncate`}>
            {displayArtist}
          </p>
        </div>
      </div>

      {showProgress && (
        <div className="mt-3">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: `#${color}15` }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${pct}%`,
                backgroundColor: `#${artColor}`,
              }}
            />
          </div>

          {/* Decorative controls */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <SkipBack className="w-4 h-4 opacity-40" />
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `#${artColor}` }}
            >
              <Play className="w-3.5 h-3.5 text-white ml-0.5" />
            </div>
            <SkipForward className="w-4 h-4 opacity-40" />
          </div>
        </div>
      )}
    </div>
  );
}
