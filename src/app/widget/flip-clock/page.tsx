"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import FlipClockPreview from "@/components/widget/FlipClockPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { FlipClockFormat, FlipClockDateFormat } from "@/lib/flip-clock";

const VALID_FORMATS: FlipClockFormat[] = ["12h", "24h"];
const VALID_DATE_FMTS: FlipClockDateFormat[] = ["kr", "en", "short"];

function FlipClockWidgetContent() {
  const searchParams = useWidgetParams();

  const timezone = searchParams.get("timezone") || "Asia/Seoul";

  const rawFormat = searchParams.get("format");
  const format: FlipClockFormat = VALID_FORMATS.includes(rawFormat as FlipClockFormat)
    ? (rawFormat as FlipClockFormat)
    : "24h";

  const showSeconds = searchParams.get("showSeconds") === "true";
  const flipColor = parseHexColor(searchParams.get("flipColor"), "1E1E1E");
  const textColor = parseHexColor(searchParams.get("textColor"), "FFFFFF");
  const gapColor = parseHexColor(searchParams.get("gapColor"), "333333");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const showDate = searchParams.get("showDate") === "true";

  const rawDateFmt = searchParams.get("dateFmt");
  const dateFmt: FlipClockDateFormat = VALID_DATE_FMTS.includes(rawDateFmt as FlipClockDateFormat)
    ? (rawDateFmt as FlipClockDateFormat)
    : "kr";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <FlipClockPreview
        timezone={timezone}
        format={format}
        showSeconds={showSeconds}
        flipColor={flipColor}
        textColor={textColor}
        gapColor={gapColor}
        bg={bg}
        transparentBg={transparentBg}
        showDate={showDate}
        dateFmt={dateFmt}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetFlipClockPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <FlipClockWidgetContent />
    </Suspense>
  );
}
