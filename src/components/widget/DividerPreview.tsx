"use client";

import { WEIGHT_PX, type DividerStyle, type DividerWeight } from "@/lib/divider";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface DividerPreviewProps {
  style?: DividerStyle;
  weight?: DividerWeight;
  color?: string;
  color2?: string;
  text?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function DividerPreview({
  style = "solid",
  weight = "medium",
  color = "D4D4D8",
  color2 = "A1A1AA",
  text = "",
  bg = "FFFFFF",
  transparentBg = true,
  borderRadius = 16,
  padding = 8,
  fontSize = "md",
}: DividerPreviewProps) {
  const px = WEIGHT_PX[weight];

  const renderLine = (className?: string) => {
    if (style === "wave") {
      return (
        <svg
          className={`flex-1 ${className ?? ""}`}
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          style={{ height: Math.max(12, px * 6) }}
        >
          <path
            d="M0,10 C25,0 25,20 50,10 C75,0 75,20 100,10 C125,0 125,20 150,10 C175,0 175,20 200,10"
            fill="none"
            stroke={`#${color}`}
            strokeWidth={px}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );
    }

    if (style === "zigzag") {
      return (
        <svg
          className={`flex-1 ${className ?? ""}`}
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          style={{ height: Math.max(12, px * 6) }}
        >
          <path
            d="M0,10 L12.5,2 L25,18 L37.5,2 L50,18 L62.5,2 L75,18 L87.5,2 L100,18 L112.5,2 L125,18 L137.5,2 L150,18 L162.5,2 L175,18 L187.5,2 L200,10"
            fill="none"
            stroke={`#${color}`}
            strokeWidth={px}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );
    }

    if (style === "gradient") {
      return (
        <div
          className={`flex-1 ${className ?? ""}`}
          style={{
            height: px,
            background: `linear-gradient(90deg, #${color}, #${color2})`,
            borderRadius: px,
          }}
        />
      );
    }

    if (style === "double") {
      return (
        <div className={`flex-1 flex flex-col ${className ?? ""}`} style={{ gap: px + 1 }}>
          <div
            style={{
              height: px,
              backgroundColor: `#${color}`,
              borderRadius: px,
            }}
          />
          <div
            style={{
              height: px,
              backgroundColor: `#${color}`,
              borderRadius: px,
            }}
          />
        </div>
      );
    }

    // solid, dashed, dotted
    return (
      <div
        className={`flex-1 ${className ?? ""}`}
        style={{
          height: 0,
          borderTopWidth: px,
          borderTopStyle: style as "solid" | "dashed" | "dotted",
          borderTopColor: `#${color}`,
        }}
      />
    );
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {text ? (
        <div className="w-full flex items-center gap-3">
          {renderLine()}
          <span
            className={`${FONT_SIZE_MAP[fontSize]} font-medium shrink-0 whitespace-nowrap`}
            style={{ color: `#${color}` }}
          >
            {text}
          </span>
          {renderLine()}
        </div>
      ) : (
        <div className="w-full flex items-center">
          {renderLine()}
        </div>
      )}
    </div>
  );
}
