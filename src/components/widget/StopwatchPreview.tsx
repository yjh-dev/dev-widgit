"use client";

import { useState, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import { formatTime } from "@/lib/stopwatch";
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

interface StopwatchPreviewProps {
  showMs?: boolean;
  showLap?: boolean;
  color?: string;
  btnColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function StopwatchPreview({
  showMs = false,
  showLap = false,
  color = "1E1E1E",
  btnColor = "2563EB",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: StopwatchPreviewProps) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  const start = useCallback(() => {
    startTimeRef.current = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, showMs ? 10 : 100);
    setRunning(true);
  }, [elapsed, showMs]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
    setLaps([]);
  }, [stop]);

  const lap = useCallback(() => {
    if (running) {
      setLaps((prev) => [...prev, elapsed]);
    }
  }, [running, elapsed]);

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
      <p className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums font-mono`}>
        {formatTime(elapsed, showMs)}
      </p>

      <div className="flex items-center gap-2">
        {!running ? (
          <button
            type="button"
            onClick={start}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-opacity`}
            style={{ backgroundColor: `#${btnColor}` }}
          >
            <Play className="w-4 h-4 ml-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-opacity`}
            style={{ backgroundColor: `#${btnColor}` }}
          >
            <Pause className="w-4 h-4" />
          </button>
        )}

        {showLap && running && (
          <button
            type="button"
            onClick={lap}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center transition-opacity border`}
            style={{ borderColor: `#${color}30`, color: `#${color}` }}
          >
            <Flag className="w-4 h-4" />
          </button>
        )}

        {(elapsed > 0 && !running) && (
          <button
            type="button"
            onClick={reset}
            className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center transition-opacity border`}
            style={{ borderColor: `#${color}30`, color: `#${color}` }}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {showLap && laps.length > 0 && (
        <div className="w-full max-w-[200px] max-h-[80px] overflow-y-auto mt-1">
          {laps.map((lapTime, i) => (
            <div
              key={i}
              className="flex justify-between text-xs opacity-60 py-0.5"
            >
              <span>Lap {i + 1}</span>
              <span className="tabular-nums font-mono">
                {formatTime(lapTime, showMs)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
