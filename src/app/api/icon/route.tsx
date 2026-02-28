import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const type = sp.get("type") || "letter";
  const char = sp.get("char") || "W";
  const emoji = sp.get("emoji") || "\u{1F680}";
  const bg = sp.get("bg") || "6366F1";
  const color = sp.get("color") || "FFFFFF";
  const bg2 = sp.get("bg2") || "";
  const shape = sp.get("shape") || "rounded";
  const bold = sp.get("bold") !== "false";
  const sizeOverride = sp.get("size") ? Number(sp.get("size")) : null;

  const borderRadius =
    shape === "circle" ? 140 : shape === "rounded" ? 56 : 0;

  const background = bg2
    ? `linear-gradient(135deg, #${bg}, #${bg2})`
    : `#${bg}`;

  const defaultFontSize = type === "emoji" ? 140 : 160;
  const fontSize = sizeOverride ?? defaultFontSize;

  const displayContent =
    type === "letter" ? char : type === "emoji" ? emoji : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 280,
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background,
          borderRadius,
          fontSize,
          fontWeight: bold ? 700 : 400,
          color: `#${color}`,
          lineHeight: 1,
        }}
      >
        {displayContent}
      </div>
    ),
    {
      width: 280,
      height: 280,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
