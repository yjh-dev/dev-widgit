"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatTime, type PomodoroMode } from "@/lib/pomodoro";
import type { FontSizeKey } from "@/lib/common-widget-options";

export type PomodoroProgressStyle = "bar" | "ring";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-7xl",
};

interface PomodoroPreviewProps {
  workTime?: number;
  breakTime?: number;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  longBreak?: number;
  rounds?: number;
  showRounds?: boolean;
  breakColor?: string;
  autoStart?: boolean;
  pStyle?: PomodoroProgressStyle;
}

export default function PomodoroPreview({
  workTime = 25,
  breakTime = 5,
  color = "E11D48",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  longBreak = 15,
  rounds = 4,
  showRounds = true,
  breakColor = "22C55E",
  autoStart = false,
  pStyle = "bar",
}: PomodoroPreviewProps) {
  const [mode, setMode] = useState<PomodoroMode>("work");
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [currentRound, setCurrentRound] = useState(1);
  const currentRoundRef = useRef(currentRound);
  currentRoundRef.current = currentRound;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMode("work");
    setTimeLeft(workTime * 60);
    setIsRunning(autoStart);
    setCurrentRound(1);
  }, [workTime, breakTime, longBreak, rounds, autoStart]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setMode((m) => {
            if (m === "work") {
              if (currentRoundRef.current >= rounds) {
                setTimeLeft(longBreak * 60);
                setCurrentRound(1);
                if (autoStart) setIsRunning(true);
                return "longBreak";
              }
              setTimeLeft(breakTime * 60);
              if (autoStart) setIsRunning(true);
              return "break";
            }
            // break or longBreak → next work
            if (m === "break") {
              setCurrentRound((r) => r + 1);
            }
            setTimeLeft(workTime * 60);
            if (autoStart) setIsRunning(true);
            return "work";
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, workTime, breakTime, longBreak, rounds, autoStart]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(workTime * 60);
    setCurrentRound(1);
  }, [workTime]);

  const totalSeconds =
    mode === "work" ? workTime * 60
    : mode === "longBreak" ? longBreak * 60
    : breakTime * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  const modeLabel = mode === "work" ? "집중" : mode === "longBreak" ? "긴 휴식" : "휴식";
  const modeColor = mode === "work" ? `#${color}` : `#${breakColor}`;

  const circumference = 2 * Math.PI * 54;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {/* 모드 라벨 */}
      <span
        className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
        style={{
          color: modeColor,
          backgroundColor: `${modeColor}18`,
        }}
      >
        {modeLabel}
      </span>

      {pStyle === "ring" ? (
        /* 링 프로그레스 */
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={`${modeColor}20`}
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={modeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              transform="rotate(-90 60 60)"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className={`${FONT_SIZE_MAP[fontSize]} font-light tabular-nums tracking-tight`}
              style={{
                color: modeColor,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: "1.5rem",
              }}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* 타이머 */}
          <p
            className={`${FONT_SIZE_MAP[fontSize]} font-light tabular-nums tracking-tight`}
            style={{
              color: modeColor,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
            }}
          >
            {formatTime(timeLeft)}
          </p>

          {/* 라운드 표시 */}
          {showRounds && (
            <p className="text-xs font-medium opacity-60" style={{ color: modeColor }}>
              {currentRound} / {rounds}
            </p>
          )}

          {/* 프로그레스 바 */}
          <div className="w-full max-w-[220px]">
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: `${modeColor}20` }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${progress}%`,
                  backgroundColor: modeColor,
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* 링 모드에서의 라운드 표시 */}
      {pStyle === "ring" && showRounds && (
        <p className="text-xs font-medium opacity-60" style={{ color: modeColor }}>
          {currentRound} / {rounds}
        </p>
      )}

      {/* 컨트롤 버튼 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsRunning((r) => !r)}
          aria-label={isRunning ? "일시 정지" : "시작"}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: modeColor,
            color: transparentBg ? "#FFFFFF" : `#${bg}`,
          }}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={handleReset}
          aria-label="초기화"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: `${modeColor}18`,
            color: modeColor,
          }}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
