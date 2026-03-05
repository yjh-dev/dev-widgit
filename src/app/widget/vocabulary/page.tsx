"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import VocabularyPreview from "@/components/widget/VocabularyPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { parseWords, type VocabMode } from "@/lib/vocabulary";

const VALID_MODES: VocabMode[] = ["daily", "random", "sequential"];

function VocabularyWidgetContent() {
  const searchParams = useWidgetParams();

  const rawWords = searchParams.get("words") || "";
  const words = parseWords(rawWords);

  const rawMode = searchParams.get("mode");
  const mode: VocabMode = VALID_MODES.includes(rawMode as VocabMode)
    ? (rawMode as VocabMode)
    : "daily";

  const color = parseHexColor(searchParams.get("color"), "7C3AED");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <VocabularyPreview
        words={words}
        mode={mode}
        color={color}
        textColor={textColor}
        font={font}
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
      <VocabularyWidgetContent />
    </WidgetPage>
  );
}
