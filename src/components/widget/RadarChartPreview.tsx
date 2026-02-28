"use client";

import {
  type RadarItem,
  getPolygonPoints,
  getAxisEndpoints,
  getGridPolygonPoints,
  getLabelPositions,
} from "@/lib/radar-chart";
import type { FontSizeKey } from "@/lib/common-widget-options";

const LABEL_FONT_SIZE: Record<FontSizeKey, number> = {
  sm: 9,
  md: 11,
  lg: 13,
  xl: 15,
};

const VALUE_FONT_SIZE: Record<FontSizeKey, number> = {
  sm: 7,
  md: 8,
  lg: 9,
  xl: 10,
};

interface RadarChartPreviewProps {
  items?: RadarItem[];
  showValues?: boolean;
  showGrid?: boolean;
  gridLevels?: number;
  fillOpacity?: number;
  color?: string;
  gridColor?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function RadarChartPreview({
  items = [],
  showValues = false,
  showGrid = true,
  gridLevels = 4,
  fillOpacity = 30,
  color = "6366F1",
  gridColor = "E5E7EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: RadarChartPreviewProps) {
  const resolvedTextColor = textColor || color;
  const count = items.length;

  if (count < 3) {
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
          항목을 3개 이상 추가하세요
        </p>
      </div>
    );
  }

  const svgSize = 260;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const chartRadius = 90;

  const axisEndpoints = getAxisEndpoints(count, cx, cy, chartRadius);
  const labelPositions = getLabelPositions(count, cx, cy, chartRadius);
  const dataPoints = getPolygonPoints(items, cx, cy, chartRadius);

  const opacityHex = Math.round((fillOpacity / 100) * 255)
    .toString(16)
    .padStart(2, "0");

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full max-w-[260px] max-h-[260px]">
        {/* Grid levels */}
        {showGrid &&
          Array.from({ length: gridLevels }, (_, level) => {
            const r = (chartRadius * (level + 1)) / gridLevels;
            const pts = getGridPolygonPoints(count, cx, cy, r);
            return (
              <polygon
                key={`grid-${level}`}
                points={pts}
                fill="none"
                stroke={`#${gridColor}`}
                strokeWidth="0.8"
              />
            );
          })}

        {/* Axes */}
        {axisEndpoints.map((pt, i) => (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={pt.x}
            y2={pt.y}
            stroke={`#${gridColor}`}
            strokeWidth="0.8"
          />
        ))}

        {/* Data polygon fill */}
        <polygon
          points={dataPoints}
          fill={`#${color}${opacityHex}`}
          stroke={`#${color}`}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {items.map((item, i) => {
          const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
          const r = (item.value / 100) * chartRadius;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={3}
              fill={`#${color}`}
            />
          );
        })}

        {/* Value labels on data points */}
        {showValues &&
          items.map((item, i) => {
            const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
            const r = (item.value / 100) * chartRadius;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle) - 6;
            return (
              <text
                key={`val-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                fill={`#${color}`}
                fontSize={VALUE_FONT_SIZE[fontSize]}
                fontWeight="600"
              >
                {item.value}
              </text>
            );
          })}

        {/* Labels */}
        {labelPositions.map((pos, i) => (
          <text
            key={`label-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor={pos.anchor as "start" | "middle" | "end"}
            dominantBaseline="central"
            fill={`#${resolvedTextColor}`}
            fontSize={LABEL_FONT_SIZE[fontSize]}
            fontWeight="500"
          >
            {items[i]?.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
