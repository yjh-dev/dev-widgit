"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import QRCodePreview from "@/components/widget/QRCodePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { QRErrorCorrection, QRModuleStyle, QRSize } from "@/lib/qr-code";

const VALID_EC: QRErrorCorrection[] = ["L", "M", "Q", "H"];
const VALID_MODULE: QRModuleStyle[] = ["square", "rounded", "dots"];
const VALID_SIZE: QRSize[] = ["sm", "md", "lg"];

function QRCodeWidgetContent() {
  const searchParams = useWidgetParams();

  const data = searchParams.get("data") || "";
  const label = searchParams.get("label") || "";
  const fgColor = parseHexColor(searchParams.get("fgColor"), "1E1E1E");
  const bgColor = parseHexColor(searchParams.get("bgColor"), "FFFFFF");

  const rawSize = searchParams.get("size");
  const size: QRSize = VALID_SIZE.includes(rawSize as QRSize)
    ? (rawSize as QRSize)
    : "md";

  const rawEc = searchParams.get("ec");
  const ec: QRErrorCorrection = VALID_EC.includes(rawEc as QRErrorCorrection)
    ? (rawEc as QRErrorCorrection)
    : "M";

  const rawModule = searchParams.get("module");
  const moduleStyle: QRModuleStyle = VALID_MODULE.includes(rawModule as QRModuleStyle)
    ? (rawModule as QRModuleStyle)
    : "square";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <QRCodePreview
        data={data}
        label={label}
        fgColor={fgColor}
        bgColor={bgColor}
        size={size}
        ec={ec}
        module={moduleStyle}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetQRCodePage() {
  return (
    <WidgetPage>
      <QRCodeWidgetContent />
    </WidgetPage>
  );
}
