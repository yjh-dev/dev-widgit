"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { loadMemos, saveMemos } from "@/lib/memo-board";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "0.7rem",
  md: "0.8rem",
  lg: "0.95rem",
  xl: "1.1rem",
};

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 0.5, -0.5, 1, -2, 1.5];

interface MemoBoardPreviewProps {
  initialMemos: string[];
  interactive: boolean;
  cols: number;
  noteColor: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  font?: string;
  widgetId?: string;
}

export default function MemoBoardPreview({
  initialMemos,
  interactive,
  cols,
  noteColor,
  textColor,
  bg,
  transparentBg,
  borderRadius,
  padding,
  fontSize,
  font = "sans",
  widgetId,
}: MemoBoardPreviewProps) {
  const [memos, setMemos] = useState<string[]>(initialMemos ?? ["메모 1", "메모 2", "메모 3"]);
  const [newMemo, setNewMemo] = useState("");

  // 에디터 프리뷰: initialMemos가 바뀌면 동기화
  useEffect(() => {
    if (!interactive) {
      startTransition(() => setMemos(initialMemos ?? []));
    }
  }, [interactive, initialMemos]);

  // 위젯 렌더링 시 localStorage에서 상태 복원
  useEffect(() => {
    if (interactive && widgetId) {
      const saved = loadMemos(widgetId);
      if (saved.length > 0) startTransition(() => setMemos(saved));
    }
  }, [interactive, widgetId]);

  const persist = useCallback(
    (next: string[]) => {
      setMemos(next);
      if (interactive && widgetId) saveMemos(widgetId, next);
    },
    [interactive, widgetId],
  );

  const addMemo = () => {
    const text = newMemo.trim();
    if (!text) return;
    persist([...memos, text]);
    setNewMemo("");
  };

  const removeMemo = (index: number) => {
    persist(memos.filter((_, i) => i !== index));
  };

  const fSize = FONT_SIZE_MAP[fontSize];
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
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
        {/* Memo Grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {memos.map((memo, i) => (
            <div
              key={i}
              className="relative group p-3 rounded shadow-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: `#${noteColor}`,
                color: `#${textColor}`,
                transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                minHeight: "60px",
                fontSize: fSize,
              }}
            >
              <p className="whitespace-pre-wrap break-words leading-snug">
                {memo}
              </p>
              {interactive && (
                <button
                  type="button"
                  onClick={() => removeMemo(i)}
                  className="absolute top-1 right-1.5 opacity-0 group-hover:opacity-70 hover:!opacity-100 text-xs transition-opacity"
                  aria-label="삭제"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add memo input (interactive only) */}
        {interactive && (
          <div className="flex gap-1.5 mt-3">
            <input
              type="text"
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addMemo()}
              placeholder="새 메모 추가"
              className="flex-1 bg-transparent border-b border-current/20 text-sm py-1 placeholder:opacity-40 focus:outline-none focus:border-current/40"
              style={{
                fontSize: `calc(${fSize} * 0.9)`,
                color: `#${textColor}`,
              }}
            />
            <button
              type="button"
              onClick={addMemo}
              className="text-xs px-2 py-1 rounded transition-colors text-white"
              style={{ backgroundColor: `#${noteColor}`, color: `#${textColor}` }}
            >
              추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
