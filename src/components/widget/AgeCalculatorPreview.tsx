"use client";

import { useEffect, useState } from "react";
import { calcAge, toLocalDate, type AgeStyle, type AgeResult } from "@/lib/age-calculator";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface AgeCalculatorPreviewProps {
  birthdate?: string;
  showTime?: boolean;
  showLabel?: boolean;
  style?: AgeStyle;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function AgeCalculatorPreview({
  birthdate = "1995-01-01",
  showTime = true,
  showLabel = true,
  style = "full",
  color = "2563EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: AgeCalculatorPreviewProps) {
  const resolvedTextColor = textColor || color;

  const parsed = toLocalDate(birthdate);

  const [age, setAge] = useState<AgeResult | null>(() => {
    if (!parsed) return null;
    return calcAge(parsed);
  });

  useEffect(() => {
    if (!parsed) {
      setAge(null);
      return;
    }
    setAge(calcAge(parsed));
    const interval = setInterval(() => {
      setAge(calcAge(parsed));
    }, 1000);
    return () => clearInterval(interval);
  }, [birthdate]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!age) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <p className="text-sm opacity-50" style={{ color: `#${resolvedTextColor}` }}>
          생년월일을 입력하세요
        </p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {showLabel && (
        <p
          className="text-sm font-medium mb-1 opacity-70"
          style={{ color: `#${resolvedTextColor}` }}
        >
          나이
        </p>
      )}

      {style === "years-only" && (
        <>
          <p
            className={`${FONT_SIZE_MAP[fontSize]} font-extrabold tabular-nums`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {age.years}
          </p>
          <p
            className={`${LABEL_SIZE_MAP[fontSize]} font-medium opacity-60 mt-1`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            years old
          </p>
        </>
      )}

      {style === "compact" && (
        <p
          className={`${FONT_SIZE_MAP[fontSize]} font-bold tabular-nums`}
          style={{ color: `#${resolvedTextColor}`, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
        >
          {age.years}y {age.months}m {age.days}d
          {showTime && (
            <span className="opacity-80">
              {" "}{pad(age.hours)}:{pad(age.minutes)}:{pad(age.seconds)}
            </span>
          )}
        </p>
      )}

      {style === "full" && (
        <>
          <div className="flex items-baseline gap-1 flex-wrap justify-center">
            <span
              className={`${FONT_SIZE_MAP[fontSize]} font-extrabold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {age.years}
            </span>
            <span
              className={`${LABEL_SIZE_MAP[fontSize]} font-medium opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              년
            </span>
            <span
              className={`${FONT_SIZE_MAP[fontSize]} font-extrabold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {age.months}
            </span>
            <span
              className={`${LABEL_SIZE_MAP[fontSize]} font-medium opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              개월
            </span>
            <span
              className={`${FONT_SIZE_MAP[fontSize]} font-extrabold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {age.days}
            </span>
            <span
              className={`${LABEL_SIZE_MAP[fontSize]} font-medium opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              일
            </span>
          </div>
          {showTime && (
            <p
              className="text-lg font-light tabular-nums mt-1 opacity-80"
              style={{
                color: `#${resolvedTextColor}`,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
              }}
            >
              {pad(age.hours)}:{pad(age.minutes)}:{pad(age.seconds)}
            </p>
          )}
        </>
      )}
    </div>
  );
}
