"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import ChangelogPreview from "@/components/widget/ChangelogPreview";
import { deserializeEntries } from "@/lib/changelog";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function ChangelogWidgetContent() {
  const searchParams = useWidgetParams();

  const entries = deserializeEntries(searchParams.get("entries") || "");
  const showDate = searchParams.get("showDate") !== "false";
  const showVersion = searchParams.get("showVersion") !== "false";

  const accentColor = parseHexColor(searchParams.get("accentColor"), "6366F1");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <ChangelogPreview
        entries={entries}
        showDate={showDate}
        showVersion={showVersion}
        accentColor={accentColor}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetChangelogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <ChangelogWidgetContent />
    </Suspense>
  );
}
