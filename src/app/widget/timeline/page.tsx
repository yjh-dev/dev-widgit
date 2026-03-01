"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import TimelinePreview from "@/components/widget/TimelinePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseEvents } from "@/lib/timeline";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function TimelineWidgetContent() {
  const searchParams = useWidgetParams();

  const events = parseEvents(searchParams.get("events") || "");
  const showPast = searchParams.get("past") === "true";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const pastColor = parseHexColor(searchParams.get("pastColor"), "999999");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <TimelinePreview
        events={events}
        showPast={showPast}
        color={color}
        pastColor={pastColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetTimelinePage() {
  return (
    <WidgetPage>
      <TimelineWidgetContent />
    </WidgetPage>
  );
}
