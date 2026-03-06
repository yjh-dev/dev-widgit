"use client";

import { User } from "lucide-react";
import { renderStars, type StarType, type TestimonialLayout } from "@/lib/testimonial";
import type { FontSizeKey } from "@/lib/common-widget-options";

const QUOTE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const AUTHOR_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const MARK_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const AVATAR_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

const STAR_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

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
    const clipId = `testimonial-half-star-${index}`;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <path d={STAR_PATH} fill="none" stroke={`#${color}`} strokeWidth="1.5" opacity={0.3} />
        <path d={STAR_PATH} fill={`#${color}`} stroke={`#${color}`} strokeWidth="1.5" clipPath={`url(#${clipId})`} />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={`#${color}`} strokeWidth="1.5" opacity={0.3}>
      <path d={STAR_PATH} />
    </svg>
  );
}

interface TestimonialPreviewProps {
  quote?: string;
  author?: string;
  role?: string;
  avatarUrl?: string;
  showAvatar?: boolean;
  showRole?: boolean;
  showQuoteMarks?: boolean;
  showRating?: boolean;
  rating?: number;
  maxStars?: number;
  layout?: TestimonialLayout;
  accentColor?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function TestimonialPreview({
  quote = "이 서비스를 사용한 후 생산성이 크게 향상되었습니다. 강력히 추천합니다!",
  author = "김지수",
  role = "프로덕트 매니저",
  avatarUrl = "",
  showAvatar = true,
  showRole = true,
  showQuoteMarks = true,
  showRating = false,
  rating = 0,
  maxStars = 5,
  layout = "card",
  accentColor = "6366F1",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: TestimonialPreviewProps) {
  const resolvedTextColor = textColor || "333333";
  const avatarSize = AVATAR_SIZE_MAP[fontSize];
  const starSize = STAR_SIZE_MAP[fontSize];
  const stars = showRating ? renderStars(rating, maxStars) : [];

  const ratingEl = showRating ? (
    <div className="flex items-center gap-0.5 mt-2">
      {stars.map((type, i) => (
        <Star key={i} type={type} size={starSize} color={accentColor} index={i} />
      ))}
    </div>
  ) : null;

  const displayQuote = quote || "후기를 입력하세요";
  const displayAuthor = author || "작성자";

  const avatarEl = showAvatar ? (
    avatarUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={displayAuthor}
        className="rounded-full object-cover shrink-0"
        style={{ width: avatarSize, height: avatarSize }}
      />
    ) : (
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: avatarSize,
          height: avatarSize,
          backgroundColor: `#${accentColor}20`,
        }}
      >
        <User
          style={{ color: `#${accentColor}`, width: avatarSize * 0.5, height: avatarSize * 0.5 }}
        />
      </div>
    )
  ) : null;

  if (layout === "minimal") {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <div className="text-center max-w-[320px]">
          {showQuoteMarks && (
            <span
              className={`${MARK_SIZE_MAP[fontSize]} leading-none block mb-1`}
              style={{ color: `#${accentColor}` }}
            >
              &#10077;
            </span>
          )}
          <p
            className={`${QUOTE_SIZE_MAP[fontSize]} italic leading-relaxed`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {displayQuote}
          </p>
          {ratingEl && <div className="flex justify-center">{ratingEl}</div>}
          <p
            className={`${AUTHOR_SIZE_MAP[fontSize]} mt-3 font-medium`}
            style={{ color: `#${resolvedTextColor}`, opacity: 0.7 }}
          >
            &mdash; {displayAuthor}
            {showRole && role && (
              <span className="opacity-60">, {role}</span>
            )}
          </p>
        </div>
      </div>
    );
  }

  if (layout === "centered") {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <div className="flex flex-col items-center text-center max-w-[320px]">
          {avatarEl}
          {showQuoteMarks && (
            <span
              className={`${MARK_SIZE_MAP[fontSize]} leading-none mt-2`}
              style={{ color: `#${accentColor}` }}
            >
              &#10077;
            </span>
          )}
          <p
            className={`${QUOTE_SIZE_MAP[fontSize]} leading-relaxed mt-2`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {displayQuote}
          </p>
          {ratingEl}
          <p
            className={`${AUTHOR_SIZE_MAP[fontSize]} mt-3 font-semibold`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {displayAuthor}
          </p>
          {showRole && role && (
            <p
              className={`${AUTHOR_SIZE_MAP[fontSize]} opacity-50`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {role}
            </p>
          )}
        </div>
      </div>
    );
  }

  // "card" layout (default)
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div
        className="max-w-[320px] w-full"
        style={{ borderLeft: `3px solid #${accentColor}`, paddingLeft: 16 }}
      >
        {showQuoteMarks && (
          <span
            className={`${MARK_SIZE_MAP[fontSize]} leading-none block mb-1`}
            style={{ color: `#${accentColor}` }}
          >
            &#10077;
          </span>
        )}
        <p
          className={`${QUOTE_SIZE_MAP[fontSize]} leading-relaxed`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {displayQuote}
        </p>
        {ratingEl}
        <div className="flex items-center gap-2 mt-3">
          {avatarEl}
          <div>
            <p
              className={`${AUTHOR_SIZE_MAP[fontSize]} font-semibold`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {displayAuthor}
            </p>
            {showRole && role && (
              <p
                className={`${AUTHOR_SIZE_MAP[fontSize]} opacity-50`}
                style={{ color: `#${resolvedTextColor}` }}
              >
                {role}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
