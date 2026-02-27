"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import DicePreview from "@/components/widget/DicePreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { DiceMode, DiceSides } from "@/lib/dice";

const VALID_MODES: DiceMode[] = ["dice", "coin", "picker"];
const VALID_SIDES: number[] = [4, 6, 8, 10, 12, 20];

function DiceWidgetContent() {
  const searchParams = useWidgetParams();

  const rawMode = searchParams.get("mode");
  const mode: DiceMode = VALID_MODES.includes(rawMode as DiceMode)
    ? (rawMode as DiceMode)
    : "dice";

  const count = Math.max(1, Math.min(4, Number(searchParams.get("count")) || 1));

  const rawSides = Number(searchParams.get("sides")) || 6;
  const sides: DiceSides = VALID_SIDES.includes(rawSides)
    ? (rawSides as DiceSides)
    : 6;

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "FFFFFF");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const rawItems = searchParams.get("items") || "";
  const items = rawItems ? rawItems.split("|").map(decodeURIComponent).filter(Boolean) : [];

  const showTotal = searchParams.get("showTotal") !== "false";
  const history = searchParams.get("history") === "true";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <DicePreview
        mode={mode}
        count={count}
        sides={sides}
        color={color}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        items={items}
        showTotal={showTotal}
        history={history}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetDicePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <DiceWidgetContent />
    </Suspense>
  );
}
