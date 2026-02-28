"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import EmojiRainPreview from "@/components/widget/EmojiRainPreview";
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
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetEmojiRainPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <EmojiRainWidgetContent />
    </Suspense>
  );
}
