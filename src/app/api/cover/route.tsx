import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

type CoverType = "gradient" | "pattern" | "text" | "solid";
type PatternType = "dots" | "grid" | "diagonal" | "waves";
type PatternScale = "sm" | "md" | "lg";
type TextAlign = "left" | "center" | "right";

const PATTERN_SIZES: Record<PatternScale, number> = { sm: 16, md: 24, lg: 36 };

function parseColors(raw: string | null, fallback: string[]): string[] {
  if (!raw) return fallback;
  const colors = raw.split("|").map((c) => c.replace(/^#/, ""));
  return colors.length >= 1 ? colors.slice(0, 4) : fallback;
}

function buildGradient(colors: string[], dir: number): string {
  const stops = colors.map((c) => `#${c}`).join(", ");
  return `linear-gradient(${dir}deg, ${stops})`;
}

function buildPatternSvg(
  pattern: PatternType,
  color: string,
  scale: PatternScale,
): string {
  const size = PATTERN_SIZES[scale];
  const hex = `#${color}`;
  let svg = "";

  switch (pattern) {
    case "dots": {
      const r = Math.max(size / 8, 1.5);
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${hex}" opacity="0.35"/></svg>`;
      break;
    }
    case "grid": {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M${size} 0L${size} ${size}M0 ${size}L${size} ${size}" stroke="${hex}" stroke-width="0.8" opacity="0.25"/></svg>`;
      break;
    }
    case "diagonal": {
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M0 ${size}L${size} 0M-${size / 4} ${size / 4}L${size / 4} -${size / 4}M${(size * 3) / 4} ${size + size / 4}L${size + size / 4} ${(size * 3) / 4}" stroke="${hex}" stroke-width="1" opacity="0.25"/></svg>`;
      break;
    }
    case "waves": {
      const h = size;
      const w = size * 2;
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><path d="M0 ${h / 2}Q${w / 4} 0 ${w / 2} ${h / 2}Q${(w * 3) / 4} ${h} ${w} ${h / 2}" fill="none" stroke="${hex}" stroke-width="1" opacity="0.3"/></svg>`;
      break;
    }
  }

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function resolveAlign(align: TextAlign): string {
  switch (align) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    default:
      return "center";
  }
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const type = (sp.get("type") || "gradient") as CoverType;
  const colors = parseColors(sp.get("colors"), ["6366F1", "EC4899"]);
  const dir = Math.min(360, Math.max(0, Number(sp.get("dir")) || 135));
  const text = sp.get("text") || "";
  const subtitle = sp.get("subtitle") || "";
  const textColor = sp.get("textColor") || "FFFFFF";
  const pattern = (sp.get("pattern") || "dots") as PatternType;
  const patternColor = sp.get("patternColor") || "";
  const patternScale = (sp.get("patternScale") || "md") as PatternScale;
  const align = (sp.get("align") || "center") as TextAlign;

  // Determine background
  let background: string;
  switch (type) {
    case "solid":
      background = `#${colors[0]}`;
      break;
    case "pattern":
      background = `#${colors[0]}`;
      break;
    case "text":
      background =
        colors.length >= 2 ? buildGradient(colors, dir) : `#${colors[0]}`;
      break;
    case "gradient":
    default:
      background = buildGradient(colors, dir);
      break;
  }

  // Pattern overlay for "pattern" type
  const effectivePatternColor =
    patternColor || (colors.length > 1 ? colors[1] : "3B82F6");
  const patternBg =
    type === "pattern"
      ? buildPatternSvg(pattern, effectivePatternColor, patternScale)
      : undefined;

  // Text alignment
  const justifyContent = resolveAlign(align);
  const textAlign = align;

  // Determine text size based on type
  const mainFontSize = type === "text" ? 80 : 64;
  const subtitleSize = type === "text" ? 36 : 28;

  const hasText = text || subtitle;

  const element = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: justifyContent,
        justifyContent: "center",
        background,
        padding: "60px 80px",
        position: "relative",
      }}
    >
      {/* Pattern overlay */}
      {patternBg && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: patternBg,
            backgroundRepeat: "repeat",
          }}
        />
      )}

      {/* Text content */}
      {hasText && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: justifyContent,
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {text && (
            <span
              style={{
                color: `#${textColor}`,
                fontSize: mainFontSize,
                fontWeight: 700,
                lineHeight: 1.3,
                textAlign,
                textShadow:
                  type === "pattern"
                    ? "0 1px 4px rgba(0,0,0,0.15)"
                    : "none",
              }}
            >
              {decodeURIComponent(text)}
            </span>
          )}
          {subtitle && (
            <span
              style={{
                color: `#${textColor}`,
                fontSize: subtitleSize,
                fontWeight: 400,
                lineHeight: 1.4,
                textAlign,
                opacity: 0.85,
                textShadow:
                  type === "pattern"
                    ? "0 1px 4px rgba(0,0,0,0.15)"
                    : "none",
              }}
            >
              {decodeURIComponent(subtitle)}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return new ImageResponse(element, {
    width: 1500,
    height: 600,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
