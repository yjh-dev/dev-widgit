"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import BreathingPreview from "@/components/widget/BreathingPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { TECHNIQUES } from "@/lib/breathing";
import type { BreathingTechnique } from "@/lib/breathing";

function BreathingWidgetContent() {
  const searchParams = useWidgetParams();

  const technique = (searchParams.get("tech") || "478") as BreathingTechnique;
  const techInfo = TECHNIQUES[technique] || TECHNIQUES["478"];

  // Custom durations override technique defaults
  const inhale = searchParams.has("in") ? Number(searchParams.get("in")) : techInfo.phases[0]?.duration ?? 4;
  const hold1 = searchParams.has("h1") ? Number(searchParams.get("h1")) : techInfo.phases[1]?.duration ?? 0;
  const exhale = searchParams.has("ex") ? Number(searchParams.get("ex")) : techInfo.phases[2]?.duration ?? 4;
  const hold2 = searchParams.has("h2") ? Number(searchParams.get("h2")) : techInfo.phases[3]?.duration ?? 0;
  const rounds = searchParams.has("rounds") ? Math.max(1, Math.min(20, Number(searchParams.get("rounds")))) : 3;
  const showGuide = searchParams.get("guide") !== "false";

  const accentColor = parseHexColor(searchParams.get("accent"), "06B6D4");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <BreathingPreview
        inhale={inhale}
        hold1={hold1}
        exhale={exhale}
        hold2={hold2}
        rounds={rounds}
        showGuide={showGuide}
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

export default function WidgetBreathingPage() {
  return (
    <WidgetPage>
      <BreathingWidgetContent />
    </WidgetPage>
  );
}
