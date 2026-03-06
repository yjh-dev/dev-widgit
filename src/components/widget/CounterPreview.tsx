"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  buildStorageKey,
  loadCount,
  saveCount,
  clampCount,
  formatCount,
} from "@/lib/counter";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";
import { useCelebration } from "@/hooks/useCelebration";
import Celebration from "@/components/widget/Celebration";

const NUM_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-3xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const BTN_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-11 h-11",
  xl: "w-13 h-13",
};

interface CounterPreviewProps {
  label?: string;
  initial?: number;
  step?: number;
  min?: number;
  max?: number;
  showReset?: boolean;
  color?: string;
  btnColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
  persist?: boolean;
  celebrate?: boolean;
}

export default function CounterPreview({
  label = "카운터",
  initial = 0,
  step = 1,
  min,
  max,
  showReset = true,
  color = "1E1E1E",
  btnColor = "2563EB",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
  persist = false,
  celebrate = true,
}: CounterPreviewProps) {
  const storageKey = buildStorageKey({ label, initial, step, min, max });

  const [count, setCount] = useState(() => {
    if (persist) return loadCount(storageKey, initial);
    return initial;
  });

  useEffect(() => {
    if (persist) {
      saveCount(storageKey, count);
    }
  }, [count, persist, storageKey]);

  useEffect(() => {
    if (!persist) {
      startTransition(() => setCount(initial));
    }
  }, [initial, persist]);

  const increment = useCallback(() => {
    setCount((prev) => clampCount(prev + step, min, max));
  }, [step, min, max]);

  const decrement = useCallback(() => {
    setCount((prev) => clampCount(prev - step, min, max));
  }, [step, min, max]);

  const handleReset = useCallback(() => {
    setCount(initial);
    if (persist) saveCount(storageKey, initial);
  }, [initial, persist, storageKey]);

  const atMin = min !== undefined && count <= min;
  const atMax = max !== undefined && count >= max;

  const fontStyle = resolveFontStyle(font);
  const showCelebration = useCelebration(max !== undefined && count >= max, celebrate);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center gap-3 ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <Celebration active={showCelebration} color={btnColor} />
      <p className={`${LABEL_SIZE_MAP[fontSize]} opacity-60 font-medium`}>{label}</p>

      <p className={`${NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}>
        {formatCount(count)}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          disabled={atMin}
          aria-label="감소"
          className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-all hover:opacity-80 active:scale-95 disabled:opacity-30`}
          style={{ backgroundColor: `#${btnColor}` }}
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={increment}
          disabled={atMax}
          aria-label="증가"
          className={`${BTN_SIZE_MAP[fontSize]} rounded-full flex items-center justify-center text-white transition-all hover:opacity-80 active:scale-95 disabled:opacity-30`}
          style={{ backgroundColor: `#${btnColor}` }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showReset && (
        <button
          type="button"
          onClick={handleReset}
          aria-label="초기화"
          className="flex items-center gap-1 text-xs opacity-40 hover:opacity-70 active:scale-95 transition-all mt-1"
          style={{ color: `#${color}` }}
        >
          <RotateCcw className="w-3 h-3" />
          초기화
        </button>
      )}
    </div>
  );
}
