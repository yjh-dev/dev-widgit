"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import GradientPreview from "@/components/widget/GradientPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { GradientType } from "@/lib/gradient";

const VALID_TYPES: GradientType[] = ["linear", "radial", "conic"];

function GradientWidgetContent() {
  const searchParams = useWidgetParams();

  const rawColors = searchParams.get("colors") || "6366F1|EC4899";
  const colors = rawColors.split("|").filter((c) => /^[0-9a-fA-F]{6}$/.test(c)).slice(0, 4);
  if (colors.length < 2) { colors.length = 0; colors.push("6366F1", "EC4899"); }

  const rawDir = searchParams.get("dir");
  const dir = rawDir !== null ? Math.max(0, Math.min(360, Number(rawDir))) : 135;

  const rawType = searchParams.get("type");
  const type: GradientType = VALID_TYPES.includes(rawType as GradientType)
    ? (rawType as GradientType)
    : "linear";

  const animate = searchParams.get("animate") === "true";
  const speed = Math.max(3, Math.min(30, Number(searchParams.get("speed")) || 10));
  const text = searchParams.get("text") || "";
  const textColor = parseHexColor(searchParams.get("textColor"), "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <GradientPreview
        colors={colors}
        dir={dir}
        type={type}
        animate={animate}
        speed={speed}
        text={text}
        textColor={textColor}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetGradientPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <GradientWidgetContent />
    </Suspense>
  );
}
