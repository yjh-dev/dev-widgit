"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ClockPreview from "@/components/widget/ClockPreview";
import type { ClockFormat, ClockDateFormat } from "@/lib/clock";
import { ALL_FONT_KEYS } from "@/lib/fonts";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_FORMATS: ClockFormat[] = ["12h", "24h"];
const VALID_DATE_FORMATS: ClockDateFormat[] = ["kr", "en", "short"];

function ClockWidgetContent() {
  const searchParams = useSearchParams();

  const timezone = searchParams.get("timezone") || "Asia/Seoul";

  const rawFormat = searchParams.get("format");
  const format: ClockFormat = VALID_FORMATS.includes(rawFormat as ClockFormat)
    ? (rawFormat as ClockFormat)
    : "24h";

  const rawFont = searchParams.get("font") || "mono";
  const font = ALL_FONT_KEYS.includes(rawFont) ? rawFont : "mono";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const showSeconds = searchParams.get("seconds") !== "false";
  const showDate = searchParams.get("date") === "true";
  const blink = searchParams.get("blink") !== "false";

  const dateColor = parseHexColor(searchParams.get("dateColor"), "");

  const rawDateFmt = searchParams.get("dateFmt");
  const dateFmt: ClockDateFormat = VALID_DATE_FORMATS.includes(rawDateFmt as ClockDateFormat)
    ? (rawDateFmt as ClockDateFormat)
    : "kr";

  return (
    <div className="w-screen h-screen bg-transparent">
      <ClockPreview
        timezone={timezone}
        format={format}
        font={font}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        showSeconds={showSeconds}
        showDate={showDate}
        blink={blink}
        dateColor={dateColor}
        dateFmt={dateFmt}
      />
    </div>
  );
}

export default function WidgetClockPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <ClockWidgetContent />
    </Suspense>
  );
}
