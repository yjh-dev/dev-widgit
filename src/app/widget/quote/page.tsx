"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import QuotePreview from "@/components/widget/QuotePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import type { TextAlign, LineHeight } from "@/lib/quote";
import { ALL_FONT_KEYS } from "@/lib/fonts";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_ALIGNS: TextAlign[] = ["left", "center", "right"];
const VALID_LINE_HEIGHTS: LineHeight[] = ["tight", "normal", "relaxed"];

function QuoteWidgetContent() {
  const searchParams = useWidgetParams();

  const text = searchParams.get("text") || "";
  const author = searchParams.get("author") || "";

  const rawFont = searchParams.get("font") || "serif";
  const font = ALL_FONT_KEYS.includes(rawFont) ? rawFont : "serif";

  const textColor = parseHexColor(searchParams.get("textColor"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

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

  const authorColor = parseHexColor(searchParams.get("authorColor"), "");
  const divider = searchParams.get("divider") === "true";

  return (
    <WidgetScreen>
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
        authorColor={authorColor}
        divider={divider}
      />
    </WidgetScreen>
  );
}

export default function WidgetQuotePage() {
  return (
    <WidgetPage>
      <QuoteWidgetContent />
    </WidgetPage>
  );
}
