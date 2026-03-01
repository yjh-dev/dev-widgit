"use client";

import { useEffect, useState, startTransition } from "react";
import { getMoonPhase, getNextFullMoon, daysUntil, MOON_SIZE_MAP, type MoonStyle, type MoonSize } from "@/lib/moon-phase";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { name: string; sub: string }> = {
  sm: { name: "text-sm", sub: "text-xs" },
  md: { name: "text-base", sub: "text-sm" },
  lg: { name: "text-lg", sub: "text-base" },
  xl: { name: "text-xl", sub: "text-lg" },
};

interface MoonPhasePreviewProps {
  style?: MoonStyle;
  showName?: boolean;
  showPercent?: boolean;
  showNext?: boolean;
  moonColor?: string;
  shadowColor?: string;
  bg?: string;
  transparentBg?: boolean;
  textColor?: string;
  moonSize?: MoonSize;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

function MoonSVG({
  phase,
  moonColor,
  shadowColor,
  size,
}: {
  phase: number;
  moonColor: string;
  shadowColor: string;
  size: number;
}) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;

  // Calculate the terminator (shadow edge)
  // phase 0 = new moon (all shadow), 0.5 = full moon (all light), 1 = new moon
  const angle = phase * 2 * Math.PI;
  const cosAngle = Math.cos(angle);

  // The terminator is an ellipse edge; its x-radius depends on the phase
  const terminatorRx = Math.abs(cosAngle) * r;

  // Build the lit area path
  let litPath: string;
  if (phase < 0.25) {
    // Waxing crescent: lit on right side
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${terminatorRx} ${r} 0 0 1 ${cx} ${cy - r}`;
  } else if (phase < 0.5) {
    // Waxing gibbous: lit on right + middle
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${terminatorRx} ${r} 0 0 0 ${cx} ${cy - r}`;
  } else if (phase < 0.75) {
    // Waning gibbous: lit on left + middle
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${terminatorRx} ${r} 0 0 1 ${cx} ${cy - r}`;
  } else {
    // Waning crescent: lit on left side
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${terminatorRx} ${r} 0 0 0 ${cx} ${cy - r}`;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Shadow (dark) base */}
      <circle cx={cx} cy={cy} r={r} fill={`#${shadowColor}`} />
      {/* Lit area */}
      <path d={litPath} fill={`#${moonColor}`} />
      {/* Subtle gradient overlay for realism */}
      <circle cx={cx} cy={cy} r={r} fill="url(#moonGlow)" />
      <defs>
        <radialGradient id="moonGlow" cx="40%" cy="35%">
          <stop offset="0%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function MoonPhasePreview({
  style = "realistic",
  showName = true,
  showPercent = true,
  showNext = false,
  moonColor = "F5F5DC",
  shadowColor = "1A1A2E",
  bg = "0F172A",
  transparentBg = false,
  textColor = "E0E0E0",
  moonSize = "md",
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: MoonPhasePreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(() => getMoonPhase());
  const [nextFull, setNextFull] = useState<string>("");

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      const d = getMoonPhase();
      setData(d);
      if (showNext) {
        const nf = getNextFullMoon();
        const days = daysUntil(nf);
        setNextFull(`다음 보름달까지 ${days}일`);
      }
    });
  }, [showNext]);

  if (!mounted) return <div className="w-full h-full" />;

  const size = MOON_SIZE_MAP[moonSize];
  const fs = FONT_SIZE_MAP[fontSize];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        color: `#${textColor}`,
        borderRadius,
        padding,
      }}
    >
      {style === "emoji" ? (
        <span style={{ fontSize: size * 0.8 }}>{data.emoji}</span>
      ) : style === "simple" ? (
        <div
          className="rounded-full border-2"
          style={{
            width: size,
            height: size,
            borderColor: `#${moonColor}`,
            background: `conic-gradient(from 0deg, #${moonColor} ${data.illumination}%, #${shadowColor} ${data.illumination}%)`,
          }}
        />
      ) : (
        <MoonSVG phase={data.phase} moonColor={moonColor} shadowColor={shadowColor} size={size} />
      )}
      {showName && <p className={`${fs.name} font-medium`}>{data.name}</p>}
      {showPercent && <p className={`${fs.sub} opacity-70`}>조도 {data.illumination}%</p>}
      {showNext && nextFull && <p className={`${fs.sub} opacity-50`}>{nextFull}</p>}
    </div>
  );
}
