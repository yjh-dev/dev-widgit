"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import TimeProgressPreview from "@/components/widget/TimeProgressPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import type { ProgressType, WeekStart } from "@/lib/time-progress";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { BarStyle, BarHeight, RingSize } from "@/components/widget/TimeProgressPreview";

const VALID_TYPES: ProgressType[] = ["day", "week", "month", "year"];
const VALID_STYLES: BarStyle[] = ["bar", "ring"];
const VALID_BAR_HEIGHTS: BarHeight[] = ["thin", "default", "thick"];
const VALID_WEEK_STARTS: WeekStart[] = ["sun", "mon"];
const VALID_RING_SIZES: RingSize[] = ["sm", "md", "lg"];

function TimeProgressWidgetContent() {
  const searchParams = useWidgetParams();

  const rawType = searchParams.get("type");
  const type: ProgressType = VALID_TYPES.includes(rawType as ProgressType)
    ? (rawType as ProgressType)
    : "day";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const rawStyle = searchParams.get("style");
  const style: BarStyle = VALID_STYLES.includes(rawStyle as BarStyle)
    ? (rawStyle as BarStyle)
    : "bar";

  const showLabel = searchParams.get("label") !== "false";
  const showPercent = searchParams.get("percent") !== "false";

  const rawBarH = searchParams.get("barH");
  const barHeight: BarHeight = VALID_BAR_HEIGHTS.includes(rawBarH as BarHeight)
    ? (rawBarH as BarHeight)
    : "default";

  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const rawWeekStart = searchParams.get("weekStart");
  const weekStart: WeekStart = VALID_WEEK_STARTS.includes(rawWeekStart as WeekStart)
    ? (rawWeekStart as WeekStart)
    : "sun";

  const rawRingSize = searchParams.get("ringSize");
  const ringSize: RingSize = VALID_RING_SIZES.includes(rawRingSize as RingSize)
    ? (rawRingSize as RingSize)
    : "md";

  const showRemain = searchParams.get("remain") === "true";

  return (
    <WidgetScreen>
      <TimeProgressPreview
        type={type}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        style={style}
        showLabel={showLabel}
        showPercent={showPercent}
        barHeight={barHeight}
        textColor={textColor}
        weekStart={weekStart}
        ringSize={ringSize}
        showRemain={showRemain}
      />
    </WidgetScreen>
  );
}

export default function WidgetTimeProgressPage() {
  return (
    <WidgetPage>
      <TimeProgressWidgetContent />
    </WidgetPage>
  );
}
