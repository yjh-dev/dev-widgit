"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import CurrencyPreview from "@/components/widget/CurrencyPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeTargets, CURRENCIES } from "@/lib/currency";

function CurrencyWidgetContent() {
  const searchParams = useWidgetParams();

  const rawBase = searchParams.get("base") || "USD";
  const base = CURRENCIES.some((c) => c.code === rawBase) ? rawBase : "USD";

  const targets = deserializeTargets(searchParams.get("targets") || "");
  const showFlag = searchParams.get("showFlag") !== "false";

  const rawRefresh = Number(searchParams.get("refresh"));
  const refreshMin = rawRefresh >= 5 && rawRefresh <= 1440 ? rawRefresh : 60;

  const accentColor = parseHexColor(searchParams.get("accent"), "2563EB");
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <CurrencyPreview
        base={base}
        targets={targets}
        showFlag={showFlag}
        refreshMin={refreshMin}
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

export default function WidgetCurrencyPage() {
  return (
    <WidgetPage>
      <CurrencyWidgetContent />
    </WidgetPage>
  );
}
