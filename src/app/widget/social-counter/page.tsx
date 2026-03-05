"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import SocialCounterPreview from "@/components/widget/SocialCounterPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { parseSocialItems, type SocialLayout } from "@/lib/social-counter";

const VALID_LAYOUTS: SocialLayout[] = ["row", "grid"];

function SocialCounterWidgetContent() {
  const searchParams = useWidgetParams();

  const rawItems = searchParams.get("items") || "";
  const items = parseSocialItems(rawItems);
  const displayItems = items.length > 0 ? items : [{ platform: "YouTube", count: 1000 }];

  const rawLayout = searchParams.get("layout");
  const layout: SocialLayout = VALID_LAYOUTS.includes(rawLayout as SocialLayout)
    ? (rawLayout as SocialLayout)
    : "row";

  const color = parseHexColor(searchParams.get("color"), "E11D48");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <SocialCounterPreview
        items={displayItems}
        layout={layout}
        color={color}
        textColor={textColor}
        font={font}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetSocialCounterPage() {
  return (
    <WidgetPage>
      <SocialCounterWidgetContent />
    </WidgetPage>
  );
}
