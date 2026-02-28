import type { NextRequest } from "next/server";

type BadgeType = "status" | "progress" | "version";
type BadgeStyle = "flat" | "rounded";

/** Approximate character width for DejaVu Sans at 12px */
const CHAR_WIDTH = 7;
const PADDING_H = 12;
const HEIGHT_FLAT = 24;
const HEIGHT_ROUNDED = 28;
const FONT_FAMILY = "DejaVu Sans,Verdana,Geneva,sans-serif";

function measureText(text: string): number {
  // Rough estimation: CJK characters are wider (~12px), ASCII ~7px
  let width = 0;
  for (const ch of text) {
    width += ch.charCodeAt(0) > 0x7f ? 12 : CHAR_WIDTH;
  }
  return width;
}

function sectionWidth(text: string, hasLogo: boolean): number {
  const textW = measureText(text);
  const logoW = hasLogo ? 16 : 0; // emoji space
  const gap = hasLogo ? 4 : 0;
  return textW + logoW + gap + PADDING_H * 2;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildStatusBadge(
  label: string,
  value: string,
  color: string,
  labelColor: string,
  logo: string,
  style: BadgeStyle,
): string {
  const h = style === "rounded" ? HEIGHT_ROUNDED : HEIGHT_FLAT;
  const rx = style === "rounded" ? h / 2 : 4;
  const lw = sectionWidth(label, !!logo);
  const vw = sectionWidth(value, false);
  const totalW = lw + vw;
  const textY = Math.round(h * 0.67);

  // Build label text with optional logo
  const logoStr = logo ? escapeXml(logo) : "";
  const labelTextX = logo
    ? lw / 2 + 6 // shift right slightly for logo
    : lw / 2;
  const logoX = PADDING_H;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${h}">
  <rect width="${lw}" height="${h}" fill="#${labelColor}" rx="${rx}"/>
  <rect x="${lw}" width="${vw}" height="${h}" fill="#${color}" rx="${rx}"/>
  <!-- overlap fix: cover the rounded corners at the junction -->
  <rect x="${lw - rx}" width="${rx}" height="${h}" fill="#${labelColor}"/>
  <rect x="${lw}" width="${rx}" height="${h}" fill="#${color}"/>
  ${logo ? `<text x="${logoX}" y="${textY}" font-family="${FONT_FAMILY}" font-size="12">${logoStr}</text>` : ""}
  <text x="${labelTextX}" y="${textY}" fill="#fff" font-family="${FONT_FAMILY}" font-size="12" text-anchor="middle">${escapeXml(label)}</text>
  <text x="${lw + vw / 2}" y="${textY}" fill="#fff" font-family="${FONT_FAMILY}" font-size="12" text-anchor="middle">${escapeXml(value)}</text>
</svg>`;
}

function buildProgressBadge(
  label: string,
  percent: number,
  color: string,
  labelColor: string,
  logo: string,
  style: BadgeStyle,
): string {
  const h = style === "rounded" ? HEIGHT_ROUNDED : HEIGHT_FLAT;
  const rx = style === "rounded" ? h / 2 : 4;
  const lw = sectionWidth(label, !!logo);
  const barW = 80;
  const percentText = `${percent}%`;
  const percentTextW = measureText(percentText);
  const rightPad = PADDING_H;
  const rightW = PADDING_H + barW + 6 + percentTextW + rightPad;
  const totalW = lw + rightW;
  const textY = Math.round(h * 0.67);

  const barH = 8;
  const barY = (h - barH) / 2;
  const barX = lw + PADDING_H;
  const fillW = Math.round((barW * Math.min(100, Math.max(0, percent))) / 100);
  const barRx = style === "rounded" ? 4 : 2;

  const logoStr = logo ? escapeXml(logo) : "";
  const labelTextX = logo ? lw / 2 + 6 : lw / 2;
  const logoX = PADDING_H;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${h}">
  <rect width="${lw}" height="${h}" fill="#${labelColor}" rx="${rx}"/>
  <rect x="${lw}" width="${rightW}" height="${h}" fill="#${color}" rx="${rx}"/>
  <rect x="${lw - rx}" width="${rx}" height="${h}" fill="#${labelColor}"/>
  <rect x="${lw}" width="${rx}" height="${h}" fill="#${color}"/>
  ${logo ? `<text x="${logoX}" y="${textY}" font-family="${FONT_FAMILY}" font-size="12">${logoStr}</text>` : ""}
  <text x="${labelTextX}" y="${textY}" fill="#fff" font-family="${FONT_FAMILY}" font-size="12" text-anchor="middle">${escapeXml(label)}</text>
  <!-- progress bar background -->
  <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="${barRx}" fill="rgba(255,255,255,0.25)"/>
  <!-- progress bar fill -->
  <rect x="${barX}" y="${barY}" width="${fillW}" height="${barH}" rx="${barRx}" fill="#fff"/>
  <!-- percentage text -->
  <text x="${barX + barW + 6}" y="${textY}" fill="#fff" font-family="${FONT_FAMILY}" font-size="11" text-anchor="start">${percentText}</text>
</svg>`;
}

function buildVersionBadge(
  value: string,
  color: string,
  style: BadgeStyle,
): string {
  const h = style === "rounded" ? HEIGHT_ROUNDED : HEIGHT_FLAT;
  const rx = style === "rounded" ? h / 2 : 4;
  const w = sectionWidth(value, false);
  const textY = Math.round(h * 0.67);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="#${color}" rx="${rx}"/>
  <text x="${w / 2}" y="${textY}" fill="#fff" font-family="${FONT_FAMILY}" font-size="12" text-anchor="middle">${escapeXml(value)}</text>
</svg>`;
}

export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const type = (sp.get("type") || "status") as BadgeType;
  const label = sp.get("label") || "상태";
  const value = sp.get("value") || "활성";
  const color = sp.get("color") || "22C55E";
  const labelColor = sp.get("labelColor") || "555555";
  const logo = sp.get("logo") || "";
  const style = (sp.get("style") || "flat") as BadgeStyle;
  const percent = Math.min(100, Math.max(0, Number(sp.get("percent")) || 0));

  let svg: string;

  switch (type) {
    case "progress":
      svg = buildProgressBadge(label, percent, color, labelColor, logo, style);
      break;
    case "version":
      svg = buildVersionBadge(value, color, style);
      break;
    case "status":
    default:
      svg = buildStatusBadge(label, value, color, labelColor, logo, style);
      break;
  }

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
