"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import FlashcardPreview from "@/components/widget/FlashcardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { FlashCard, CardMode } from "@/lib/flashcard";

function parseVocabWords(raw: string): FlashCard[] {
  if (!raw) return [];
  return raw.split("|").map((item) => {
    const [word, meaning] = item.split("~");
    return { front: word || "", back: meaning || "" };
  }).filter((w) => w.front);
}

function mapVocabMode(raw: string | null): CardMode {
  if (raw === "random") return "random";
  return "sequential";
}

function VocabularyCompatContent() {
  const searchParams = useWidgetParams();

  const rawWords = searchParams.get("words") || "";
  const cards = parseVocabWords(rawWords);

  const mode = mapVocabMode(searchParams.get("mode"));

  const accentColor = parseHexColor(searchParams.get("color"), "7C3AED");
  const color = parseHexColor(searchParams.get("textColor"), "") || parseHexColor(searchParams.get("color"), "7C3AED");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <FlashcardPreview
        cards={cards}
        showCount={true}
        displayStyle="reveal"
        mode={mode}
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

export default function WidgetVocabularyPage() {
  return (
    <WidgetPage>
      <VocabularyCompatContent />
    </WidgetPage>
  );
}
