"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import ReadingPreview from "@/components/widget/ReadingPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { ReadingStyle } from "@/lib/reading";

const VALID_STYLES: ReadingStyle[] = ["bar", "ring"];

function ReadingWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const currentPage = Math.max(0, Number(searchParams.get("current")) || 0);
  const totalPages = Math.max(1, Number(searchParams.get("total")) || 300);

  const rawStyle = searchParams.get("style");
  const style: ReadingStyle = VALID_STYLES.includes(rawStyle as ReadingStyle)
    ? (rawStyle as ReadingStyle)
    : "bar";

  const showPages = searchParams.get("pages") !== "false";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <ReadingPreview
        title={title}
        currentPage={currentPage}
        totalPages={totalPages}
        style={style}
        showPages={showPages}
        color={color}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetReadingPage() {
  return (
    <WidgetPage>
      <ReadingWidgetContent />
    </WidgetPage>
  );
}
