"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import BatteryPreview from "@/components/widget/BatteryPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function BatteryWidgetContent() {
  const searchParams = useWidgetParams();

  const level = Math.max(0, Math.min(100, Number(searchParams.get("level")) || 75));
  const label = searchParams.get("label") || "";
  const showPercent = searchParams.get("showPercent") !== "false";
  const animate = searchParams.get("animate") === "true";
  const autoColor = searchParams.get("autoColor") !== "false";
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
      <BatteryPreview
        level={level}
        label={label}
        showPercent={showPercent}
        animate={animate}
        autoColor={autoColor}
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

export default function WidgetBatteryPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <BatteryWidgetContent />
    </Suspense>
  );
}
