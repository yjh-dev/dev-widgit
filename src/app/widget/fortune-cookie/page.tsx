"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import FortuneCookiePreview from "@/components/widget/FortuneCookiePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";

function Content() {
  const params = useWidgetParams();

  const customMessage = params.get("message") || "";
  const lang = (params.get("lang") as "ko" | "en") || "ko";
  const style = (params.get("style") as "classic" | "modern" | "paper") || "classic";
  const cookieColor = params.get("cookieColor") || "D97706";
  const textColor = params.get("textColor") || "";
  const bgParam = params.get("bg");
  const transparentBg = bgParam === "transparent";
  const bg = transparentBg ? "FFFFFF" : bgParam || "FFFFFF";

  return (
    <WidgetScreen>
    <FortuneCookiePreview
      customMessage={customMessage}
      lang={lang}
      style={style}
      cookieColor={cookieColor}
      textColor={textColor}
      bg={bg}
      transparentBg={transparentBg}
      borderRadius={parseBorderRadius(params.get("radius"))}
      padding={parsePadding(params.get("pad"))}
      fontSize={parseFontSize(params.get("fsize"))}
    />
    </WidgetScreen>
  );
}

export default function FortuneCookieWidgetPage() {
  return (
    <WidgetPage>
      <Content />
    </WidgetPage>
  );
}
