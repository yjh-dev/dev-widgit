"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import StatsCardPreview from "@/components/widget/StatsCardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetStatsCardPage() {
  return (
    <WidgetPage>
      <StatsCardWidgetContent />
    </WidgetPage>
  );
}
