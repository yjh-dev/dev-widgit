"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatTime, type PomodoroMode } from "@/lib/pomodoro";

interface PomodoroPreviewProps {
  workTime?: number;
  breakTime?: number;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
}

export default function PomodoroPreview({
  workTime = 25,
  breakTime = 5,
  color = "E11D48",
  bg = "FFFFFF",
  transparentBg = false,
}: PomodoroPreviewProps) {
  const [mode, setMode] = useState<PomodoroMode>("work");
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // workTime/breakTime prop이 바뀌면 리셋
  useEffect(() => {
    setMode("work");
    setTimeLeft(workTime * 60);
    setIsRunning(false);
  }, [workTime, breakTime]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 모드 전환
          setMode((m) => {
            const next: PomodoroMode = m === "work" ? "break" : "work";
            setTimeLeft(next === "work" ? workTime * 60 : breakTime * 60);
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, workTime, breakTime]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(workTime * 60);
  }, [workTime]);

  const totalSeconds = mode === "work" ? workTime * 60 : breakTime * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  const modeLabel = mode === "work" ? "집중" : "휴식";
  const modeColor = mode === "work" ? `#${color}` : "#22C55E";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4 p-6"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
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

      {/* 타이머 */}
      <p
        className="text-5xl font-light tabular-nums tracking-tight"
        style={{
          color: modeColor,
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        {formatTime(timeLeft)}
      </p>

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

      {/* 컨트롤 버튼 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsRunning((r) => !r)}
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
