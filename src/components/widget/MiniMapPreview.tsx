"use client";

import { useRef, useState, useEffect } from "react";
import { getTilesForViewport, type MapStyle } from "@/lib/mini-map";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 400, h: 300 });
  const fontStyle = resolveFontStyle(font);
  const resolvedTextColor = textColorProp || color;
  const isDark = style === "dark";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ w: Math.ceil(width), h: Math.ceil(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tiles = getTilesForViewport(lat, lon, zoom, size.w, size.h);

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
        ref={containerRef}
        className="relative w-full flex-1 min-h-0 overflow-hidden rounded-lg"
        style={{
          filter: isDark ? "invert(1) hue-rotate(180deg)" : undefined,
        }}
      >
        {tiles.map((t, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            src={t.url}
            alt=""
            draggable={false}
            className="absolute"
            style={{ left: t.left, top: t.top, width: 256, height: 256 }}
          />
        ))}

        {/* Pin marker at center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none"
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
