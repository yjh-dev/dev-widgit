"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import DividerPreview from "@/components/widget/DividerPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { DividerStyle, DividerWeight } from "@/lib/divider";

const VALID_STYLES: DividerStyle[] = ["solid", "dashed", "dotted", "wave", "zigzag", "gradient", "double"];
const VALID_WEIGHTS: DividerWeight[] = ["thin", "medium", "thick"];

function DividerWidgetContent() {
  const searchParams = useWidgetParams();

  const rawStyle = searchParams.get("style");
  const style: DividerStyle = VALID_STYLES.includes(rawStyle as DividerStyle)
    ? (rawStyle as DividerStyle)
    : "solid";

  const rawWeight = searchParams.get("weight");
  const weight: DividerWeight = VALID_WEIGHTS.includes(rawWeight as DividerWeight)
    ? (rawWeight as DividerWeight)
    : "medium";

  const color = parseHexColor(searchParams.get("color"), "D4D4D8");
  const color2 = parseHexColor(searchParams.get("color2"), "A1A1AA");
  const text = searchParams.get("text") || "";

  const rawBg = searchParams.get("bg") || "transparent";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <DividerPreview
        style={style}
        weight={weight}
        color={color}
        color2={color2}
        text={text}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetDividerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <DividerWidgetContent />
    </Suspense>
  );
}
