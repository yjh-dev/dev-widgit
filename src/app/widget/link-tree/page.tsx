"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import LinkTreePreview from "@/components/widget/LinkTreePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeLinks } from "@/lib/link-tree";
import type { LinkStyle } from "@/lib/link-tree";

function LinkTreeWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const links = deserializeLinks(searchParams.get("links") || "");
  const linkStyle = (searchParams.get("style") || "filled") as LinkStyle;
  const accentColor = parseHexColor(searchParams.get("accent"), "2563EB");

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <LinkTreePreview
        title={title}
        links={links}
        linkStyle={linkStyle}
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

export default function WidgetLinkTreePage() {
  return (
    <WidgetPage>
      <LinkTreeWidgetContent />
    </WidgetPage>
  );
}
