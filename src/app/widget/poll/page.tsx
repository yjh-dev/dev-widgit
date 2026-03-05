"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import PollPreview from "@/components/widget/PollPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parsePollOptions } from "@/lib/poll";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function PollWidgetContent() {
  const searchParams = useWidgetParams();

  const question = searchParams.get("question") || "";
  const rawOptions = searchParams.get("options") || "";
  const initialOptions = parsePollOptions(rawOptions);

  const showPercent = searchParams.get("showPercent") !== "false";
  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  // widgetId for localStorage persistence
  const widgetId = question ? btoa(unescape(encodeURIComponent(question))).slice(0, 12) : "default";

  return (
    <WidgetScreen>
      <PollPreview
        question={question}
        initialOptions={initialOptions}
        interactive={true}
        showPercent={showPercent}
        color={color}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        font={font}
        widgetId={widgetId}
      />
    </WidgetScreen>
  );
}

export default function WidgetPollPage() {
  return (
    <WidgetPage>
      <PollWidgetContent />
    </WidgetPage>
  );
}
