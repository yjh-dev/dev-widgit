"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import ReadingPreview from "@/components/widget/ReadingPreview";
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
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetReadingPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <ReadingWidgetContent />
    </Suspense>
  );
}
