"use client";

import { useState, useEffect, useRef, useCallback, startTransition } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import type { RoutineStep } from "@/lib/routine-timer";
import { getTotalMinutes } from "@/lib/routine-timer";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const TIME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const STEP_NAME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

const BTN_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-14 h-14",
};

interface RoutineTimerPreviewProps {
  steps: RoutineStep[];
  autoNext?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function RoutineTimerPreview({
  steps,
  autoNext = true,
  color = "2563EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: RoutineTimerPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps.length > 0 ? steps[0].minutes * 60 : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset when steps change
  useEffect(() => {
    startTransition(() => {
      setCurrentStep(0);
      setTimeLeft(steps.length > 0 ? steps[0].minutes * 60 : 0);
      setIsRunning(false);
      setFinished(false);
    });
  }, [steps]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advanceStep = useCallback(() => {
    const nextStep = currentStep + 1;
    if (nextStep >= steps.length) {
      setFinished(true);
      setIsRunning(false);
      clearTimer();
      return;
    }
    setCurrentStep(nextStep);
    setTimeLeft(steps[nextStep].minutes * 60);
    if (!autoNext) {
      setIsRunning(false);
      clearTimer();
    }
  }, [currentStep, steps, autoNext, clearTimer]);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advanceStep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, clearTimer, advanceStep]);

  const handleReset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setCurrentStep(0);
    setTimeLeft(steps.length > 0 ? steps[0].minutes * 60 : 0);
    setFinished(false);
  }, [steps, clearTimer]);

  const handleSkip = useCallback(() => {
    advanceStep();
  }, [advanceStep]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const effectiveText = textColor || (transparentBg ? "" : "1E1E1E");
  const fontStyle = resolveFontStyle(font);
  const totalMinutes = getTotalMinutes(steps);

  if (steps.length === 0) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${fontStyle.className ?? ""}`}
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          color: effectiveText ? `#${effectiveText}` : undefined,
          fontFamily: fontStyle.fontFamily,
          borderRadius,
          padding,
        }}
      >
        <p className="text-sm opacity-60">루틴 단계를 추가하세요</p>
      </div>
    );
  }

  const step = steps[currentStep] ?? steps[0];
  const stepTotalSec = step.minutes * 60;
  const progress = stepTotalSec > 0 ? ((stepTotalSec - timeLeft) / stepTotalSec) * 100 : 0;

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        color: effectiveText ? `#${effectiveText}` : undefined,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <div
        className="w-full flex flex-col items-center gap-3"
        style={{ borderRadius, padding }}
      >
        {/* Total info */}
        <div className={`${LABEL_SIZE_MAP[fontSize]} opacity-50 font-medium`}>
          총 {totalMinutes}분 루틴
        </div>

        {/* Current step name */}
        {!finished ? (
          <>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: `#${color}` }}
              >
                {currentStep + 1}
              </span>
              <span className={`${STEP_NAME_SIZE_MAP[fontSize]} font-semibold`}>
                {step.name}
              </span>
            </div>

            {/* Time remaining */}
            <p
              className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums font-mono`}
              style={{ color: `#${color}` }}
            >
              {formatTime(timeLeft)}
            </p>

            {/* Progress bar for current step */}
            <div className="w-full max-w-[240px]">
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: `#${color}20` }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%`, backgroundColor: `#${color}` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRunning((r) => !r)}
                aria-label={isRunning ? "일시 정지" : "시작"}
                className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-all hover:opacity-80 active:scale-95`}
                style={{ backgroundColor: `#${color}` }}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                aria-label="다음 단계"
                className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95 border`}
                style={{ borderColor: `#${color}30`, color: `#${color}` }}
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                aria-label="초기화"
                className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95 border`}
                style={{ borderColor: `#${color}30`, color: `#${color}` }}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={`${STEP_NAME_SIZE_MAP[fontSize]} font-semibold`}>
              루틴 완료!
            </p>
            <button
              type="button"
              onClick={handleReset}
              aria-label="다시 시작"
              className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-all hover:opacity-80 active:scale-95`}
              style={{ backgroundColor: `#${color}` }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Step list */}
        <div className="w-full max-w-[260px] space-y-1 mt-1">
          {steps.map((s, i) => {
            const isDone = finished || i < currentStep;
            const isCurrent = !finished && i === currentStep;
            return (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-1 rounded ${LABEL_SIZE_MAP[fontSize]} transition-all`}
                style={{
                  backgroundColor: isCurrent ? `#${color}10` : "transparent",
                  opacity: isDone ? 0.4 : 1,
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0"
                  style={{
                    backgroundColor: isCurrent ? `#${color}` : isDone ? `#${color}60` : `#${color}20`,
                    color: isCurrent || isDone ? "white" : `#${color}`,
                  }}
                >
                  {isDone ? "\u2713" : i + 1}
                </span>
                <span className={`flex-1 truncate ${isCurrent ? "font-semibold" : ""}`}>
                  {s.name}
                </span>
                <span className="tabular-nums font-mono opacity-60 shrink-0">
                  {s.minutes}분
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
