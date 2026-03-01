"use client";

import { useEffect, useState, useRef, startTransition } from "react";
import { getClockTime, getClockDate } from "@/lib/clock";
import type { FlipClockFormat, FlipClockDateFormat } from "@/lib/flip-clock";
import type { ClockDateFormat } from "@/lib/clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

const SIZE_MAP: Record<FontSizeKey, { card: number; font: number; gap: number }> = {
  sm: { card: 48, font: 28, gap: 4 },
  md: { card: 64, font: 36, gap: 6 },
  lg: { card: 80, font: 48, gap: 8 },
  xl: { card: 96, font: 56, gap: 10 },
};

/* ── Keyframes (injected once globally) ── */

let keyframesInjected = false;
function injectKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  keyframesInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fc-fold-top {
      0%   { transform: rotateX(0deg); }
      100% { transform: rotateX(-90deg); }
    }
    @keyframes fc-unfold-bottom {
      0%   { transform: rotateX(90deg); }
      100% { transform: rotateX(0deg); }
    }
  `;
  document.head.appendChild(style);
}

/* ── FlipCard ── */

interface FlipCardProps {
  value: string;
  flipColor: string;
  textColor: string;
  gapColor: string;
  size: { card: number; font: number; gap: number };
}

function FlipCard({ value, flipColor, textColor, gapColor, size }: FlipCardProps) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== current) {
      startTransition(() => {
        setPrevious(current);
        setCurrent(value);
        setAnimating(true);
      });
      const timer = setTimeout(() => startTransition(() => setAnimating(false)), 600);
      return () => clearTimeout(timer);
    }
  }, [value, current]);

  const w = size.card;
  const h = size.card * 1.2;
  const halfH = h / 2;

  const digitStyle = (color: string): React.CSSProperties => ({
    width: w,
    height: h,
    fontSize: size.font,
    fontFamily: "ui-monospace, SFMono-Regular, monospace",
    color: `#${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  });

  const bgTop = `#${flipColor}`;
  const bgBottom = `#${flipColor}`;

  return (
    <div style={{ position: "relative", width: w, height: h, perspective: 400 }}>
      {/* ① Static top half — always shows CURRENT */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: halfH,
          overflow: "hidden",
          backgroundColor: bgTop,
          borderRadius: "6px 6px 0 0",
        }}
      >
        <div style={digitStyle(textColor)}>{current}</div>
      </div>

      {/* ② Static bottom half — shows CURRENT (or PREVIOUS during animation) */}
      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: halfH,
          overflow: "hidden",
          backgroundColor: bgBottom,
          borderRadius: "0 0 6px 6px",
          filter: "brightness(0.92)",
        }}
      >
        <div style={{ ...digitStyle(textColor), marginTop: -halfH }}>
          {animating ? previous : current}
        </div>
      </div>

      {/* ③ Flip-out: top flap folds DOWN with PREVIOUS value */}
      {animating && (
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: halfH,
            overflow: "hidden",
            backgroundColor: bgTop,
            borderRadius: "6px 6px 0 0",
            transformOrigin: "bottom center",
            animation: "fc-fold-top 0.3s ease-in forwards",
            backfaceVisibility: "hidden",
            zIndex: 2,
          }}
        >
          <div style={digitStyle(textColor)}>{previous}</div>
        </div>
      )}

      {/* ④ Flip-in: bottom flap unfolds DOWN with CURRENT value */}
      {animating && (
        <div
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: halfH,
            overflow: "hidden",
            backgroundColor: bgBottom,
            borderRadius: "0 0 6px 6px",
            filter: "brightness(0.92)",
            transformOrigin: "top center",
            animation: "fc-unfold-bottom 0.3s ease-out 0.3s forwards",
            transform: "rotateX(90deg)",
            backfaceVisibility: "hidden",
            zIndex: 2,
          }}
        >
          <div style={{ ...digitStyle(textColor), marginTop: -halfH }}>{current}</div>
        </div>
      )}

      {/* Gap line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 2,
          backgroundColor: `#${gapColor}`,
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      />
    </div>
  );
}

/* ── FlipClockPreview ── */

interface FlipClockPreviewProps {
  timezone?: string;
  format?: FlipClockFormat;
  showSeconds?: boolean;
  flipColor?: string;
  textColor?: string;
  gapColor?: string;
  bg?: string;
  transparentBg?: boolean;
  showDate?: boolean;
  dateFmt?: FlipClockDateFormat;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function FlipClockPreview({
  timezone = "Asia/Seoul",
  format = "24h",
  showSeconds = false,
  flipColor = "1E1E1E",
  textColor = "FFFFFF",
  gapColor = "333333",
  bg = "FFFFFF",
  transparentBg = false,
  showDate = false,
  dateFmt = "kr",
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: FlipClockPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ hours: "00", minutes: "00", seconds: "00", ampm: "" });
  const [dateStr, setDateStr] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    injectKeyframes();
    startTransition(() => { setMounted(true); });
    const update = () => {
      setTime(getClockTime(timezone, format));
      if (showDate) setDateStr(getClockDate(timezone, dateFmt as ClockDateFormat));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone, format, showDate, dateFmt]);

  // Auto-scale content to fit container
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const measure = () => {
      const cw = container.clientWidth - padding * 2;
      const ch = container.clientHeight - padding * 2;
      const sw = content.scrollWidth;
      const sh = content.scrollHeight;
      if (sw === 0 || sh === 0) return;
      setScale(Math.min(1, cw / sw, ch / sh));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [padding, showSeconds, fontSize, format, mounted]);

  const size = SIZE_MAP[fontSize];
  const colonW = size.gap * 3;

  if (!mounted) return <div className="w-full h-full" />;

  const pairs: string[][] = [
    [time.hours[0] ?? "0", time.hours[1] ?? "0"],
    [time.minutes[0] ?? "0", time.minutes[1] ?? "0"],
  ];
  if (showSeconds) {
    pairs.push([time.seconds[0] ?? "0", time.seconds[1] ?? "0"]);
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        overflow: "hidden",
      }}
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center gap-2"
        style={{ transform: `scale(${scale})`, transformOrigin: "center", flexShrink: 0 }}
      >
        <div className="flex items-center" style={{ gap: size.gap }}>
          {format === "12h" && time.ampm && (
            <span
              className="font-bold mr-1 opacity-60"
              style={{ color: `#${flipColor}`, fontSize: size.font * 0.4 }}
            >
              {time.ampm}
            </span>
          )}
          {pairs.map((pair, pairIdx) => (
            <div key={pairIdx} className="flex items-center" style={{ gap: size.gap }}>
              {pairIdx > 0 && (
                <div
                  className="flex flex-col items-center justify-center"
                  style={{ width: colonW, gap: size.gap }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: size.gap * 1.5,
                      height: size.gap * 1.5,
                      backgroundColor: `#${flipColor}`,
                    }}
                  />
                  <span
                    className="block rounded-full"
                    style={{
                      width: size.gap * 1.5,
                      height: size.gap * 1.5,
                      backgroundColor: `#${flipColor}`,
                    }}
                  />
                </div>
              )}
              {pair.map((digit, digitIdx) => (
                <FlipCard
                  key={`${pairIdx}-${digitIdx}`}
                  value={digit}
                  flipColor={flipColor}
                  textColor={textColor}
                  gapColor={gapColor}
                  size={size}
                />
              ))}
            </div>
          ))}
        </div>
        {showDate && dateStr && (
          <p className="text-sm opacity-60 whitespace-nowrap" style={{ color: `#${flipColor}` }}>
            {dateStr}
          </p>
        )}
      </div>
    </div>
  );
}
