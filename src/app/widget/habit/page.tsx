"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import HabitPreview from "@/components/widget/HabitPreview";
import { parseCheckedDates, type HabitView } from "@/lib/habit";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_VIEWS: HabitView[] = ["week", "month"];

function HabitWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";

  const rawView = searchParams.get("view");
  const view: HabitView = VALID_VIEWS.includes(rawView as HabitView)
    ? (rawView as HabitView)
    : "week";

  const rawWeekStart = searchParams.get("weekStart");
  const weekStart: "sun" | "mon" = rawWeekStart === "sun" ? "sun" : "mon";

  const checkedDates = parseCheckedDates(searchParams.get("checked") || "");

  const color = parseHexColor(searchParams.get("color"), "22C55E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <HabitPreview
        title={title}
        view={view}
        weekStart={weekStart}
        checkedDates={checkedDates}
        interactive={true}
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

export default function WidgetHabitPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <HabitWidgetContent />
    </Suspense>
  );
}
