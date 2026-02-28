"use client";

import { useEffect, useState } from "react";
import type { ProgressItem, BarHeight, ProgressLayout } from "@/lib/multi-progress";
import { BAR_HEIGHT_MAP } from "@/lib/multi-progress";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { label: string; value: string }> = {
  sm: { label: "text-[10px]", value: "text-[10px]" },
  md: { label: "text-xs", value: "text-xs" },
  lg: { label: "text-sm", value: "text-sm" },
  xl: { label: "text-base", value: "text-base" },
};

interface MultiProgressPreviewProps {
  items?: ProgressItem[];
  showPercent?: boolean;
  showValue?: boolean;
  barHeight?: BarHeight;
  layout?: ProgressLayout;
  animated?: boolean;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function MultiProgressPreview({
  items = [],
  showPercent = true,
  showValue = false,
  barHeight = "default",
  layout = "stacked",
  animated = false,
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: MultiProgressPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const barH = BAR_HEIGHT_MAP[barHeight];
  const sizes = FONT_SIZE_MAP[fontSize];

  useEffect(() => {
    if (animated) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    } else {
      setMounted(true);
    }
  }, [animated]);

  const getPercent = (item: ProgressItem) => {
    if (item.max <= 0) return 0;
    return Math.min(100, (item.value / item.max) * 100);
  };

  if (layout === "grouped") {
    const maxVal = Math.max(...items.map((it) => it.max), 1);
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <div className="w-full flex items-end gap-2 justify-center" style={{ minHeight: 80 }}>
          {items.map((item, i) => {
            const pct = getPercent(item);
            const heightPx = Math.max(4, (pct / 100) * 80);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                {(showPercent || showValue) && (
                  <span
                    className={`${sizes.value} tabular-nums font-medium`}
                    style={{ color: `#${textColor || item.color}` }}
                  >
                    {showPercent && `${pct.toFixed(0)}%`}
                    {showPercent && showValue && " "}
                    {showValue && `${item.value}/${item.max}`}
                  </span>
                )}
                <div
                  className="rounded-t-sm"
                  style={{
                    width: barH === 4 ? 16 : barH === 16 ? 32 : 24,
                    height: animated && mounted ? heightPx : animated ? 0 : heightPx,
                    backgroundColor: `#${item.color}`,
                    transition: animated ? "height 0.6s ease-out" : undefined,
                  }}
                />
                <span
                  className={`${sizes.label} truncate max-w-[60px] text-center`}
                  style={{ color: `#${textColor || item.color}` }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // stacked layout (default)
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div className="w-full max-w-[320px] space-y-3">
        {items.map((item, i) => {
          const pct = getPercent(item);
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={`${sizes.label} font-medium`}
                  style={{ color: `#${textColor || item.color}` }}
                >
                  {item.label}
                </span>
                <span
                  className={`${sizes.value} tabular-nums font-medium opacity-70`}
                  style={{ color: `#${textColor || item.color}` }}
                >
                  {showPercent && `${pct.toFixed(0)}%`}
                  {showPercent && showValue && " "}
                  {showValue && `${item.value}/${item.max}`}
                </span>
              </div>
              <div
                className="w-full rounded-full overflow-hidden"
                style={{
                  height: barH,
                  backgroundColor: `#${item.color}20`,
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: animated && mounted
                      ? `${pct}%`
                      : animated
                        ? "0%"
                        : `${pct}%`,
                    backgroundColor: `#${item.color}`,
                    transition: animated ? "width 0.6s ease-out" : undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
