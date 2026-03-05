"use client";

import { useState, useEffect, startTransition } from "react";
import { formatDualTime, type DualClockFormat } from "@/lib/dual-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const TIME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface DualClockPreviewProps {
  tz1?: string;
  tz2?: string;
  label1?: string;
  label2?: string;
  format?: DualClockFormat;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function DualClockPreview({
  tz1 = "Asia/Seoul",
  tz2 = "America/New_York",
  label1 = "서울",
  label2 = "뉴욕",
  format = "24h",
  color = "1E1E1E",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "mono",
}: DualClockPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    startTransition(() => setMounted(true));
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const resolvedTextColor = textColor || color;
  const fontStyle = resolveFontStyle(font);

  const t1 = mounted ? formatDualTime(tz1, format) : { time: "--:--:--", date: "" };
  const t2 = mounted ? formatDualTime(tz2, format) : { time: "--:--:--", date: "" };

  // suppress unused tick warning
  void tick;

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <div className="flex items-center gap-4 w-full max-w-[360px]">
        {/* Clock 1 */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span
            className={`${LABEL_SIZE_MAP[fontSize]} font-medium opacity-60`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {label1}
          </span>
          <span
            className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {t1.time}
          </span>
          <span
            className="text-xs opacity-40"
            style={{ color: `#${resolvedTextColor}` }}
          >
            {t1.date}
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-px h-16 opacity-20"
          style={{ backgroundColor: `#${resolvedTextColor}` }}
        />

        {/* Clock 2 */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span
            className={`${LABEL_SIZE_MAP[fontSize]} font-medium opacity-60`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {label2}
          </span>
          <span
            className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {t2.time}
          </span>
          <span
            className="text-xs opacity-40"
            style={{ color: `#${resolvedTextColor}` }}
          >
            {t2.date}
          </span>
        </div>
      </div>
    </div>
  );
}
