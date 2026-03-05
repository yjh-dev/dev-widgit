"use client";

import { Heart } from "lucide-react";
import { calculateAnniversary } from "@/lib/anniversary";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const COUNT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

const HEART_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 20,
  md: 28,
  lg: 36,
  xl: 44,
};

interface AnniversaryPreviewProps {
  title?: string;
  date?: string;
  color?: string;
  textColor?: string;
  showDays?: boolean;
  showWeeks?: boolean;
  showMonths?: boolean;
  font?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function AnniversaryPreview({
  title = "",
  date = "",
  color = "E11D48",
  textColor = "FFFFFF",
  showDays = true,
  showWeeks = false,
  showMonths = false,
  font = "sans",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: AnniversaryPreviewProps) {
  const result = date ? calculateAnniversary(date) : null;
  const fontStyle = resolveFontStyle(font);

  const resolvedTextColor = textColor || "FFFFFF";

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
      {/* Heart icon */}
      <Heart
        size={HEART_SIZE_MAP[fontSize]}
        fill={`#${color}`}
        color={`#${color}`}
      />

      {/* Title */}
      {title && (
        <p
          className={`${TITLE_SIZE_MAP[fontSize]} font-medium opacity-80`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      {/* Main day count */}
      {result ? (
        <>
          <p
            className={`${COUNT_SIZE_MAP[fontSize]} font-bold tabular-nums`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {result.days}<span className={`${TITLE_SIZE_MAP[fontSize]} font-normal ml-1`}>일</span>
          </p>

          {/* Sub stats */}
          <div className="flex gap-4 mt-1">
            {showDays && (
              <div className="text-center">
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${color}` }}
                >
                  {result.days}
                </p>
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  일
                </p>
              </div>
            )}
            {showWeeks && (
              <div className="text-center">
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${color}` }}
                >
                  {result.weeks}
                </p>
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  주
                </p>
              </div>
            )}
            {showMonths && (
              <div className="text-center">
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${color}` }}
                >
                  {result.months}
                </p>
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  개월
                </p>
              </div>
            )}
          </div>

          {/* Next 100 day milestone */}
          <p
            className={`${LABEL_SIZE_MAP[fontSize]} opacity-50 mt-1`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            다음 기념일: {result.nextHundred}일
          </p>
        </>
      ) : (
        <p
          className={`${TITLE_SIZE_MAP[fontSize]} opacity-50`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          날짜를 선택하세요
        </p>
      )}
    </div>
  );
}
