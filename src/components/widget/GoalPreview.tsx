"use client";

import { calculateGoalProgress, type GoalStyle, type GoalIcon } from "@/lib/goal";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";
import { useCelebration } from "@/hooks/useCelebration";
import Celebration from "@/components/widget/Celebration";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const ICON_FONT_SIZE: Record<FontSizeKey, { title: string; count: string }> = {
  sm: { title: "text-xs", count: "text-sm" },
  md: { title: "text-sm", count: "text-base" },
  lg: { title: "text-base", count: "text-lg" },
  xl: { title: "text-lg", count: "text-xl" },
};

const BAR_HEIGHT = "h-3";

function GoalIconSvg({ filled, color, icon }: { filled: boolean; color: string; icon: GoalIcon }) {
  const opacity = filled ? 1 : 0.25;
  const fill = filled ? `#${color}` : "none";

  if (icon === "book") {
    return (
      <svg viewBox="0 0 20 26" width={20} height={26} className="transition-all duration-300">
        <rect x="2" y="2" width="14" height="20" rx="1" fill={fill} stroke={`#${color}`} strokeWidth="1.5" opacity={opacity} />
        <line x1="5" y1="2" x2="5" y2="22" stroke={filled ? `#${color}80` : `#${color}40`} strokeWidth="1" />
        {filled && <polygon points="10,2 14,2 14,7 12,5.5 10,7" fill={`#${color}CC`} />}
      </svg>
    );
  }

  if (icon === "star") {
    return (
      <svg viewBox="0 0 20 20" width={20} height={20} className="transition-all duration-300">
        <polygon points="10,2 12.5,7.5 18,8 14,12 15,18 10,15 5,18 6,12 2,8 7.5,7.5" fill={fill} stroke={`#${color}`} strokeWidth="1.2" opacity={opacity} />
      </svg>
    );
  }

  if (icon === "heart") {
    return (
      <svg viewBox="0 0 20 20" width={20} height={20} className="transition-all duration-300">
        <path d="M10 17s-7-4.5-7-9a3.5 3.5 0 0 1 7 0 3.5 3.5 0 0 1 7 0c0 4.5-7 9-7 9z" fill={fill} stroke={`#${color}`} strokeWidth="1.2" opacity={opacity} />
      </svg>
    );
  }

  if (icon === "check") {
    return (
      <svg viewBox="0 0 20 20" width={20} height={20} className="transition-all duration-300">
        <rect x="2" y="2" width="16" height="16" rx="3" fill={fill} stroke={`#${color}`} strokeWidth="1.2" opacity={opacity} />
        {filled && <polyline points="6,10 9,13 14,7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    );
  }

  // default: circle
  return (
    <svg viewBox="0 0 20 20" width={20} height={20} className="transition-all duration-300">
      <circle cx="10" cy="10" r="8" fill={fill} stroke={`#${color}`} strokeWidth="1.5" opacity={opacity} />
    </svg>
  );
}

interface GoalPreviewProps {
  title?: string;
  current?: number;
  target?: number;
  unit?: string;
  style?: GoalStyle;
  showValue?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
  icon?: GoalIcon;
  year?: string;
  celebrate?: boolean;
}

export default function GoalPreview({
  title = "",
  current = 0,
  target = 100,
  unit = "",
  style = "bar",
  showValue = true,
  color = "2563EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
  icon = "",
  year = "",
  celebrate = true,
}: GoalPreviewProps) {
  const { percentage, remaining } = calculateGoalProgress(current, target);
  const pct = Math.min(percentage, 100);
  const resolvedTextColor = textColor || color;
  const circumference = 2 * Math.PI * 54;
  const fontStyle = resolveFontStyle(font);
  const showCelebration = useCelebration(pct >= 100, celebrate);

  if (style === "icons") {
    const displayTarget = Math.min(target, 48);
    const displayCurrent = Math.min(current, displayTarget);
    const resolvedIcon: GoalIcon = icon || "circle";
    const fs = ICON_FONT_SIZE[fontSize];

    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
          fontFamily: fontStyle.fontFamily,
        }}
      >
        <Celebration active={showCelebration} color={color} />
        <p
          className={`${fs.title} font-medium mb-2 opacity-70`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title || (year ? `${year} 목표` : "목표")}
        </p>

        <div className="flex flex-wrap justify-center gap-1 max-w-[280px] mb-3">
          {Array.from({ length: displayTarget }, (_, i) => (
            <GoalIconSvg key={i} filled={i < displayCurrent} color={color} icon={resolvedIcon} />
          ))}
        </div>

        <p
          className={`${fs.count} font-bold tabular-nums`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {current} / {target}{unit ? ` ${unit}` : ""}
        </p>

        <p
          className="text-xs font-medium mt-1 opacity-50"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {pct.toFixed(1)}%{remaining > 0 ? ` · ${remaining}${unit ? ` ${unit}` : ""} 남음` : " 달성!"}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <Celebration active={showCelebration} color={color} />
      {title && (
        <p
          className="text-sm font-medium mb-1 opacity-70"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      {style === "ring" ? (
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 120 120" width={120} height={120}>
            <circle
              cx="60" cy="60" r="54"
              fill="none" stroke={`#${color}20`} strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r="54"
              fill="none" stroke={`#${color}`} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct / 100)}
              transform="rotate(-90 60 60)"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-lg font-bold tabular-nums"
              style={{ color: `#${resolvedTextColor}` }}
            >
              {pct.toFixed(1)}%
            </p>
          </div>
        </div>
      ) : (
        <>
          <p
            className={`${FONT_SIZE_MAP[fontSize]} font-bold tabular-nums mb-4`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {pct.toFixed(1)}%
          </p>
          <div className="w-full max-w-[260px]">
            <div
              className={`w-full ${BAR_HEIGHT} rounded-full overflow-hidden`}
              style={{ backgroundColor: `#${color}20` }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: `#${color}`,
                }}
              />
            </div>
          </div>
        </>
      )}

      {showValue && (
        <p
          className="text-xs font-medium mt-2 opacity-50"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {current} / {target}{unit ? ` ${unit}` : ""}
        </p>
      )}
    </div>
  );
}
