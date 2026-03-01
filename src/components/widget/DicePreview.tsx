"use client";

import { useState, useCallback, useEffect, startTransition } from "react";
import { rollDice, flipCoin, pickRandom, D6_DOTS, type DiceMode, type DiceSides } from "@/lib/dice";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const FONT_SIZE_MAP: Record<FontSizeKey, { dice: number; text: string }> = {
  sm: { dice: 48, text: "text-sm" },
  md: { dice: 64, text: "text-base" },
  lg: { dice: 80, text: "text-lg" },
  xl: { dice: 96, text: "text-xl" },
};

function DiceFace({ value, sides, color, textColor, size }: {
  value: number;
  sides: DiceSides;
  color: string;
  textColor: string;
  size: number;
}) {
  if (sides === 6) {
    const dots = D6_DOTS[value] || D6_DOTS[1];
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="2" y="2" width="96" height="96" rx="12" fill={`#${color}`} />
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" fill={`#${textColor}`} />
        ))}
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x="2" y="2" width="96" height="96" rx="12" fill={`#${color}`} />
      <text
        x="50" y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`#${textColor}`}
        fontSize="36"
        fontWeight="bold"
        fontFamily="ui-monospace, monospace"
      >
        {value}
      </text>
      <text
        x="50" y="88"
        textAnchor="middle"
        fill={`#${textColor}`}
        fontSize="12"
        opacity="0.6"
        fontFamily="ui-sans-serif, sans-serif"
      >
        D{sides}
      </text>
    </svg>
  );
}

interface DicePreviewProps {
  mode?: DiceMode;
  count?: number;
  sides?: DiceSides;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  items?: string[];
  showTotal?: boolean;
  history?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function DicePreview({
  mode = "dice",
  count = 1,
  sides = 6,
  color = "2563EB",
  textColor = "FFFFFF",
  bg = "FFFFFF",
  transparentBg = false,
  items = [],
  showTotal = true,
  history: showHistory = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: DicePreviewProps) {
  const [diceValues, setDiceValues] = useState<number[]>(Array.from({ length: count }, () => 1));
  const [coinResult, setCoinResult] = useState<string>("");
  const [pickerResult, setPickerResult] = useState<string>("");
  const [rolling, setRolling] = useState(false);
  const [historyList, setHistoryList] = useState<string[]>([]);

  // count 변경 시 diceValues 배열 길이 동기화
  useEffect(() => {
    startTransition(() => {
      setDiceValues((prev) => {
        if (prev.length === count) return prev;
        if (prev.length < count) return [...prev, ...Array.from({ length: count - prev.length }, () => 1)];
        return prev.slice(0, count);
      });
    });
  }, [count]);

  const sizeConfig = FONT_SIZE_MAP[fontSize];

  const handleRoll = useCallback(() => {
    setRolling(true);
    setTimeout(() => {
      if (mode === "dice") {
        const results = Array.from({ length: count }, () => rollDice(sides));
        setDiceValues(results);
        if (showHistory) {
          const label = results.length > 1 ? `[${results.join(",")}] = ${results.reduce((a, b) => a + b, 0)}` : String(results[0]);
          setHistoryList((prev) => [label, ...prev].slice(0, 5));
        }
      } else if (mode === "coin") {
        const result = flipCoin();
        setCoinResult(result);
        if (showHistory) setHistoryList((prev) => [result, ...prev].slice(0, 5));
      } else {
        const result = pickRandom(items);
        setPickerResult(result);
        if (showHistory) setHistoryList((prev) => [result, ...prev].slice(0, 5));
      }
      setRolling(false);
    }, 300);
  }, [mode, count, sides, items, showHistory]);

  const textColorHex = `#${color === "FFFFFF" ? "1E1E1E" : color}`;
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-3 ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {mode === "dice" && (
        <>
          <div className={`flex flex-wrap items-center justify-center gap-2 ${rolling ? "animate-pulse" : ""}`}>
            {diceValues.map((val, i) => (
              <DiceFace key={i} value={val} sides={sides} color={color} textColor={textColor} size={sizeConfig.dice} />
            ))}
          </div>
          {showTotal && count > 1 && (
            <p className={`${sizeConfig.text} font-bold`} style={{ color: textColorHex }}>
              합계: {diceValues.reduce((a, b) => a + b, 0)}
            </p>
          )}
        </>
      )}

      {mode === "coin" && (
        <div className={`flex flex-col items-center gap-2 ${rolling ? "animate-pulse" : ""}`}>
          <div
            className="rounded-full flex items-center justify-center font-bold border-4"
            style={{
              width: sizeConfig.dice * 1.2,
              height: sizeConfig.dice * 1.2,
              backgroundColor: `#${color}`,
              borderColor: `#${color}`,
              color: `#${textColor}`,
              fontSize: sizeConfig.dice * 0.3,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          >
            {coinResult || "?"}
          </div>
        </div>
      )}

      {mode === "picker" && (
        <div className={`flex flex-col items-center gap-2 ${rolling ? "animate-pulse" : ""}`}>
          <div
            className="px-6 py-3 rounded-lg font-bold text-center"
            style={{
              backgroundColor: `#${color}`,
              color: `#${textColor}`,
              fontSize: sizeConfig.dice * 0.35,
              minWidth: sizeConfig.dice * 1.5,
            }}
          >
            {pickerResult || "?"}
          </div>
          {items.length > 0 && (
            <p className="text-xs opacity-50" style={{ color: textColorHex }}>
              {items.length}개 항목 중 하나
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleRoll}
        disabled={rolling || (mode === "picker" && items.length === 0)}
        aria-label={mode === "dice" ? "주사위 굴리기" : mode === "coin" ? "동전 던지기" : "랜덤 뽑기"}
        className="px-4 py-2 rounded-lg font-medium text-sm transition-all hover:opacity-80 active:scale-95 disabled:opacity-50"
        style={{
          backgroundColor: `#${color}`,
          color: `#${textColor}`,
        }}
      >
        {mode === "dice" ? "🎲 굴리기" : mode === "coin" ? "🪙 던지기" : "🎰 뽑기"}
      </button>

      {showHistory && historyList.length > 0 && (
        <div className="w-full mt-1">
          <div className="flex flex-wrap gap-1 justify-center">
            {historyList.map((h, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full opacity-60"
                style={{ backgroundColor: `#${color}20`, color: textColorHex }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
