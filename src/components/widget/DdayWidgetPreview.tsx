"use client";

import { useEffect, useState, startTransition } from "react";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart } from "lucide-react";
import {
  calculateDday,
  calculateDdayWithTime,
  calculateProgress,
  calculateAnniversary,
  calculateElapsed,
  toLocalDate,
  type DdayDisplayMode,
  type AnniversaryResult,
  type ElapsedResult,
} from "@/lib/dday";
import { fontMap, type FontKey } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";
import DdayProgressBar from "./DdayProgressBar";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-7xl",
};

/* Anniversary mode size maps */
const ANNIV_TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};
const ANNIV_COUNT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};
const ANNIV_LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};
const ANNIV_HEART_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 20,
  md: 28,
  lg: 36,
  xl: 44,
};

/* Elapsed mode size maps */
const ELAPSED_TITLE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};
const ELAPSED_NUM_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};
const ELAPSED_LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

export type DdayDateFormat = "full" | "short" | "dot" | "none";

interface DdayWidgetPreviewProps {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  calcType?: "down" | "up";
  isAnnual?: boolean;
  layout?: "default" | "progress";
  startDate?: string;
  isTransparent?: boolean;
  font?: FontKey;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  showTime?: boolean;
  blink?: boolean;
  doneMsg?: string;
  barColor?: string;
  dateFmt?: DdayDateFormat;
  displayMode?: DdayDisplayMode;
  /* Anniversary-specific extras (for compatibility) */
  showWeeks?: boolean;
  showMonths?: boolean;
  accentColor?: string;
  /* Elapsed-specific extras (for compatibility) */
  showSeconds?: boolean;
  /* Schedule: hide when done */
  hideOnDone?: boolean;
}

function formatDdayDate(parsed: Date, dateFmt: DdayDateFormat): string {
  switch (dateFmt) {
    case "none":
      return "";
    case "short":
      return format(parsed, "MM.dd (EEE)", { locale: ko });
    case "dot":
      return format(parsed, "yyyy.MM.dd");
    case "full":
    default:
      return format(parsed, "yyyy.MM.dd (EEE)", { locale: ko });
  }
}

/* ── Anniversary sub-component ──────────────────────── */
function AnniversaryView({
  title,
  targetDate,
  textColor,
  accentColor,
  fontSize,
  showWeeks,
  showMonths,
}: {
  title: string;
  targetDate: string;
  textColor: string;
  accentColor: string;
  fontSize: FontSizeKey;
  showWeeks: boolean;
  showMonths: boolean;
}) {
  const result: AnniversaryResult | null = targetDate
    ? calculateAnniversary(targetDate)
    : null;

  const resolvedAccent = accentColor || textColor;

  return (
    <>
      <Heart
        size={ANNIV_HEART_SIZE_MAP[fontSize]}
        fill={`#${resolvedAccent}`}
        color={`#${resolvedAccent}`}
      />
      {title && (
        <p
          className={`${ANNIV_TITLE_SIZE_MAP[fontSize]} font-medium opacity-80`}
          style={{ color: `#${textColor}` }}
        >
          {title}
        </p>
      )}
      {result ? (
        <>
          <p
            className={`${ANNIV_COUNT_SIZE_MAP[fontSize]} font-bold tabular-nums`}
            style={{ color: `#${textColor}` }}
          >
            {result.days}
            <span className={`${ANNIV_TITLE_SIZE_MAP[fontSize]} font-normal ml-1`}>
              일
            </span>
          </p>
          <div className="flex gap-4 mt-1">
            <div className="text-center">
              <p
                className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                style={{ color: `#${resolvedAccent}` }}
              >
                {result.days}
              </p>
              <p
                className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} opacity-60`}
                style={{ color: `#${textColor}` }}
              >
                일
              </p>
            </div>
            {showWeeks && (
              <div className="text-center">
                <p
                  className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${resolvedAccent}` }}
                >
                  {result.weeks}
                </p>
                <p
                  className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${textColor}` }}
                >
                  주
                </p>
              </div>
            )}
            {showMonths && (
              <div className="text-center">
                <p
                  className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${resolvedAccent}` }}
                >
                  {result.months}
                </p>
                <p
                  className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${textColor}` }}
                >
                  개월
                </p>
              </div>
            )}
          </div>
          <p
            className={`${ANNIV_LABEL_SIZE_MAP[fontSize]} opacity-50 mt-1`}
            style={{ color: `#${textColor}` }}
          >
            다음 기념일: {result.nextHundred}일
          </p>
        </>
      ) : (
        <p
          className={`${ANNIV_TITLE_SIZE_MAP[fontSize]} opacity-50`}
          style={{ color: `#${textColor}` }}
        >
          날짜를 선택하세요
        </p>
      )}
    </>
  );
}

/* ── Elapsed sub-component ──────────────────────── */
function ElapsedView({
  title,
  targetDate,
  textColor,
  fontSize,
  showSeconds,
}: {
  title: string;
  targetDate: string;
  textColor: string;
  fontSize: FontSizeKey;
  showSeconds: boolean;
}) {
  const [result, setResult] = useState<ElapsedResult | null>(null);

  useEffect(() => {
    if (!targetDate) {
      startTransition(() => setResult(null));
      return;
    }
    startTransition(() => setResult(calculateElapsed(targetDate)));
    const interval = setInterval(
      () => setResult(calculateElapsed(targetDate)),
      1000,
    );
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {title && (
        <p
          className={`${ELAPSED_TITLE_SIZE_MAP[fontSize]} font-medium opacity-80`}
          style={{ color: `#${textColor}` }}
        >
          {title}
        </p>
      )}
      {result ? (
        <div className="flex gap-3">
          <div className="text-center">
            <p
              className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${textColor}` }}
            >
              {result.days}
            </p>
            <p
              className={`${ELAPSED_LABEL_SIZE_MAP[fontSize]} opacity-60`}
              style={{ color: `#${textColor}` }}
            >
              일
            </p>
          </div>
          <span
            className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-light opacity-30`}
            style={{ color: `#${textColor}` }}
          >
            :
          </span>
          <div className="text-center">
            <p
              className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${textColor}` }}
            >
              {pad2(result.hours)}
            </p>
            <p
              className={`${ELAPSED_LABEL_SIZE_MAP[fontSize]} opacity-60`}
              style={{ color: `#${textColor}` }}
            >
              시간
            </p>
          </div>
          <span
            className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-light opacity-30`}
            style={{ color: `#${textColor}` }}
          >
            :
          </span>
          <div className="text-center">
            <p
              className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${textColor}` }}
            >
              {pad2(result.minutes)}
            </p>
            <p
              className={`${ELAPSED_LABEL_SIZE_MAP[fontSize]} opacity-60`}
              style={{ color: `#${textColor}` }}
            >
              분
            </p>
          </div>
          {showSeconds && (
            <>
              <span
                className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-light opacity-30`}
                style={{ color: `#${textColor}` }}
              >
                :
              </span>
              <div className="text-center">
                <p
                  className={`${ELAPSED_NUM_SIZE_MAP[fontSize]} font-bold tabular-nums`}
                  style={{ color: `#${textColor}` }}
                >
                  {pad2(result.seconds)}
                </p>
                <p
                  className={`${ELAPSED_LABEL_SIZE_MAP[fontSize]} opacity-60`}
                  style={{ color: `#${textColor}` }}
                >
                  초
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <p
          className={`${ELAPSED_TITLE_SIZE_MAP[fontSize]} opacity-50`}
          style={{ color: `#${textColor}` }}
        >
          {targetDate ? "시작일이 미래입니다" : "날짜를 선택하세요"}
        </p>
      )}
    </>
  );
}

/* ── Main component ──────────────────────── */

export default function DdayWidgetPreview({
  title,
  targetDate,
  bgColor,
  textColor,
  calcType = "down",
  isAnnual = false,
  layout = "default",
  startDate = "",
  isTransparent = false,
  font = "noto-sans-kr",
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  showTime = false,
  blink = true,
  doneMsg = "",
  barColor = "",
  dateFmt = "full",
  displayMode = "default",
  showWeeks = false,
  showMonths = false,
  accentColor = "",
  showSeconds = true,
  hideOnDone = false,
}: DdayWidgetPreviewProps) {
  const fontClassName = fontMap[font]?.className ?? fontMap["noto-sans-kr"].className;

  /* ── Anniversary mode ── */
  if (displayMode === "anniversary") {
    return (
      <div
        className={`flex flex-col items-center justify-center w-full h-full min-h-[200px] gap-2 transition-colors ${fontClassName}`}
        style={{
          backgroundColor: isTransparent ? "transparent" : `#${bgColor}`,
          color: `#${textColor}`,
          boxShadow: isTransparent ? "none" : undefined,
          borderRadius,
          padding,
        }}
      >
        <AnniversaryView
          title={title}
          targetDate={targetDate}
          textColor={textColor}
          accentColor={accentColor}
          fontSize={fontSize}
          showWeeks={showWeeks}
          showMonths={showMonths}
        />
      </div>
    );
  }

  /* ── Elapsed mode ── */
  if (displayMode === "elapsed") {
    return (
      <div
        className={`flex flex-col items-center justify-center w-full h-full min-h-[200px] gap-3 transition-colors ${fontClassName}`}
        style={{
          backgroundColor: isTransparent ? "transparent" : `#${bgColor}`,
          color: `#${textColor}`,
          boxShadow: isTransparent ? "none" : undefined,
          borderRadius,
          padding,
        }}
      >
        <ElapsedView
          title={title}
          targetDate={targetDate}
          textColor={textColor}
          fontSize={fontSize}
          showSeconds={showSeconds}
        />
      </div>
    );
  }

  /* ── Default D-Day mode ── */
  const { dday, ddayLabel, effectiveDate } = calculateDday(
    targetDate,
    calcType,
    isAnnual,
  );

  // hideOnDone: D-Day가 지났으면 빈 div 반환
  if (hideOnDone && dday !== null && dday <= 0 && calcType === "down") {
    return <div className="w-full h-full" />;
  }

  return (
    <DefaultDdayView
      title={title}
      targetDate={targetDate}
      bgColor={bgColor}
      textColor={textColor}
      calcType={calcType}
      isAnnual={isAnnual}
      layout={layout}
      startDate={startDate}
      isTransparent={isTransparent}
      fontClassName={fontClassName}
      borderRadius={borderRadius}
      padding={padding}
      fontSize={fontSize}
      showTime={showTime}
      blink={blink}
      doneMsg={doneMsg}
      barColor={barColor}
      dateFmt={dateFmt}
      dday={dday}
      ddayLabel={ddayLabel}
      effectiveDate={effectiveDate}
    />
  );
}

/* ── Default D-Day sub-component (extracted for hooks) ── */
function DefaultDdayView({
  title,
  targetDate,
  bgColor,
  textColor,
  calcType,
  isAnnual,
  layout,
  startDate,
  isTransparent,
  fontClassName,
  borderRadius,
  padding,
  fontSize,
  showTime,
  blink,
  doneMsg,
  barColor,
  dateFmt,
  dday,
  ddayLabel,
  effectiveDate,
}: {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  calcType: "down" | "up";
  isAnnual: boolean;
  layout: "default" | "progress";
  startDate: string;
  isTransparent: boolean;
  fontClassName: string;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  showTime: boolean;
  blink: boolean;
  doneMsg: string;
  barColor: string;
  dateFmt: DdayDateFormat;
  dday: number | null;
  ddayLabel: string;
  effectiveDate: string;
}) {
  const [timeResult, setTimeResult] = useState(() =>
    showTime ? calculateDdayWithTime(targetDate, isAnnual) : null,
  );

  useEffect(() => {
    if (!showTime) {
      startTransition(() => setTimeResult(null));
      return;
    }
    startTransition(() => setTimeResult(calculateDdayWithTime(targetDate, isAnnual)));
    const interval = setInterval(() => {
      setTimeResult(calculateDdayWithTime(targetDate, isAnnual));
    }, 1000);
    return () => clearInterval(interval);
  }, [showTime, targetDate, isAnnual]);

  const parsed = effectiveDate ? toLocalDate(effectiveDate) : null;
  const formattedDate =
    parsed && isValid(parsed) ? formatDdayDate(parsed, dateFmt) : "";

  const showProgress = layout === "progress";
  const percentage = showProgress
    ? calculateProgress(startDate, effectiveDate)
    : 0;

  const isDone = dday !== null && dday <= 0 && calcType === "down";
  const displayLabel = isDone && doneMsg ? doneMsg : ddayLabel;

  const colonClass = blink ? "animate-pulse" : "";

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${showProgress ? "min-h-[240px]" : "min-h-[200px]"} transition-colors ${fontClassName}`}
      style={{
        backgroundColor: isTransparent ? "transparent" : `#${bgColor}`,
        color: `#${textColor}`,
        boxShadow: isTransparent ? "none" : undefined,
        borderRadius,
        padding,
      }}
    >
      <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
      <p
        className={`${FONT_SIZE_MAP[fontSize]} font-extrabold tracking-tight`}
        aria-label={`${title} ${displayLabel}`}
      >
        {displayLabel}
      </p>
      {showTime && timeResult && (
        <p
          className="text-lg font-light tabular-nums mt-1 opacity-80"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
        >
          {timeResult.hours}
          <span className={colonClass}>:</span>
          {timeResult.minutes}
          <span className={colonClass}>:</span>
          {timeResult.seconds}
        </p>
      )}
      {formattedDate && (
        <p className="text-xs opacity-50 mt-3">{formattedDate}</p>
      )}
      {showProgress && (
        <DdayProgressBar
          percentage={percentage}
          textColor={textColor}
          barColor={barColor}
        />
      )}
    </div>
  );
}
