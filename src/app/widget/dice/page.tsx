"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import DicePreview from "@/components/widget/DicePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const rawItems = searchParams.get("items") || "";
  const items = rawItems ? rawItems.split("|").map(decodeURIComponent).filter(Boolean) : [];

  const showTotal = searchParams.get("showTotal") !== "false";
  const history = searchParams.get("history") === "true";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetDicePage() {
  return (
    <WidgetPage>
      <DiceWidgetContent />
    </WidgetPage>
  );
}
