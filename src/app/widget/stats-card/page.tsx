"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import StatsCardPreview from "@/components/widget/StatsCardPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeStats } from "@/lib/stats-card";

const VALID_LAYOUTS = ["row", "grid"];

function StatsCardWidgetContent() {
  const searchParams = useWidgetParams();

  const rawStats = searchParams.get("stats") || "";
  const stats = deserializeStats(rawStats);

  const rawLayout = searchParams.get("layout");
  const layout = VALID_LAYOUTS.includes(rawLayout || "")
    ? (rawLayout as "row" | "grid")
    : "row";

  const accentColor = parseHexColor(searchParams.get("accent"), "2563EB");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <StatsCardPreview
        stats={stats}
        layout={layout}
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

export default function WidgetStatsCardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <StatsCardWidgetContent />
    </Suspense>
  );
}
