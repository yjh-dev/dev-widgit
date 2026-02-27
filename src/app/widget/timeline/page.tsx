"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import TimelinePreview from "@/components/widget/TimelinePreview";
import { parseEvents } from "@/lib/timeline";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function TimelineWidgetContent() {
  const searchParams = useWidgetParams();

  const events = parseEvents(searchParams.get("events") || "");
  const showPast = searchParams.get("past") === "true";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const pastColor = parseHexColor(searchParams.get("pastColor"), "999999");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetTimelinePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <TimelineWidgetContent />
    </Suspense>
  );
}
