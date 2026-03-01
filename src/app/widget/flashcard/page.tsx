"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import FlashcardPreview from "@/components/widget/FlashcardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeCards } from "@/lib/flashcard";

function FlashcardWidgetContent() {
  const searchParams = useWidgetParams();

  const rawCards = searchParams.get("cards") || "";
  const cards = deserializeCards(rawCards);

  const showCount = searchParams.get("showCount") !== "false";
  const autoFlip = searchParams.get("autoFlip") === "true";

  const accentColor = parseHexColor(searchParams.get("accent"), "7C3AED");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <FlashcardPreview
        cards={cards}
        showCount={showCount}
        autoFlip={autoFlip}
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

export default function WidgetFlashcardPage() {
  return (
    <WidgetPage>
      <FlashcardWidgetContent />
    </WidgetPage>
  );
}
