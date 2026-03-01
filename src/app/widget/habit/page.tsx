"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import HabitPreview from "@/components/widget/HabitPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetHabitPage() {
  return (
    <WidgetPage>
      <HabitWidgetContent />
    </WidgetPage>
  );
}
