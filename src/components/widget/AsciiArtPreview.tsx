"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { renderAsciiArt, type AsciiFont } from "@/lib/ascii-art";
import type { FontSizeKey } from "@/lib/common-widget-options";

const BASE_FONT_SIZE: Record<FontSizeKey, number> = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
};

interface AsciiArtPreviewProps {
  text?: string;
  font?: AsciiFont;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function AsciiArtPreview({
  text = "HELLO",
  font = "standard",
  color = "22C55E",
  bg = "0F172A",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: AsciiArtPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [scale, setScale] = useState(1);

  const lines = useMemo(() => renderAsciiArt(text || "HELLO", font), [text, font]);
  const baseFontPx = BASE_FONT_SIZE[fontSize];

  useEffect(() => {
    const container = containerRef.current;
    const pre = preRef.current;
    if (!container || !pre) return;

    const recalc = () => {
      // Reset scale to measure natural size
      pre.style.transform = "scale(1)";
      const containerW = container.clientWidth - padding * 2;
      const preW = pre.scrollWidth;
      if (preW > 0 && containerW > 0) {
        setScale(Math.min(1, containerW / preW));
      } else {
        setScale(1);
      }
    };

    recalc();

    const ro = new ResizeObserver(recalc);
    ro.observe(container);
    return () => ro.disconnect();
  }, [lines, baseFontPx, padding]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <pre
        ref={preRef}
        style={{
          color: `#${color}`,
          fontSize: baseFontPx,
          lineHeight: 1.1,
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          whiteSpace: "pre",
          margin: 0,
        }}
      >
        {lines.join("\n")}
      </pre>
    </div>
  );
}
