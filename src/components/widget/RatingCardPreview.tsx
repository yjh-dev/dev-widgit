"use client";

import { renderStars, type StarType } from "@/lib/rating-card";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const RATING_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const STAR_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

/** 5-point star SVG path */
const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z";

function Star({
  type,
  size,
  color,
  index,
}: {
  type: StarType;
  size: number;
  color: string;
  index: number;
}) {
  if (type === "full") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={`#${color}`} stroke={`#${color}`} strokeWidth="1.5">
        <path d={STAR_PATH} />
      </svg>
    );
  }

  if (type === "half") {
    const clipId = `half-star-${index}`;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        {/* Empty outline */}
        <path d={STAR_PATH} fill="none" stroke={`#${color}`} strokeWidth="1.5" opacity={0.3} />
        {/* Filled left half */}
        <path d={STAR_PATH} fill={`#${color}`} stroke={`#${color}`} strokeWidth="1.5" clipPath={`url(#${clipId})`} />
      </svg>
    );
  }

  // empty
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`#${color}`} strokeWidth="1.5" opacity={0.3}>
      <path d={STAR_PATH} />
    </svg>
  );
}

interface RatingCardPreviewProps {
  title?: string;
  rating?: number;
  maxStars?: number;
  label?: string;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function RatingCardPreview({
  title = "",
  rating = 4.5,
  maxStars = 5,
  label = "",
  color = "F59E0B",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: RatingCardPreviewProps) {
  const stars = renderStars(rating, maxStars);
  const resolvedTextColor = textColor || color;
  const fontStyle = resolveFontStyle(font);
  const starSize = STAR_SIZE_MAP[fontSize];

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {title && (
        <p
          className={`${TITLE_SIZE_MAP[fontSize]} font-medium opacity-70`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      <div className="flex items-center gap-0.5">
        {stars.map((type, i) => (
          <Star key={i} type={type} size={starSize} color={color} index={i} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`${RATING_SIZE_MAP[fontSize]} font-bold tabular-nums`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {rating.toFixed(1)}
        </span>
        {label && (
          <span
            className="text-sm opacity-50"
            style={{ color: `#${resolvedTextColor}` }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
