"use client";

import { formatDate, type ChangelogEntry } from "@/lib/changelog";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { desc: string; version: string; date: string }> = {
  sm: { desc: "text-xs", version: "text-xs", date: "text-[10px]" },
  md: { desc: "text-sm", version: "text-xs", date: "text-xs" },
  lg: { desc: "text-base", version: "text-sm", date: "text-xs" },
  xl: { desc: "text-lg", version: "text-base", date: "text-sm" },
};

interface ChangelogPreviewProps {
  entries?: ChangelogEntry[];
  showDate?: boolean;
  showVersion?: boolean;
  accentColor?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function ChangelogPreview({
  entries = [],
  showDate = true,
  showVersion = true,
  accentColor = "6366F1",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: ChangelogPreviewProps) {
  const sizes = FONT_SIZE_MAP[fontSize];
  const resolvedTextColor = textColor || "333333";

  if (entries.length === 0) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <p className="text-sm opacity-50" style={{ color: `#${accentColor}` }}>
          항목을 추가해주세요
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div className="w-full space-y-0">
        {entries.map((entry, i) => {
          const isLast = i === entries.length - 1;
          return (
            <div key={`${entry.version}-${i}`} className="flex gap-3">
              {/* Timeline dot + connecting line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: `#${accentColor}` }}
                />
                {!isLast && (
                  <div
                    className="w-px flex-1 my-1"
                    style={{ backgroundColor: `#${accentColor}30` }}
                  />
                )}
              </div>
              {/* Content */}
              <div className={`pb-4 ${isLast ? "pb-0" : ""} min-w-0 flex-1`}>
                <div className="flex items-center gap-2 flex-wrap">
                  {showVersion && entry.version && (
                    <span
                      className={`${sizes.version} font-semibold px-1.5 py-0.5 rounded`}
                      style={{
                        backgroundColor: `#${accentColor}20`,
                        color: `#${accentColor}`,
                      }}
                    >
                      {entry.version}
                    </span>
                  )}
                  {showDate && entry.date && (
                    <span
                      className={`${sizes.date} opacity-50`}
                      style={{ color: `#${resolvedTextColor}` }}
                    >
                      {formatDate(entry.date)}
                    </span>
                  )}
                </div>
                {entry.desc && (
                  <p
                    className={`${sizes.desc} mt-1 leading-relaxed`}
                    style={{ color: `#${resolvedTextColor}` }}
                  >
                    {entry.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
