"use client";

import { Quote } from "lucide-react";
import {
  LINE_HEIGHT_MAP,
  type TextAlign,
  type LineHeight,
} from "@/lib/quote";
import { resolveFontStyle } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

interface QuotePreviewProps {
  text?: string;
  author?: string;
  font?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  align?: TextAlign;
  showMarks?: boolean;
  italic?: boolean;
  lineHeight?: LineHeight;
  authorColor?: string;
  divider?: boolean;
}

export default function QuotePreview({
  text = "",
  author = "",
  font = "serif",
  textColor = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  align = "center",
  showMarks = true,
  italic = false,
  lineHeight = "relaxed",
  authorColor = "",
  divider = false,
}: QuotePreviewProps) {
  const displayText = text || "여기에 문구를 입력하세요";

  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  const quoteAlignClass = align === "left" ? "" : align === "right" ? "ml-auto" : "mx-auto";

  const fontStyle = resolveFontStyle(font);
  const resolvedAuthorColor = authorColor || textColor;

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        fontFamily: fontStyle.fontFamily,
        borderRadius,
        padding,
      }}
    >
      <div className={`max-w-md ${alignClass} space-y-4`}>
        {showMarks && (
          <Quote
            className={`${quoteAlignClass} opacity-20`}
            style={{ color: `#${textColor}` }}
            size={32}
          />
        )}
        <blockquote
          className={`${FONT_SIZE_MAP[fontSize]} font-medium whitespace-pre-line ${italic ? "italic" : ""}`}
          style={{
            color: `#${textColor}`,
            lineHeight: LINE_HEIGHT_MAP[lineHeight],
          }}
        >
          {displayText}
        </blockquote>
        {divider && author && (
          <hr
            className="opacity-20"
            style={{ borderColor: `#${textColor}` }}
          />
        )}
        {author && (
          <footer
            className="text-sm opacity-50"
            style={{ color: `#${resolvedAuthorColor}` }}
          >
            &mdash; <cite>{author}</cite>
          </footer>
        )}
      </div>
    </div>
  );
}
