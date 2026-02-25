"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QuotePreview from "@/components/widget/QuotePreview";
import type { QuoteFont, TextAlign, LineHeight } from "@/lib/quote";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";

const VALID_FONTS: QuoteFont[] = ["sans", "serif", "script"];
const VALID_ALIGNS: TextAlign[] = ["left", "center", "right"];
const VALID_LINE_HEIGHTS: LineHeight[] = ["tight", "normal", "relaxed"];

function QuoteWidgetContent() {
  const searchParams = useSearchParams();

  const text = searchParams.get("text") || "";
  const author = searchParams.get("author") || "";

  const rawFont = searchParams.get("font");
  const font: QuoteFont = VALID_FONTS.includes(rawFont as QuoteFont)
    ? (rawFont as QuoteFont)
    : "serif";

  const textColor = searchParams.get("textColor") || "1E1E1E";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const rawAlign = searchParams.get("align");
  const align: TextAlign = VALID_ALIGNS.includes(rawAlign as TextAlign)
    ? (rawAlign as TextAlign)
    : "center";

  const showMarks = searchParams.get("marks") !== "false";
  const italic = searchParams.get("italic") === "true";

  const rawLh = searchParams.get("lh");
  const lineHeight: LineHeight = VALID_LINE_HEIGHTS.includes(rawLh as LineHeight)
    ? (rawLh as LineHeight)
    : "relaxed";

  return (
    <div className="w-screen h-screen bg-transparent">
      <QuotePreview
        text={text}
        author={author}
        font={font}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        align={align}
        showMarks={showMarks}
        italic={italic}
        lineHeight={lineHeight}
      />
    </div>
  );
}

export default function WidgetQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <QuoteWidgetContent />
    </Suspense>
  );
}
