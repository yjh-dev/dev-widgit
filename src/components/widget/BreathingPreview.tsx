"use client";

import { useState, useEffect, useRef, useCallback, startTransition } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { BreathingPhase } from "@/lib/breathing";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const SUB_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const CIRCLE_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 100,
  md: 130,
  lg: 160,
  xl: 190,
};

interface BreathingPreviewProps {
  inhale?: number;
  hold1?: number;
  exhale?: number;
  hold2?: number;
  rounds?: number;
  showGuide?: boolean;
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

function buildPhases(inhale: number, hold1: number, exhale: number, hold2: number): BreathingPhase[] {
  const phases: BreathingPhase[] = [];
  if (inhale > 0) phases.push({ name: "들이쉬기", duration: inhale });
  if (hold1 > 0) phases.push({ name: "참기", duration: hold1 });
  if (exhale > 0) phases.push({ name: "내쉬기", duration: exhale });
  if (hold2 > 0) phases.push({ name: "참기", duration: hold2 });
  return phases.length > 0 ? phases : [{ name: "들이쉬기", duration: 4 }, { name: "내쉬기", duration: 4 }];
}

export default function BreathingPreview({
  inhale = 4,
  hold1 = 7,
  exhale = 8,
  hold2 = 0,
  rounds = 3,
  showGuide = true,
  accentColor = "06B6D4",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: BreathingPreviewProps) {
  const phases = buildPhases(inhale, hold1, exhale, hold2);
  const reducedMotion = useReducedMotion();

  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phaseElapsed, setPhaseElapsed] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [done, setDone] = useState(false);

  const rafRef = useRef<number>(0);
  const lastTickRef = useRef(0);

  const currentPhase = phases[phaseIdx] || phases[0];
  const remaining = Math.max(0, currentPhase.duration - phaseElapsed);

  // Scale: 0 = smallest (hold/exhale end), 1 = largest (inhale end)
  const getScale = useCallback(() => {
    if (!running && !done && phaseIdx === 0 && phaseElapsed === 0) return 0.6;
    const phaseName = currentPhase.name;
    const progress = Math.min(phaseElapsed / currentPhase.duration, 1);
    if (phaseName === "들이쉬기") return 0.5 + 0.5 * progress;
    if (phaseName === "내쉬기") return 1.0 - 0.5 * progress;
    // Hold — stay at current size
    const prevPhase = phases[(phaseIdx - 1 + phases.length) % phases.length];
    return prevPhase.name === "들이쉬기" ? 1.0 : 0.5;
  }, [running, done, phaseIdx, phaseElapsed, currentPhase, phases]);

  const tick = useCallback(() => {
    const now = performance.now();
    const dt = (now - lastTickRef.current) / 1000;
    lastTickRef.current = now;

    setPhaseElapsed((prev) => {
      const next = prev + dt;
      if (next >= currentPhase.duration) {
        // Move to next phase
        const nextIdx = phaseIdx + 1;
        if (nextIdx >= phases.length) {
          // End of cycle
          if (currentRound >= rounds) {
            setRunning(false);
            setDone(true);
            return 0;
          }
          setCurrentRound((r) => r + 1);
          setPhaseIdx(0);
        } else {
          setPhaseIdx(nextIdx);
        }
        return 0;
      }
      return next;
    });
  }, [currentPhase.duration, phaseIdx, phases.length, currentRound, rounds]);

  useEffect(() => {
    if (!running) return;
    lastTickRef.current = performance.now();
    let active = true;
    const loop = () => {
      if (!active) return;
      tick();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [running, tick]);

  // Reset when props change
  useEffect(() => {
    startTransition(() => {
      setRunning(false);
      setPhaseIdx(0);
      setPhaseElapsed(0);
      setCurrentRound(1);
      setDone(false);
    });
  }, [inhale, hold1, exhale, hold2, rounds]);

  const handleStart = () => {
    if (done) {
      setPhaseIdx(0);
      setPhaseElapsed(0);
      setCurrentRound(1);
      setDone(false);
    }
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    setPhaseIdx(0);
    setPhaseElapsed(0);
    setCurrentRound(1);
    setDone(false);
  };

  const circleSize = CIRCLE_SIZE_MAP[fontSize];
  const scale = getScale();

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
      {/* Breathing circle */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: circleSize, height: circleSize }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `3px solid #${accentColor}30`,
          }}
        />
        {/* Animated inner circle */}
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: circleSize * 0.85,
            height: circleSize * 0.85,
            backgroundColor: `#${accentColor}20`,
            border: `2px solid #${accentColor}`,
            transform: `scale(${scale})`,
            transition: reducedMotion ? "none" : (running ? `transform ${currentPhase.duration}s linear` : "transform 0.3s ease"),
          }}
        >
          <div className="text-center">
            <p
              className={`${LABEL_SIZE_MAP[fontSize]} font-bold`}
              style={{ color: `#${accentColor}` }}
            >
              {done ? "완료!" : currentPhase.name}
            </p>
            {running && !done && (
              <p className={`${SUB_SIZE_MAP[fontSize]} font-mono`} style={{ opacity: 0.7 }}>
                {Math.ceil(remaining)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Round info */}
      {showGuide && (
        <p className={`${SUB_SIZE_MAP[fontSize]}`} style={{ opacity: 0.5 }}>
          {done ? `${rounds}라운드 완료` : `${currentRound} / ${rounds} 라운드`}
        </p>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        {running ? (
          <button
            type="button"
            onClick={() => setRunning(false)}
            aria-label="일시 정지"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95"
            style={{ backgroundColor: `#${accentColor}`, color: "#fff" }}
          >
            <Pause className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStart}
            aria-label="시작"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95"
            style={{ backgroundColor: `#${accentColor}`, color: "#fff" }}
          >
            <Play className="w-4 h-4 ml-0.5" />
          </button>
        )}
        <button
          type="button"
          onClick={handleReset}
          aria-label="초기화"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95"
          style={{ backgroundColor: `#${color}15`, color: `#${color}` }}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Phase guide */}
      {showGuide && !running && !done && (
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {phases.map((p, i) => (
            <span
              key={i}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `#${accentColor}15`,
                color: `#${accentColor}`,
              }}
            >
              {p.name} {p.duration}초
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
