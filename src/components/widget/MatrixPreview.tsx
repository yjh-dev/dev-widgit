"use client";

import { DEFAULT_LABELS, QUADRANT_COLORS, type MatrixItem } from "@/lib/matrix";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { label: string; item: string }> = {
  sm: { label: "text-[10px]", item: "text-[9px]" },
  md: { label: "text-xs", item: "text-[10px]" },
  lg: { label: "text-sm", item: "text-xs" },
  xl: { label: "text-base", item: "text-sm" },
};

interface MatrixPreviewProps {
  items?: MatrixItem[];
  labels?: [string, string, string, string];
  showLabels?: boolean;
  showAxes?: boolean;
  axisX?: string;
  axisY?: string;
  color0?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function MatrixPreview({
  items = [],
  labels = [...DEFAULT_LABELS] as [string, string, string, string],
  showLabels = true,
  showAxes = true,
  axisX = "긴급도",
  axisY = "중요도",
  color0 = QUADRANT_COLORS[0],
  color1 = QUADRANT_COLORS[1],
  color2 = QUADRANT_COLORS[2],
  color3 = QUADRANT_COLORS[3],
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: MatrixPreviewProps) {
  const colors = [color0, color1, color2, color3];
  const resolvedTextColor = textColor || "333333";
  const sizes = FONT_SIZE_MAP[fontSize];

  const quadrantItems = (q: number) => items.filter((item) => item.quadrant === q);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div className="w-full flex flex-col gap-0.5">
        {/* Y-axis top label */}
        {showAxes && (
          <div className="flex justify-center mb-1">
            <span
              className={`${sizes.item} font-medium opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {axisY} ↑
            </span>
          </div>
        )}

        <div className="flex items-stretch gap-0.5">
          {/* Optional Y-axis left area */}
          {showAxes && (
            <div className="flex items-center pr-1">
              <span
                className={`${sizes.item} font-medium opacity-60 writing-vertical`}
                style={{
                  color: `#${resolvedTextColor}`,
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                ← {axisX}
              </span>
            </div>
          )}

          {/* 2x2 grid */}
          <div className="flex-1 grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((q) => (
              <div
                key={q}
                className="rounded-md p-2 min-h-[60px]"
                style={{ backgroundColor: `#${colors[q]}18` }}
              >
                {showLabels && (
                  <p
                    className={`${sizes.label} font-semibold mb-1 truncate`}
                    style={{ color: `#${colors[q]}` }}
                  >
                    {labels[q]}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {quadrantItems(q).map((item, i) => (
                    <li
                      key={i}
                      className={`${sizes.item} flex items-start gap-1`}
                      style={{ color: `#${resolvedTextColor}` }}
                    >
                      <span
                        className="mt-[3px] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: `#${colors[q]}` }}
                      />
                      <span className="break-words leading-tight">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Optional Y-axis right area */}
          {showAxes && (
            <div className="flex items-center pl-1">
              <span
                className={`${sizes.item} font-medium opacity-60`}
                style={{
                  color: `#${resolvedTextColor}`,
                  writingMode: "vertical-rl",
                }}
              >
                {axisX} →
              </span>
            </div>
          )}
        </div>

        {/* Y-axis bottom label */}
        {showAxes && (
          <div className="flex justify-center mt-1">
            <span
              className={`${sizes.item} font-medium opacity-60`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              ↓ 비{axisY}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
