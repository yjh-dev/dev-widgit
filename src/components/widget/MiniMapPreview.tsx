"use client";

import { useState } from "react";
import { getStaticMapUrl, type MapStyle } from "@/lib/mini-map";
import { resolveFontStyle } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface MiniMapPreviewProps {
  lat?: number;
  lon?: number;
  zoom?: number;
  label?: string;
  style?: MapStyle;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function MiniMapPreview({
  lat = 37.5665,
  lon = 126.978,
  zoom = 13,
  label = "서울",
  style = "standard",
  color = "E11D48",
  textColor: textColorProp = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: MiniMapPreviewProps) {
  const [imgError, setImgError] = useState(false);
  const mapUrl = getStaticMapUrl(lat, lon, zoom, 400, 300);
  const fontStyle = resolveFontStyle(font);
  const resolvedTextColor = textColorProp || color;
  const isDark = style === "dark";

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
      <div
        className="relative w-full flex-1 min-h-0 overflow-hidden rounded-lg"
        style={{
          filter: isDark ? "invert(1) hue-rotate(180deg)" : undefined,
        }}
      >
        {!imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={mapUrl}
            alt={label || "지도"}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
            지도를 불러올 수 없습니다
          </div>
        )}

        {/* Pin marker */}
        {!imgError && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
            style={{ filter: isDark ? "invert(1) hue-rotate(180deg)" : undefined }}
          >
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
              <path
                d="M16 0C7.164 0 0 7.164 0 16c0 12 16 24 16 24s16-12 16-24C32 7.164 24.836 0 16 0z"
                fill={`#${color}`}
              />
              <circle cx="16" cy="16" r="6" fill="white" />
            </svg>
          </div>
        )}
      </div>

      {label && (
        <p
          className={`${FONT_SIZE_MAP[fontSize]} font-medium text-center`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
