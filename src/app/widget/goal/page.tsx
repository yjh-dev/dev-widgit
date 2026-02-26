"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import GoalPreview from "@/components/widget/GoalPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { GoalStyle } from "@/lib/goal";

const VALID_STYLES: GoalStyle[] = ["bar", "ring"];

function GoalWidgetContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const current = Math.max(0, Number(searchParams.get("current")) || 0);
  const target = Math.max(1, Number(searchParams.get("target")) || 100);
  const unit = searchParams.get("unit") || "";

  const rawStyle = searchParams.get("style");
  const style: GoalStyle = VALID_STYLES.includes(rawStyle as GoalStyle)
    ? (rawStyle as GoalStyle)
    : "bar";

  const showValue = searchParams.get("showValue") !== "false";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <GoalPreview
        title={title}
        current={current}
        target={target}
        unit={unit}
        style={style}
        showValue={showValue}
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

export default function WidgetGoalPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <GoalWidgetContent />
    </Suspense>
  );
}
