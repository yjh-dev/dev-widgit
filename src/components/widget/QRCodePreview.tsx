"use client";

import { useMemo } from "react";
import { generateQR, QR_SIZE_MAP, type QRErrorCorrection, type QRModuleStyle, type QRSize } from "@/lib/qr-code";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface QRCodePreviewProps {
  data?: string;
  label?: string;
  fgColor?: string;
  bgColor?: string;
  size?: QRSize;
  ec?: QRErrorCorrection;
  module?: QRModuleStyle;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function QRCodePreview({
  data = "",
  label = "",
  fgColor = "1E1E1E",
  bgColor = "FFFFFF",
  size = "md",
  ec = "M",
  module: moduleStyle = "square",
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: QRCodePreviewProps) {
  const qr = useMemo(() => {
    if (!data) return null;
    return generateQR(data, ec);
  }, [data, ec]);

  const svgSize = QR_SIZE_MAP[size];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{
        backgroundColor: `#${bgColor}`,
        borderRadius,
        padding,
      }}
    >
      {qr ? (
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${qr.size + 2} ${qr.size + 2}`}
        >
          <rect width={qr.size + 2} height={qr.size + 2} fill={`#${bgColor}`} />
          {qr.modules.map((row, r) =>
            row.map((mod, c) => {
              if (!mod) return null;
              if (moduleStyle === "dots") {
                return (
                  <circle
                    key={`${r}-${c}`}
                    cx={c + 1.5}
                    cy={r + 1.5}
                    r={0.4}
                    fill={`#${fgColor}`}
                  />
                );
              }
              if (moduleStyle === "rounded") {
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c + 1.1}
                    y={r + 1.1}
                    width={0.8}
                    height={0.8}
                    rx={0.25}
                    fill={`#${fgColor}`}
                  />
                );
              }
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c + 1}
                  y={r + 1}
                  width={1}
                  height={1}
                  fill={`#${fgColor}`}
                />
              );
            })
          )}
        </svg>
      ) : (
        <div
          className="flex items-center justify-center border-2 border-dashed rounded-lg"
          style={{
            width: svgSize,
            height: svgSize,
            borderColor: `#${fgColor}40`,
            color: `#${fgColor}80`,
          }}
        >
          <p className="text-sm text-center px-4">
            URL 또는 텍스트를<br />입력하세요
          </p>
        </div>
      )}
      {label && (
        <p
          className={`${FONT_SIZE_MAP[fontSize]} font-medium text-center`}
          style={{ color: `#${fgColor}` }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
