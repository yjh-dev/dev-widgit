"use client";

import { buildGradientCSS, type GradientType } from "@/lib/gradient";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
};

interface GradientPreviewProps {
  colors?: string[];
  dir?: number;
  type?: GradientType;
  animate?: boolean;
  speed?: number;
  text?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function GradientPreview({
  colors = ["6366F1", "EC4899"],
  dir = 135,
  type = "linear",
  animate = false,
  speed = 10,
  text = "",
  textColor = "FFFFFF",
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: GradientPreviewProps) {
  const gradient = buildGradientCSS(colors, dir, type);

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${animate ? "animate-gradient-shift" : ""}`}
      style={{
        background: animate
          ? `${buildGradientCSS([...colors, ...colors], dir, type)}`
          : gradient,
        backgroundSize: animate ? "200% 200%" : undefined,
        animationDuration: animate ? `${speed}s` : undefined,
        borderRadius,
        padding,
      }}
    >
      {text && (
        <p
          className={`${FONT_SIZE_MAP[fontSize]} font-bold text-center`}
          style={{ color: `#${textColor}` }}
        >
          {text}
        </p>
      )}
      {animate && (
        <style jsx>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-shift {
            animation: gradient-shift ease infinite;
          }
        `}</style>
      )}
    </div>
  );
}
