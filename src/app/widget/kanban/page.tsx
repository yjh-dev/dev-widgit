"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import KanbanPreview from "@/components/widget/KanbanPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseColumns } from "@/lib/kanban";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function KanbanWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const rawColumns = searchParams.get("columns") || "";
  const initialColumns = parseColumns(rawColumns);

  const color = parseHexColor(searchParams.get("color"), "6366F1");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  // widgetId for localStorage persistence
  const widgetId = rawColumns ? btoa(rawColumns).slice(0, 12) : "default";

  return (
    <WidgetScreen>
      <KanbanPreview
        title={title}
        initialColumns={initialColumns}
        interactive={true}
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

export default function WidgetKanbanPage() {
  return (
    <WidgetPage>
      <KanbanWidgetContent />
    </WidgetPage>
  );
}
