"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import TimetablePreview from "@/components/widget/TimetablePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { deserializeEntries } from "@/lib/timetable";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function TimetableWidgetContent() {
  const searchParams = useWidgetParams();

  const entries = deserializeEntries(searchParams.get("entries") || "");

  const rawStart = searchParams.get("start");
  const startHour = rawStart !== null ? Math.max(0, Math.min(23, Number(rawStart))) : 9;

  const rawEnd = searchParams.get("end");
  const endHour = rawEnd !== null ? Math.max(startHour + 1, Math.min(24, Number(rawEnd))) : 17;

  const rawLang = searchParams.get("lang");
  const lang: "ko" | "en" = rawLang === "en" ? "en" : "ko";

  const showGrid = searchParams.get("showGrid") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <TimetablePreview
        entries={entries}
        startHour={startHour}
        endHour={endHour}
        lang={lang}
        showGrid={showGrid}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetTimetablePage() {
  return (
    <WidgetPage>
      <TimetableWidgetContent />
    </WidgetPage>
  );
}
