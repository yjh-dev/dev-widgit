"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import LinkTreePreview from "@/components/widget/LinkTreePreview";
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
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetLinkTreePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <LinkTreeWidgetContent />
    </Suspense>
  );
}
