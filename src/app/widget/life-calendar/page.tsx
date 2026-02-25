"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";
import type { CellShape, CellSize } from "@/components/widget/LifeCalendarPreview";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";

const VALID_SHAPES: CellShape[] = ["square", "round"];
const VALID_CELL_SIZES: CellSize[] = ["sm", "md", "lg"];

function LifeCalendarWidgetContent() {
  const searchParams = useSearchParams();

  const birthdate = searchParams.get("birthdate") || "";
  const rawLifespan = Number(searchParams.get("lifespan"));
  const lifespan = rawLifespan > 0 && rawLifespan <= 120 ? rawLifespan : 80;
  const color = searchParams.get("color") || "2563EB";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;
  const showStats = searchParams.get("stats") !== "false";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const rawShape = searchParams.get("shape");
  const shape: CellShape = VALID_SHAPES.includes(rawShape as CellShape)
    ? (rawShape as CellShape)
    : "square";

  const rawCellSize = searchParams.get("cellSize");
  const cellSize: CellSize = VALID_CELL_SIZES.includes(rawCellSize as CellSize)
    ? (rawCellSize as CellSize)
    : "sm";

  const futureColor = searchParams.get("futureColor") || "";

  return (
    <div className="w-screen h-screen bg-transparent">
      <LifeCalendarPreview
        birthdate={birthdate}
        lifespan={lifespan}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        showStats={showStats}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        shape={shape}
        cellSize={cellSize}
        futureColor={futureColor}
      />
    </div>
  );
}

export default function WidgetLifeCalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <LifeCalendarWidgetContent />
    </Suspense>
  );
}
