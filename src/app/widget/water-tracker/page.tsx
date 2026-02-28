"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import WaterTrackerPreview from "@/components/widget/WaterTrackerPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function WaterTrackerWidgetContent() {
  const searchParams = useWidgetParams();

  const goal = Math.max(1, Math.min(20, Number(searchParams.get("goal")) || 8));
  const glassSize = Math.max(50, Math.min(1000, Number(searchParams.get("glass")) || 250));

  const color = parseHexColor(searchParams.get("color"), "3B82F6");
  const showMl = searchParams.get("showMl") !== "false";
  const textColor = parseHexColor(searchParams.get("textColor"), "1E1E1E");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <WaterTrackerPreview
        goal={goal}
        glassSize={glassSize}
        color={color}
        showMl={showMl}
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

export default function WidgetWaterTrackerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <WaterTrackerWidgetContent />
    </Suspense>
  );
}
