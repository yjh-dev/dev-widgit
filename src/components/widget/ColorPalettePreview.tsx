"use client";

import type { PaletteLayout } from "@/lib/color-palette";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

interface ColorPalettePreviewProps {
  colors?: string[];
  layout?: PaletteLayout;
  showHex?: boolean;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function ColorPalettePreview({
  colors = ["2563EB", "7C3AED", "EC4899", "F59E0B"],
  layout = "horizontal",
  showHex = true,
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: ColorPalettePreviewProps) {
  const textSize = FONT_SIZE_MAP[fontSize];

  const containerClass =
    layout === "vertical"
      ? "flex flex-col gap-3 w-full"
      : layout === "grid"
        ? "grid grid-cols-2 gap-3 w-full"
        : "flex flex-wrap gap-3 w-full justify-center items-center";

  const swatchClass =
    layout === "vertical"
      ? "w-full h-10 rounded-lg"
      : layout === "grid"
        ? "w-full aspect-square rounded-lg"
        : "flex-1 min-w-[48px] aspect-square rounded-lg";

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div className={containerClass}>
        {colors.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={swatchClass}
              style={{ backgroundColor: `#${c}` }}
            />
            {showHex && (
              <span
                className={`${textSize} font-mono uppercase`}
                style={{ color: `#${color}` }}
              >
                #{c}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
