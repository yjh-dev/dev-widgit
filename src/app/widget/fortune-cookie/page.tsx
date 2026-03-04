"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import FortuneCookiePreview from "@/components/widget/FortuneCookiePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";

function Content() {
  const params = useWidgetParams();

  // 다중 메시지: messages 파라미터 (파이프 구분)
  const messagesRaw = params.get("messages");
  // 하위 호환: 기존 단일 message 파라미터
  const singleMessage = params.get("message");
  const customMessages = messagesRaw
    ? messagesRaw.split("|").map(decodeURIComponent).filter(Boolean)
    : singleMessage
      ? [singleMessage]
      : [];

  const lang = (params.get("lang") as "ko" | "en") || "ko";
  const style = (params.get("style") as "classic" | "modern" | "paper") || "classic";
  const cookieColor = params.get("cookieColor") || "D97706";
  const textColor = params.get("textColor") || "";
  const bgParam = params.get("bg");
  const transparentBg = bgParam === "transparent";
  const bg = transparentBg ? "FFFFFF" : bgParam || "FFFFFF";
  const taps = Math.max(1, Math.min(10, Number(params.get("taps")) || 1));

  return (
    <WidgetScreen>
    <FortuneCookiePreview
      customMessages={customMessages}
      lang={lang}
      style={style}
      cookieColor={cookieColor}
      textColor={textColor}
      bg={bg}
      transparentBg={transparentBg}
      borderRadius={parseBorderRadius(params.get("radius"))}
      padding={parsePadding(params.get("pad"))}
      fontSize={parseFontSize(params.get("fsize"))}
      taps={taps}
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
