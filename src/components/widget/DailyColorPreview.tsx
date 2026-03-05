"use client";

import { useState, useEffect, startTransition } from "react";
import { getDailyColor, isColorDark, type DailyColorResult } from "@/lib/daily-color";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const NAME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const HEX_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const SWATCH_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 64,
  md: 88,
  lg: 112,
  xl: 136,
};

interface DailyColorPreviewProps {
  showHex?: boolean;
  showRgb?: boolean;
  showName?: boolean;
  font?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function DailyColorPreview({
  showHex = true,
  showRgb = false,
  showName = true,
  font = "sans",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: DailyColorPreviewProps) {
  const [color, setColor] = useState<DailyColorResult | null>(null);
  const fontStyle = resolveFontStyle(font);

  useEffect(() => {
    startTransition(() => setColor(getDailyColor()));
  }, []);

  if (!color) return null;

  const isDark = isColorDark(color.hex);
  const swatchTextColor = isDark ? "FFFFFF" : "1E1E1E";
  const bgTextColor = transparentBg ? "1E1E1E" : (isColorDark(bg) ? "FFFFFF" : "1E1E1E");
  const swatchSize = SWATCH_SIZE_MAP[fontSize];

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
      {/* Color swatch circle */}
      <div
        className="rounded-full flex items-center justify-center shadow-lg"
        style={{
          width: swatchSize,
          height: swatchSize,
          backgroundColor: `#${color.hex}`,
        }}
      >
        {showName && (
          <span
            className={`${HEX_SIZE_MAP[fontSize]} font-bold`}
            style={{ color: `#${swatchTextColor}` }}
          >
            {color.name}
          </span>
        )}
      </div>

      {/* Color name below swatch */}
      {showName && (
        <p
          className={`${NAME_SIZE_MAP[fontSize]} font-bold`}
          style={{ color: `#${color.hex}` }}
        >
          오늘의 색: {color.name}
        </p>
      )}

      {/* Hex value */}
      {showHex && (
        <p
          className={`${HEX_SIZE_MAP[fontSize]} font-mono tabular-nums opacity-70`}
          style={{ color: `#${bgTextColor}` }}
        >
          #{color.hex}
        </p>
      )}

      {/* RGB value */}
      {showRgb && (
        <p
          className={`${HEX_SIZE_MAP[fontSize]} font-mono tabular-nums opacity-70`}
          style={{ color: `#${bgTextColor}` }}
        >
          RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
        </p>
      )}
    </div>
  );
}
