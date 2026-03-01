"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import EmojiRainPreview from "@/components/widget/EmojiRainPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBorderRadius, parsePadding, parseHexColor } from "@/lib/common-widget-options";
import { parseSpeed, parseDensity } from "@/lib/emoji-rain";

function EmojiRainWidgetContent() {
  const searchParams = useWidgetParams();

  const emojis = searchParams.get("emojis") || "🎉🎊✨💖🌟";
  const speed = parseSpeed(searchParams.get("speed"));
  const density = parseDensity(searchParams.get("density"));
  const minSize = Math.max(8, Math.min(64, Number(searchParams.get("minSize")) || 16));
  const maxSize = Math.max(8, Math.min(64, Number(searchParams.get("maxSize")) || 32));

  const rawBg = searchParams.get("bg") || "transparent";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));

  return (
    <WidgetScreen>
      <EmojiRainPreview
        emojis={emojis}
        speed={speed}
        density={density}
        minSize={minSize}
        maxSize={maxSize}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
      />
    </WidgetScreen>
  );
}

export default function WidgetEmojiRainPage() {
  return (
    <WidgetPage>
      <EmojiRainWidgetContent />
    </WidgetPage>
  );
}
