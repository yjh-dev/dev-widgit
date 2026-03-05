"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";
import {
  loadKanban,
  saveKanban,
  DEFAULT_COLUMNS,
  type KanbanColumn,
} from "@/lib/kanban";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "0.7rem",
  md: "0.8rem",
  lg: "0.95rem",
  xl: "1.1rem",
};

interface KanbanPreviewProps {
  title: string;
  initialColumns: KanbanColumn[];
  interactive: boolean;
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

export default function KanbanPreview({
  title,
  initialColumns,
  interactive,
  color,
  textColor,
  bg,
  transparentBg,
  borderRadius,
  padding,
  fontSize,
  font = "sans",
  widgetId,
}: KanbanPreviewProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns ?? DEFAULT_COLUMNS);
  const [newItemText, setNewItemText] = useState("");

  // 에디터 프리뷰: initialColumns가 바뀌면 동기화
  useEffect(() => {
    if (!interactive) {
      startTransition(() => setColumns(initialColumns ?? DEFAULT_COLUMNS));
    }
  }, [interactive, initialColumns]);

  // 위젯 렌더링 시 localStorage에서 상태 복원
  useEffect(() => {
    if (interactive && widgetId) {
      const saved = loadKanban(widgetId);
      if (saved) startTransition(() => setColumns(saved));
    }
  }, [interactive, widgetId]);

  const persist = useCallback(
    (next: KanbanColumn[]) => {
      setColumns(next);
      if (interactive && widgetId) saveKanban(widgetId, next);
    },
    [interactive, widgetId],
  );

  const addItem = () => {
    const text = newItemText.trim();
    if (!text) return;
    const next = columns.map((col, i) =>
      i === 0 ? { ...col, items: [text, ...col.items] } : col,
    );
    persist(next);
    setNewItemText("");
  };

  const moveItem = (colIndex: number, itemIndex: number) => {
    if (!interactive) return;
    const next = columns.map((col) => ({ ...col, items: [...col.items] }));
    const [item] = next[colIndex].items.splice(itemIndex, 1);
    if (colIndex < next.length - 1) {
      next[colIndex + 1].items.push(item);
    }
    // If in last column, item is removed (completed)
    persist(next);
  };

  const fSize = FONT_SIZE_MAP[fontSize];
  const effectiveText = textColor || (transparentBg ? "" : "1E1E1E");
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex flex-col items-stretch justify-center ${fontStyle.className ?? ""}`}
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
        {/* Title */}
        {title && (
          <p
            className="font-semibold mb-3"
            style={{ fontSize: `calc(${fSize} * 1.15)` }}
          >
            {title}
          </p>
        )}

        {/* Add item (interactive only) */}
        {interactive && (
          <div className="flex gap-1.5 mb-3">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="새 작업 추가"
              className="flex-1 bg-transparent border-b border-current/20 text-sm py-1 placeholder:opacity-40 focus:outline-none focus:border-current/40"
              style={{ fontSize: `calc(${fSize} * 0.9)` }}
            />
            <button
              type="button"
              onClick={addItem}
              className="text-xs px-2 py-1 rounded text-white transition-colors"
              style={{ backgroundColor: `#${color}` }}
            >
              추가
            </button>
          </div>
        )}

        {/* Columns */}
        <div className="grid grid-cols-3 gap-2">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="min-h-[60px]">
              {/* Column header */}
              <div
                className="text-xs font-bold px-2 py-1 rounded-t text-center text-white"
                style={{ backgroundColor: `#${color}` }}
              >
                {col.title}
                <span className="ml-1 opacity-70">({col.items.length})</span>
              </div>

              {/* Column body */}
              <div
                className="rounded-b p-1 space-y-1 min-h-[40px]"
                style={{ backgroundColor: `#${color}10` }}
              >
                {col.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="group flex items-center gap-1 rounded px-2 py-1 text-xs"
                    style={{
                      backgroundColor: transparentBg ? `#${bg || "FFFFFF"}90` : `#${bg}`,
                      border: `1px solid #${color}15`,
                    }}
                  >
                    <span className="flex-1 truncate">{item}</span>
                    {interactive && (
                      <button
                        type="button"
                        onClick={() => moveItem(colIdx, itemIdx)}
                        className="opacity-0 group-hover:opacity-70 hover:!opacity-100 text-xs transition-opacity shrink-0"
                        aria-label={colIdx < columns.length - 1 ? "다음 단계로 이동" : "완료 처리"}
                        style={{ color: `#${color}` }}
                      >
                        {colIdx < columns.length - 1 ? "→" : "✓"}
                      </button>
                    )}
                  </div>
                ))}
                {col.items.length === 0 && (
                  <p className="text-[10px] opacity-30 text-center py-2">비어있음</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
