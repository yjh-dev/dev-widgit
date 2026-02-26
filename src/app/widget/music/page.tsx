"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MusicPreview from "@/components/widget/MusicPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function MusicWidgetContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const artist = searchParams.get("artist") || "";
  const progress = Math.max(0, Math.min(100, Number(searchParams.get("progress")) || 35));
  const artColor = parseHexColor(searchParams.get("artColor"), "6366F1");
  const showProgress = searchParams.get("showProgress") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetMusicPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <MusicWidgetContent />
    </Suspense>
  );
}
