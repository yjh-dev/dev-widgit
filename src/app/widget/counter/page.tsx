"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import CounterPreview from "@/components/widget/CounterPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function CounterWidgetContent() {
  const searchParams = useWidgetParams();

  const label = searchParams.get("label") || "카운터";
  const initial = Number(searchParams.get("initial")) || 0;

  const rawStep = Number(searchParams.get("step"));
  const step = rawStep >= 1 && rawStep <= 100 ? rawStep : 1;

  const rawMin = searchParams.get("min");
  const min = rawMin !== null && rawMin !== "" ? Number(rawMin) : undefined;

  const rawMax = searchParams.get("max");
  const max = rawMax !== null && rawMax !== "" ? Number(rawMax) : undefined;

  const showReset = searchParams.get("showReset") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const btnColor = parseHexColor(searchParams.get("btnColor"), "2563EB");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";
  const celebrate = searchParams.get("celebrate") !== "false";

  return (
    <WidgetScreen>
      <CounterPreview
        label={label}
        initial={initial}
        step={step}
        min={min}
        max={max}
        showReset={showReset}
        color={color}
        btnColor={btnColor}
        font={font}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        persist={true}
        celebrate={celebrate}
      />
    </WidgetScreen>
  );
}

export default function WidgetCounterPage() {
  return (
    <WidgetPage>
      <CounterWidgetContent />
    </WidgetPage>
  );
}
