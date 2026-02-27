"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import MoonPhasePreview from "@/components/widget/MoonPhasePreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { MoonStyle, MoonSize } from "@/lib/moon-phase";

const VALID_STYLES: MoonStyle[] = ["realistic", "simple", "emoji"];
const VALID_SIZES: MoonSize[] = ["sm", "md", "lg"];

function MoonPhaseWidgetContent() {
  const searchParams = useWidgetParams();

  const rawStyle = searchParams.get("style");
  const style: MoonStyle = VALID_STYLES.includes(rawStyle as MoonStyle)
    ? (rawStyle as MoonStyle)
    : "realistic";

  const showName = searchParams.get("showName") !== "false";
  const showPercent = searchParams.get("showPercent") !== "false";
  const showNext = searchParams.get("showNext") === "true";

  const moonColor = parseHexColor(searchParams.get("moonColor"), "F5F5DC");
  const shadowColor = parseHexColor(searchParams.get("shadowColor"), "1A1A2E");
  const textColor = parseHexColor(searchParams.get("textColor"), "E0E0E0");

  const rawBg = searchParams.get("bg") || "0F172A";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "0F172A" : parseHexColor(rawBg, "0F172A");

  const rawSize = searchParams.get("moonSize");
  const moonSize: MoonSize = VALID_SIZES.includes(rawSize as MoonSize)
    ? (rawSize as MoonSize)
    : "md";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <MoonPhasePreview
        style={style}
        showName={showName}
        showPercent={showPercent}
        showNext={showNext}
        moonColor={moonColor}
        shadowColor={shadowColor}
        bg={bg}
        transparentBg={transparentBg}
        textColor={textColor}
        moonSize={moonSize}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetMoonPhasePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <MoonPhaseWidgetContent />
    </Suspense>
  );
}
