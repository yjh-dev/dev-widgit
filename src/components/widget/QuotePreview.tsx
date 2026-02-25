"use client";

import { Quote } from "lucide-react";
import { QUOTE_FONT_FAMILY_MAP, type QuoteFont } from "@/lib/quote";

interface QuotePreviewProps {
  text?: string;
  author?: string;
  font?: QuoteFont;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
}

export default function QuotePreview({
  text = "",
  author = "",
  font = "serif",
  textColor = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
}: QuotePreviewProps) {
  const displayText = text || "여기에 문구를 입력하세요";

  return (
    <div
      className="w-full h-full flex items-center justify-center p-8"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        fontFamily: QUOTE_FONT_FAMILY_MAP[font],
      }}
    >
      <div className="max-w-md text-center space-y-4">
        <Quote
          className="mx-auto opacity-20"
          style={{ color: `#${textColor}` }}
          size={32}
        />
        <p
          className="text-xl leading-relaxed font-medium whitespace-pre-line"
          style={{ color: `#${textColor}` }}
        >
          {displayText}
        </p>
        {author && (
          <p
            className="text-sm opacity-50"
            style={{ color: `#${textColor}` }}
          >
            &mdash; {author}
          </p>
        )}
      </div>
    </div>
  );
}
