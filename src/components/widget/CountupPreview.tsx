"use client";

import { useEffect, useState, startTransition } from "react";
import { calculateCountup, type CountupResult } from "@/lib/countup";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const NUM_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

interface CountupPreviewProps {
  title?: string;
  date?: string;
  showSeconds?: boolean;
  color?: string;
  textColor?: string;
  font?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function CountupPreview({
  title = "",
  date = "",
  showSeconds = true,
  color = "2563EB",
  textColor = "",
  font = "sans",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: CountupPreviewProps) {
  const [result, setResult] = useState<CountupResult | null>(null);
  const fontStyle = resolveFontStyle(font);
  const resolvedTextColor = textColor || color;

  useEffect(() => {
    if (!date) {
      startTransition(() => setResult(null));
      return;
    }

    startTransition(() => setResult(calculateCountup(date)));

    const interval = setInterval(() => setResult(calculateCountup(date)), 1000);
    return () => clearInterval(interval);
  }, [date]);

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-3 ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {/* Title */}
      {title && (
        <p
          className={`${TITLE_SIZE_MAP[fontSize]} font-medium opacity-80`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      {result ? (
        <div className="flex gap-3">
          {/* Days */}
          <div className="text-center">
            <p
              className={`${NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
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

          {/* Separator */}
          <span
            className={`${NUM_SIZE_MAP[fontSize]} font-light opacity-30`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            :
          </span>

          {/* Hours */}
          <div className="text-center">
            <p
              className={`${NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {pad2(result.hours)}
            </p>
            <p
              className={`${LABEL_SIZE_MAP[fontSize]} opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              시간
            </p>
          </div>

          <span
            className={`${NUM_SIZE_MAP[fontSize]} font-light opacity-30`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            :
          </span>

          {/* Minutes */}
          <div className="text-center">
            <p
              className={`${NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {pad2(result.minutes)}
            </p>
            <p
              className={`${LABEL_SIZE_MAP[fontSize]} opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              분
            </p>
          </div>

          {/* Seconds */}
          {showSeconds && (
            <>
              <span
                className={`${NUM_SIZE_MAP[fontSize]} font-light opacity-30`}
                style={{ color: `#${resolvedTextColor}` }}
              >
                :
              </span>
              <div className="text-center">
                <p
                  className={`${NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  {pad2(result.seconds)}
                </p>
                <p
                  className={`${LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  초
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <p
          className={`${TITLE_SIZE_MAP[fontSize]} opacity-50`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {date ? "시작일이 미래입니다" : "날짜를 선택하세요"}
        </p>
      )}
    </div>
  );
}
