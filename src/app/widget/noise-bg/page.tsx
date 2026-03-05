"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import NoiseBgPreview from "@/components/widget/NoiseBgPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { NoiseType } from "@/lib/noise-bg";

const VALID_TYPES: NoiseType[] = ["gradient-flow", "particles", "waves"];

function NoiseBgWidgetContent() {
  const searchParams = useWidgetParams();

  const rawType = searchParams.get("type");
  const type: NoiseType = VALID_TYPES.includes(rawType as NoiseType)
    ? (rawType as NoiseType)
    : "gradient-flow";

  const color1 = parseHexColor(searchParams.get("color1"), "6366F1");
  const color2 = parseHexColor(searchParams.get("color2"), "EC4899");
  const speed = Math.max(1, Math.min(5, Number(searchParams.get("speed")) || 1));
  const opacity = Math.max(0, Math.min(100, Number(searchParams.get("opacity")) || 100));

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <NoiseBgPreview
        type={type}
        color1={color1}
        color2={color2}
        speed={speed}
        opacity={opacity}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetNoiseBgPage() {
  return (
    <WidgetPage>
      <NoiseBgWidgetContent />
    </WidgetPage>
  );
}
