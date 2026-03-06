"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import type { StickyPinType, StickyLineHeight, StickyNoteMode } from "@/lib/sticky-note";
import { loadMemos, saveMemos } from "@/lib/sticky-note";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const BOARD_FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "0.7rem",
  md: "0.8rem",
  lg: "0.95rem",
  xl: "1.1rem",
};

const LINE_HEIGHT_MAP: Record<StickyLineHeight, string> = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 0.5, -0.5, 1, -2, 1.5];

interface StickyNotePreviewProps {
  text?: string;
  noteColor?: string;
  textColor?: string;
  pin?: StickyPinType;
  rotation?: number;
  font?: string;
  lh?: StickyLineHeight;
  shadow?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  /* board mode props */
  mode?: StickyNoteMode;
  initialMemos?: string[];
  cols?: number;
  interactive?: boolean;
  widgetId?: string;
}

export default function StickyNotePreview({
  text = "메모를 입력하세요",
  noteColor = "FBBF24",
  textColor = "1E1E1E",
  pin = "pin",
  rotation = 2,
  font = "gaegu",
  lh = "normal",
  shadow = true,
  borderRadius = 4,
  padding = 24,
  fontSize = "md",
  mode = "single",
  initialMemos,
  cols = 3,
  interactive = false,
  widgetId,
}: StickyNotePreviewProps) {
  if (mode === "board") {
    return (
      <BoardMode
        initialMemos={initialMemos ?? ["메모 1", "메모 2", "메모 3"]}
        interactive={interactive}
        cols={cols}
        noteColor={noteColor}
        textColor={textColor}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        font={font}
        widgetId={widgetId}
      />
    );
  }

  const fontStyle = resolveFontStyle(font);
  const lines = text.split("\n");

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative inline-block max-w-full">
        {/* Pin decoration */}
        {pin === "pin" && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-red-700 shadow-md" />
          </div>
        )}
        {/* Tape decoration */}
        {pin === "tape" && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
            <div
              className="w-16 h-5 rounded-sm opacity-60"
              style={{ backgroundColor: "#D4C5A9" }}
            />
          </div>
        )}
        {/* Note body */}
        <div
          className={`${fontStyle.className ?? ""} ${FONT_SIZE_MAP[fontSize]} ${LINE_HEIGHT_MAP[lh]} whitespace-pre-wrap`}
          style={{
            backgroundColor: `#${noteColor}`,
            color: `#${textColor}`,
            fontFamily: fontStyle.fontFamily,
            borderRadius,
            padding,
            transform: `rotate(${rotation}deg)`,
            boxShadow: shadow
              ? "4px 4px 12px rgba(0,0,0,0.15), 1px 1px 3px rgba(0,0,0,0.1)"
              : "none",
            minWidth: 120,
          }}
        >
          {lines.map((line, i) => (
            <p key={i}>{line || "\u00A0"}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Board Mode (absorbed from MemoBoardPreview) ─── */

interface BoardModeProps {
  initialMemos: string[];
  interactive: boolean;
  cols: number;
  noteColor: string;
  textColor: string;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  font: string;
  widgetId?: string;
}

function BoardMode({
  initialMemos,
  interactive,
  cols,
  noteColor,
  textColor,
  borderRadius,
  padding,
  fontSize,
  font,
  widgetId,
}: BoardModeProps) {
  const [memos, setMemos] = useState<string[]>(initialMemos);
  const [newMemo, setNewMemo] = useState("");

  // Editor preview: sync when initialMemos changes
  useEffect(() => {
    if (!interactive) {
      startTransition(() => setMemos(initialMemos ?? []));
    }
  }, [interactive, initialMemos]);

  // Widget rendering: restore state from localStorage
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

  const fSize = BOARD_FONT_SIZE_MAP[fontSize];
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center overflow-hidden ${fontStyle.className ?? ""}`}
      style={{ fontFamily: fontStyle.fontFamily }}
    >
      <div
        className="w-full"
        style={{ borderRadius, padding, fontSize: fSize }}
      >
        {/* Memo Grid */}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
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
