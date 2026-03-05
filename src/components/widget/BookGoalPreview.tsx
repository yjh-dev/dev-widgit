"use client";

import { calculateBookProgress } from "@/lib/book-goal";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const FONT_SIZE_MAP: Record<FontSizeKey, { title: string; count: string }> = {
  sm: { title: "text-xs", count: "text-sm" },
  md: { title: "text-sm", count: "text-base" },
  lg: { title: "text-base", count: "text-lg" },
  xl: { title: "text-lg", count: "text-xl" },
};

/** Small SVG book icon */
function BookIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg
      viewBox="0 0 20 26"
      width={20}
      height={26}
      className="transition-all duration-300"
    >
      {/* Book body */}
      <rect
        x="2"
        y="2"
        width="14"
        height="20"
        rx="1"
        fill={filled ? `#${color}` : "none"}
        stroke={`#${color}`}
        strokeWidth="1.5"
        opacity={filled ? 1 : 0.25}
      />
      {/* Spine */}
      <line
        x1="5"
        y1="2"
        x2="5"
        y2="22"
        stroke={filled ? `#${color}80` : `#${color}40`}
        strokeWidth="1"
      />
      {/* Bookmark tab on top */}
      {filled && (
        <polygon
          points="10,2 14,2 14,7 12,5.5 10,7"
          fill={`#${color}CC`}
        />
      )}
    </svg>
  );
}

interface BookGoalPreviewProps {
  title?: string;
  current?: number;
  target?: number;
  year?: string;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function BookGoalPreview({
  title = "",
  current = 0,
  target = 24,
  year = new Date().getFullYear().toString(),
  color = "F59E0B",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: BookGoalPreviewProps) {
  const { percentage, remaining } = calculateBookProgress(current, target);
  const resolvedTextColor = textColor || color;
  const fontStyle = resolveFontStyle(font);
  const fs = FONT_SIZE_MAP[fontSize];

  // Limit displayed icons to max 48 for layout sanity
  const displayTarget = Math.min(target, 48);
  const displayCurrent = Math.min(current, displayTarget);

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
      {/* Title */}
      <p
        className={`${fs.title} font-medium mb-2 opacity-70`}
        style={{ color: `#${resolvedTextColor}` }}
      >
        {title || `${year} 독서 목표`}
      </p>

      {/* Book grid */}
      <div className="flex flex-wrap justify-center gap-1 max-w-[280px] mb-3">
        {Array.from({ length: displayTarget }, (_, i) => (
          <BookIcon key={i} filled={i < displayCurrent} color={color} />
        ))}
      </div>

      {/* Progress text */}
      <p
        className={`${fs.count} font-bold tabular-nums`}
        style={{ color: `#${resolvedTextColor}` }}
      >
        {current} / {target}권
      </p>

      {/* Percentage & remaining */}
      <p
        className="text-xs font-medium mt-1 opacity-50"
        style={{ color: `#${resolvedTextColor}` }}
      >
        {percentage.toFixed(1)}%{remaining > 0 ? ` · ${remaining}권 남음` : " 달성!"}
      </p>
    </div>
  );
}
