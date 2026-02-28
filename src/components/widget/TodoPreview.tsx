"use client";

import { useState, useEffect, useCallback } from "react";
import { saveTodos, loadTodos, generateId, type TodoItem } from "@/lib/todo";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "0.75rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
};

interface TodoPreviewProps {
  title: string;
  initialItems: TodoItem[];
  interactive: boolean;
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  showProgress: boolean;
  strikethrough: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  widgetId?: string;
}

export default function TodoPreview({
  title,
  initialItems,
  interactive,
  color,
  textColor,
  bg,
  transparentBg,
  showProgress,
  strikethrough,
  borderRadius,
  padding,
  fontSize,
  widgetId,
}: TodoPreviewProps) {
  const [items, setItems] = useState<TodoItem[]>(initialItems);
  const [newText, setNewText] = useState("");

  // 에디터 프리뷰: initialItems가 바뀌면 동기화
  useEffect(() => {
    if (!interactive) {
      setItems(initialItems);
    }
  }, [interactive, initialItems]);

  // 위젯 렌더링 시 localStorage에서 상태 복원
  useEffect(() => {
    if (interactive && widgetId) {
      const saved = loadTodos(widgetId);
      if (saved.length > 0) setItems(saved);
    }
  }, [interactive, widgetId]);

  const persist = useCallback(
    (next: TodoItem[]) => {
      setItems(next);
      if (interactive && widgetId) saveTodos(widgetId, next);
    },
    [interactive, widgetId],
  );

  const toggleItem = (id: string) => {
    persist(items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const addItem = () => {
    const text = newText.trim();
    if (!text) return;
    persist([...items, { id: generateId(), text, done: false }]);
    setNewText("");
  };

  const removeItem = (id: string) => {
    persist(items.filter((item) => item.id !== id));
  };

  const doneCount = items.filter((i) => i.done).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const fSize = FONT_SIZE_MAP[fontSize];
  const effectiveText = textColor || (transparentBg ? "" : "1E1E1E");

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        color: effectiveText ? `#${effectiveText}` : undefined,
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
        {/* Header */}
        {(title || showProgress) && (
          <div className="mb-3">
            {title && (
              <p className="font-semibold" style={{ fontSize: `calc(${fSize} * 1.1)` }}>
                {title}
              </p>
            )}
            {showProgress && totalCount > 0 && (
              <div className="flex items-center gap-2 mt-1.5">
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: `#${color}20` }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, backgroundColor: `#${color}` }}
                  />
                </div>
                <span className="text-xs opacity-60 shrink-0">
                  {doneCount}/{totalCount}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Todo list */}
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-2 group">
              <button
                type="button"
                onClick={() => interactive && toggleItem(item.id)}
                className="shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor: `#${color}`,
                  backgroundColor: item.done ? `#${color}` : "transparent",
                  cursor: interactive ? "pointer" : "default",
                }}
                aria-label={item.done ? "완료 취소" : "완료 체크"}
              >
                {item.done && (
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>
              <span
                className="flex-1 transition-all"
                style={{
                  textDecoration: item.done && strikethrough ? "line-through" : "none",
                  opacity: item.done ? 0.5 : 1,
                }}
              >
                {item.text}
              </span>
              {interactive && (
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="opacity-0 group-hover:opacity-60 hover:!opacity-100 text-xs transition-opacity"
                  aria-label="삭제"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Add item input (interactive only) */}
        {interactive && (
          <div className="flex gap-1.5 mt-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="새 할 일 추가"
              className="flex-1 bg-transparent border-b border-current/20 text-sm py-1 placeholder:opacity-40 focus:outline-none focus:border-current/40"
              style={{ fontSize: `calc(${fSize} * 0.9)` }}
            />
            <button
              type="button"
              onClick={addItem}
              className="text-xs px-2 py-1 rounded transition-colors"
              style={{ backgroundColor: `#${color}`, color: "white" }}
            >
              추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
