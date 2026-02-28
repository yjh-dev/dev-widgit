"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import CountdownPreview from "@/components/widget/CountdownPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function CountdownWidgetContent() {
  const searchParams = useWidgetParams();

  const minutes = Math.max(0, Math.min(999, Number(searchParams.get("min")) || 5));
  const seconds = Math.max(0, Math.min(59, Number(searchParams.get("sec")) || 0));
  const showMs = searchParams.get("showMs") === "true";
  const autoRestart = searchParams.get("autoRestart") === "true";

  const accentColor = parseHexColor(searchParams.get("accent"), "E11D48");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <CountdownPreview
        minutes={minutes}
        seconds={seconds}
        showMs={showMs}
        autoRestart={autoRestart}
        accentColor={accentColor}
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

export default function WidgetCountdownPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <CountdownWidgetContent />
    </Suspense>
  );
}
