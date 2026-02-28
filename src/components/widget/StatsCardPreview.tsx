"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { StatItem } from "@/lib/stats-card";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { value: string; label: string; trend: string }> = {
  sm: { value: "text-lg", label: "text-[10px]", trend: "text-[10px]" },
  md: { value: "text-2xl", label: "text-xs", trend: "text-xs" },
  lg: { value: "text-3xl", label: "text-sm", trend: "text-sm" },
  xl: { value: "text-4xl", label: "text-base", trend: "text-base" },
};

const DEFAULT_STATS: StatItem[] = [
  { label: "방문자", value: "1,234", trend: "up", trendValue: "+12%" },
];

interface StatsCardPreviewProps {
  stats?: StatItem[];
  layout?: "row" | "grid";
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function StatsCardPreview({
  stats = [],
  layout = "row",
  accentColor = "2563EB",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: StatsCardPreviewProps) {
  const displayStats = stats.length > 0 ? stats : DEFAULT_STATS;
  const sizes = FONT_SIZE_MAP[fontSize];

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-2 gap-4 w-full"
            : "flex flex-wrap items-center justify-center gap-6 w-full"
        }
      >
        {displayStats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col ${layout === "grid" ? "items-start" : "items-center"} gap-1`}
          >
            <p
              className={`${sizes.value} font-bold leading-none`}
              style={{ color: `#${color}` }}
            >
              {stat.value}
            </p>
            <p
              className={`${sizes.label} font-medium opacity-60`}
              style={{ color: `#${color}` }}
            >
              {stat.label}
            </p>
            {stat.trend !== "none" && stat.trendValue && (
              <div
                className={`flex items-center gap-0.5 ${sizes.trend} font-medium`}
                style={{
                  color:
                    stat.trend === "up"
                      ? "#22C55E"
                      : stat.trend === "down"
                        ? "#EF4444"
                        : `#${accentColor}`,
                }}
              >
                {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                {stat.trend === "down" && <TrendingDown className="w-3 h-3" />}
                <span>{stat.trendValue}</span>
              </div>
            )}
            <div
              className="w-8 h-0.5 rounded-full mt-1"
              style={{ backgroundColor: `#${accentColor}` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
