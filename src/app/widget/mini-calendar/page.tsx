"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MiniCalendarPreview from "@/components/widget/MiniCalendarPreview";
import type { WeekStartDay, HeaderFormat, DayNameLang } from "@/lib/mini-calendar";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_WEEK_START: WeekStartDay[] = ["sun", "mon"];
const VALID_HEADER: HeaderFormat[] = ["full", "short", "none"];
const VALID_LANG: DayNameLang[] = ["ko", "en"];

function MiniCalendarWidgetContent() {
  const searchParams = useSearchParams();

  const rawWeekStart = searchParams.get("weekStart");
  const weekStart: WeekStartDay = VALID_WEEK_START.includes(rawWeekStart as WeekStartDay)
    ? (rawWeekStart as WeekStartDay)
    : "mon";

  const rawHeader = searchParams.get("header");
  const header: HeaderFormat = VALID_HEADER.includes(rawHeader as HeaderFormat)
    ? (rawHeader as HeaderFormat)
    : "full";

  const showDayNames = searchParams.get("dayNames") !== "false";

  const rawLang = searchParams.get("lang");
  const lang: DayNameLang = VALID_LANG.includes(rawLang as DayNameLang)
    ? (rawLang as DayNameLang)
    : "ko";

  const showOtherDays = searchParams.get("otherDays") !== "false";
  const showNav = searchParams.get("nav") !== "false";

  const highlight = parseHexColor(searchParams.get("highlight"), "2563EB");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <MiniCalendarPreview
        weekStart={weekStart}
        header={header}
        showDayNames={showDayNames}
        lang={lang}
        showOtherDays={showOtherDays}
        showNav={showNav}
        highlight={highlight}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetMiniCalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <MiniCalendarWidgetContent />
    </Suspense>
  );
}
