"use client";

import { resolveFontStyle } from "@/lib/fonts";
import type { StickyPinType, StickyLineHeight } from "@/lib/sticky-note";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const LINE_HEIGHT_MAP: Record<StickyLineHeight, string> = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

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
}: StickyNotePreviewProps) {
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
