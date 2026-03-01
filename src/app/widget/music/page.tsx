"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import MusicPreview from "@/components/widget/MusicPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function MusicWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const artist = searchParams.get("artist") || "";
  const rawProgress = searchParams.get("progress");
  const progress = rawProgress !== null ? Math.max(0, Math.min(100, Number(rawProgress))) : 35;
  const artColor = parseHexColor(searchParams.get("artColor"), "6366F1");
  const showProgress = searchParams.get("showProgress") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <MusicPreview
        title={title}
        artist={artist}
        progress={progress}
        artColor={artColor}
        showProgress={showProgress}
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

export default function WidgetMusicPage() {
  return (
    <WidgetPage>
      <MusicWidgetContent />
    </WidgetPage>
  );
}
