"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import { Send } from "lucide-react";
import { createMessage, type GuestMessage } from "@/lib/guestbook";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const FONT_SIZE_MAP: Record<FontSizeKey, { title: string; text: string; input: string }> = {
  sm: { title: "text-sm", text: "text-xs", input: "text-xs" },
  md: { title: "text-base", text: "text-sm", input: "text-sm" },
  lg: { title: "text-lg", text: "text-base", input: "text-base" },
  xl: { title: "text-xl", text: "text-lg", input: "text-lg" },
};

interface GuestbookPreviewProps {
  title?: string;
  maxItems?: number;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

function getStorageKey(title: string) {
  return `widgit-guestbook-${title}`;
}

export default function GuestbookPreview({
  title = "방명록",
  maxItems = 10,
  color = "6366F1",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: GuestbookPreviewProps) {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(getStorageKey(title));
      if (saved) startTransition(() => setMessages(JSON.parse(saved)));
    } catch {
      /* ignore */
    }
  }, [title]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(getStorageKey(title), JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages, title]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const msg = createMessage(name.trim(), text.trim());
    setMessages((prev) => [msg, ...prev].slice(0, maxItems));
    setName("");
    setText("");
  };

  const resolvedTextColor = textColor || (color === "FFFFFF" ? "1E1E1E" : color);
  const sizeConfig = FONT_SIZE_MAP[fontSize];
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
      {/* Title */}
      {title && (
        <p
          className={`${sizeConfig.title} font-bold w-full text-center`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      {/* Input form */}
      <div className="w-full space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 (선택)"
          className={`w-full px-3 py-1.5 rounded-md outline-none ${sizeConfig.input}`}
          style={{
            backgroundColor: `#${color}10`,
            border: `1px solid #${color}30`,
            color: `#${resolvedTextColor}`,
          }}
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="메시지를 입력하세요"
            className={`flex-1 px-3 py-1.5 rounded-md outline-none ${sizeConfig.input}`}
            style={{
              backgroundColor: `#${color}10`,
              border: `1px solid #${color}30`,
              color: `#${resolvedTextColor}`,
            }}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim()}
            aria-label="메시지 보내기"
            className="px-3 py-1.5 rounded-md transition-all hover:opacity-80 active:scale-95 disabled:opacity-50"
            style={{ backgroundColor: `#${color}`, color: `#${bg}` }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message list */}
      <div
        ref={listRef}
        className="w-full flex-1 overflow-y-auto space-y-2 min-h-0"
        style={{ maxHeight: 200 }}
      >
        {messages.length === 0 ? (
          <p className={`${sizeConfig.text} text-center opacity-40`} style={{ color: `#${resolvedTextColor}` }}>
            아직 메시지가 없습니다
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="px-3 py-2 rounded-lg"
              style={{ backgroundColor: `#${color}08` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`${sizeConfig.text} font-medium`}
                  style={{ color: `#${color}` }}
                >
                  {msg.name}
                </span>
                <span
                  className="text-[10px] opacity-40"
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  {msg.date}
                </span>
              </div>
              <p
                className={`${sizeConfig.text} mt-0.5`}
                style={{ color: `#${resolvedTextColor}` }}
              >
                {msg.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
