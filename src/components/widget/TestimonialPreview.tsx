"use client";

import { User } from "lucide-react";
import type { TestimonialLayout } from "@/lib/testimonial";
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

interface TestimonialPreviewProps {
  quote?: string;
  author?: string;
  role?: string;
  avatarUrl?: string;
  showAvatar?: boolean;
  showRole?: boolean;
  showQuoteMarks?: boolean;
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

  const displayQuote = quote || "후기를 입력하세요";
  const displayAuthor = author || "작성자";

  const AvatarEl = () => {
    if (!showAvatar) return null;
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt={displayAuthor}
          className="rounded-full object-cover shrink-0"
          style={{ width: avatarSize, height: avatarSize }}
        />
      );
    }
    return (
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
    );
  };

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
          <AvatarEl />
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
        <div className="flex items-center gap-2 mt-3">
          <AvatarEl />
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
