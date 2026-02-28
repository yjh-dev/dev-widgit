"use client";

import {
  calcSliceAngles,
  describeArc,
  describeDonutArc,
  type PieSlice,
  type PieChartStyle,
} from "@/lib/pie-chart";
import type { FontSizeKey } from "@/lib/common-widget-options";

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

interface PieChartPreviewProps {
  slices?: PieSlice[];
  style?: PieChartStyle;
  showLabels?: boolean;
  showPercent?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function PieChartPreview({
  slices = [],
  style = "donut",
  showLabels = true,
  showPercent = true,
  showLegend = true,
  innerRadius = 60,
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: PieChartPreviewProps) {
  const resolvedTextColor = textColor || "333333";
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const angles = calcSliceAngles(slices);
  const labelClass = LABEL_SIZE_MAP[fontSize];

  const cx = 100;
  const cy = 100;
  const outerR = 90;
  const innerR = style === "donut" ? (outerR * innerRadius) / 100 : 0;

  if (slices.length === 0 || total <= 0) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <p className="text-sm opacity-50" style={{ color: `#${resolvedTextColor}` }}>
          데이터를 추가해주세요
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {/* Chart */}
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 200 200" width={160} height={160}>
          {slices.map((slice, i) => {
            const { startAngle, endAngle } = angles[i];
            const span = endAngle - startAngle;
            if (span <= 0) return null;

            const d =
              style === "donut"
                ? describeDonutArc(cx, cy, outerR, innerR, startAngle, endAngle)
                : describeArc(cx, cy, outerR, startAngle, endAngle);

            return (
              <path
                key={i}
                d={d}
                fill={`#${slice.color}`}
                stroke={transparentBg ? "none" : `#${bg}`}
                strokeWidth={slices.length > 1 ? 1.5 : 0}
              />
            );
          })}
        </svg>
        {/* Center text for donut */}
        {style === "donut" && innerR > 20 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p
              className="text-lg font-bold tabular-nums"
              style={{ color: `#${resolvedTextColor}` }}
            >
              {total}
            </p>
            <p
              className="text-[10px] opacity-50"
              style={{ color: `#${resolvedTextColor}` }}
            >
              합계
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {slices.map((slice, i) => {
            const pct = angles[i].percentage;
            return (
              <div key={i} className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: `#${slice.color}` }}
                />
                <span
                  className={`${labelClass} font-medium`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  {showLabels && slice.label}
                  {showLabels && showPercent && " "}
                  {showPercent && `${pct.toFixed(1)}%`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
