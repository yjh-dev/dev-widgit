"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatCountdown } from "@/lib/countdown";
import type { FontSizeKey } from "@/lib/common-widget-options";

const TIME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-3xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const BTN_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
};

const RING_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 120,
  md: 160,
  lg: 200,
  xl: 240,
};

interface CountdownPreviewProps {
  minutes?: number;
  seconds?: number;
  showMs?: boolean;
  autoRestart?: boolean;
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function CountdownPreview({
  minutes = 5,
  seconds = 0,
  showMs = false,
  autoRestart = false,
  accentColor = "E11D48",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: CountdownPreviewProps) {
  const totalInitial = minutes * 60 + seconds;
  const [remaining, setRemaining] = useState(totalInitial);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);
  const endTimeRef = useRef(0);
  const flashRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [flashOn, setFlashOn] = useState(false);

  // Sync remaining when minutes/seconds props change and not running
  useEffect(() => {
    if (!running) {
      const newTotal = minutes * 60 + seconds;
      setRemaining(newTotal);
      setDone(false);
    }
  }, [minutes, seconds, running]);

  const tick = useCallback(() => {
    const now = Date.now();
    const left = Math.max(0, (endTimeRef.current - now) / 1000);
    setRemaining(left);
    if (left <= 0) {
      setRunning(false);
      setDone(true);
      if (autoRestart) {
        // auto restart after brief pause
        setTimeout(() => {
          const newTotal = minutes * 60 + seconds;
          setRemaining(newTotal);
          endTimeRef.current = Date.now() + newTotal * 1000;
          setDone(false);
          setRunning(true);
        }, 1000);
      }
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [autoRestart, minutes, seconds]);

  const start = useCallback(() => {
    const currentRemaining = done ? minutes * 60 + seconds : remaining;
    if (done) {
      setDone(false);
      setRemaining(currentRemaining);
    }
    endTimeRef.current = Date.now() + currentRemaining * 1000;
    setRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [remaining, done, minutes, seconds, tick]);

  const pause = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setRunning(false);
    setDone(false);
    setRemaining(minutes * 60 + seconds);
  }, [minutes, seconds]);

  // Handle running state RAF
  useEffect(() => {
    if (running) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, tick]);

  // Flash effect when done
  useEffect(() => {
    if (done && !autoRestart) {
      flashRef.current = setInterval(() => {
        setFlashOn((v) => !v);
      }, 500);
    } else {
      if (flashRef.current) clearInterval(flashRef.current);
      setFlashOn(false);
    }
    return () => {
      if (flashRef.current) clearInterval(flashRef.current);
    };
  }, [done, autoRestart]);

  const ringSize = RING_SIZE_MAP[fontSize];
  const strokeWidth = 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalInitial > 0 ? remaining / totalInitial : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {/* Ring progress + time */}
      <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
        <svg
          width={ringSize}
          height={ringSize}
          className="absolute inset-0"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke={`#${color}15`}
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke={done && flashOn ? `#${accentColor}` : `#${accentColor}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition: running ? "none" : "stroke-dashoffset 0.3s ease",
              opacity: done && flashOn ? 0.4 : 1,
            }}
          />
        </svg>
        <span
          className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums font-mono relative z-10`}
          style={{ color: done && flashOn ? `#${accentColor}` : `#${color}` }}
        >
          {formatCountdown(remaining, showMs)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {!running ? (
          <button
            type="button"
            onClick={start}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-opacity`}
            style={{ backgroundColor: `#${accentColor}` }}
          >
            <Play className="w-4 h-4 ml-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={pause}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-opacity`}
            style={{ backgroundColor: `#${accentColor}` }}
          >
            <Pause className="w-4 h-4" />
          </button>
        )}

        {(remaining < totalInitial || done) && !running && (
          <button
            type="button"
            onClick={resetTimer}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center transition-opacity border`}
            style={{ borderColor: `#${color}30`, color: `#${color}` }}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
