"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import ChangelogPreview from "@/components/widget/ChangelogPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { deserializeEntries } from "@/lib/changelog";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function ChangelogWidgetContent() {
  const searchParams = useWidgetParams();

  const entries = deserializeEntries(searchParams.get("entries") || "");
  const showDate = searchParams.get("showDate") !== "false";
  const showVersion = searchParams.get("showVersion") !== "false";

  const accentColor = parseHexColor(searchParams.get("accentColor"), "6366F1");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetChangelogPage() {
  return (
    <WidgetPage>
      <ChangelogWidgetContent />
    </WidgetPage>
  );
}
