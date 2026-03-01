"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import CountdownPreview from "@/components/widget/CountdownPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function CountdownWidgetContent() {
  const searchParams = useWidgetParams();

  const minutes = Math.max(0, Math.min(999, Number(searchParams.get("min")) || 5));
  const seconds = Math.max(0, Math.min(59, Number(searchParams.get("sec")) || 0));
  const showMs = searchParams.get("showMs") === "true";
  const autoRestart = searchParams.get("autoRestart") === "true";

  const accentColor = parseHexColor(searchParams.get("accent"), "E11D48");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetCountdownPage() {
  return (
    <WidgetPage>
      <CountdownWidgetContent />
    </WidgetPage>
  );
}
