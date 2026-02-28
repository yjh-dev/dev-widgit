"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import FlashcardPreview from "@/components/widget/FlashcardPreview";
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

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetFlashcardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <FlashcardWidgetContent />
    </Suspense>
  );
}
