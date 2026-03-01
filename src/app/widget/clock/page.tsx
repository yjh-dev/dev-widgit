"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import ClockPreview from "@/components/widget/ClockPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import type { ClockFormat, ClockDateFormat } from "@/lib/clock";
import { ALL_FONT_KEYS } from "@/lib/fonts";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_FORMATS: ClockFormat[] = ["12h", "24h"];
const VALID_DATE_FORMATS: ClockDateFormat[] = ["kr", "en", "short"];

function ClockWidgetContent() {
  const searchParams = useWidgetParams();

  const timezone = searchParams.get("timezone") || "Asia/Seoul";

  const rawFormat = searchParams.get("format");
  const format: ClockFormat = VALID_FORMATS.includes(rawFormat as ClockFormat)
    ? (rawFormat as ClockFormat)
    : "24h";

  const rawFont = searchParams.get("font") || "mono";
  const font = ALL_FONT_KEYS.includes(rawFont) ? rawFont : "mono";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

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
    <WidgetScreen>
      <ClockPreview
        timezone={timezone} format={format} font={font} color={color}
        bg={bg} transparentBg={transparentBg}
        borderRadius={borderRadius} padding={padding} fontSize={fontSize}
        showSeconds={showSeconds} showDate={showDate} blink={blink}
        dateColor={dateColor} dateFmt={dateFmt}
      />
    </WidgetScreen>
  );
}

export default function WidgetClockPage() {
  return (
    <WidgetPage>
      <ClockWidgetContent />
    </WidgetPage>
  );
}
