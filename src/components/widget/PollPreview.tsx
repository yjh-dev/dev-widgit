"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";
import {
  loadPollVotes,
  savePollVotes,
  hasVoted,
  markVoted,
  calculatePercentages,
  type PollOption,
} from "@/lib/poll";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "0.75rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
};

interface PollPreviewProps {
  question: string;
  initialOptions: PollOption[];
  interactive: boolean;
  showPercent: boolean;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  font?: string;
  widgetId?: string;
}

export default function PollPreview({
  question,
  initialOptions,
  interactive,
  showPercent,
  color,
  textColor,
  bg,
  transparentBg,
  borderRadius,
  padding,
  fontSize,
  font = "sans",
  widgetId,
}: PollPreviewProps) {
  const [options, setOptions] = useState<PollOption[]>(initialOptions ?? [{ text: "옵션 1", votes: 3 }, { text: "옵션 2", votes: 1 }]);
  const [voted, setVoted] = useState(false);

  // 에디터 프리뷰: initialOptions가 바뀌면 동기화
  useEffect(() => {
    if (!interactive) {
      startTransition(() => setOptions(initialOptions ?? []));
    }
  }, [interactive, initialOptions]);

  // 위젯 렌더링 시 localStorage에서 상태 복원
  useEffect(() => {
    if (interactive && widgetId) {
      const savedVotes = loadPollVotes(widgetId);
      if (savedVotes.length > 0) {
        startTransition(() => {
          setOptions((prev) =>
            prev.map((opt, i) => ({ ...opt, votes: savedVotes[i] ?? 0 })),
          );
        });
      }
      startTransition(() => setVoted(hasVoted(widgetId)));
    }
  }, [interactive, widgetId]);

  const persist = useCallback(
    (next: PollOption[]) => {
      setOptions(next);
      if (interactive && widgetId) {
        savePollVotes(widgetId, next.map((o) => o.votes));
      }
    },
    [interactive, widgetId],
  );

  const handleVote = (index: number) => {
    if (!interactive || voted) return;
    const next = options.map((opt, i) =>
      i === index ? { ...opt, votes: opt.votes + 1 } : opt,
    );
    persist(next);
    setVoted(true);
    if (widgetId) markVoted(widgetId);
  };

  const results = calculatePercentages(options);
  const totalVotes = options.reduce((s, o) => s + o.votes, 0);

  const fSize = FONT_SIZE_MAP[fontSize];
  const effectiveText = textColor || (transparentBg ? "" : "1E1E1E");
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        color: effectiveText ? `#${effectiveText}` : undefined,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <div
        className="w-full"
        style={{
          borderRadius,
          padding,
          fontSize: fSize,
        }}
      >
        {/* Question */}
        {question && (
          <p
            className="font-bold mb-3"
            style={{ fontSize: `calc(${fSize} * 1.2)` }}
          >
            {question}
          </p>
        )}

        {/* Options */}
        <div className="space-y-2">
          {results.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleVote(i)}
              className="w-full text-left relative overflow-hidden rounded transition-all"
              style={{
                cursor: interactive && !voted ? "pointer" : "default",
                border: `1px solid #${color}30`,
                padding: "0.5em 0.75em",
              }}
              disabled={!interactive || voted}
            >
              {/* Bar background */}
              {(voted || !interactive) && (
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    width: `${opt.pct}%`,
                    backgroundColor: `#${color}20`,
                  }}
                />
              )}
              <div className="relative flex items-center justify-between gap-2">
                <span className="flex-1">{opt.text}</span>
                {(voted || !interactive) && (
                  <span className="shrink-0 text-xs opacity-60">
                    {showPercent ? `${Math.round(opt.pct)}%` : `${opt.votes}표`}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Total */}
        {(voted || !interactive) && totalVotes > 0 && (
          <p className="text-xs opacity-50 mt-2 text-right">
            총 {totalVotes}표
          </p>
        )}
      </div>
    </div>
  );
}
