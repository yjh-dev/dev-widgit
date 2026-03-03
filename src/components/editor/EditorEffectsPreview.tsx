"use client";

import type { ReactNode } from "react";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";
import {
  buildGradientCSS,
  buildGlassStyles,
  buildNeonStyles,
} from "@/lib/widget-effects";
import type { TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey } from "@/lib/common-widget-options";
import { TEXT_SHADOW_CSS, BORDER_WIDTH_CSS, LETTER_SPACING_CSS } from "@/lib/common-widget-options";

interface Props {
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;
  borderRadius: number;
  tshadow?: TextShadowKey;
  bw?: BorderWidthKey;
  bc?: string;
  opacity?: OpacityKey;
  ls?: LetterSpacingKey;
  children: ReactNode;
}

/**
 * 에디터 미리보기에서 시각 효과를 보여주는 래퍼.
 * overflow-hidden 컨테이너 안에서도 보이는 효과만 적용한다:
 * - glass: backdrop-filter + 반투명 배경
 * - neon: 테두리 + inset glow
 * - gradient bg: underlay
 * (외부 box-shadow는 에디터에서 잘리므로 생략, 실제 위젯에서만 표시)
 */
export default function EditorEffectsPreview({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fx, fxInt, gbg, gbgDir, neonColor, bshadow: _bshadow, borderRadius,
  tshadow = "none", bw = "none", bc = "D1D5DB", opacity = "100", ls = "normal",
  children,
}: Props) {
  const gbgColors = gbg ? gbg.split("|").filter(Boolean) : [];
  const hasGradientBg = gbgColors.length >= 2;
  const hasGlass = fx === "glass";
  const hasNeon = fx === "neon";
  const hasGlow = fx === "glow";
  const hasExtraStyle = tshadow !== "none" || bw !== "none" || opacity !== "100" || ls !== "normal";
  const hasAnyEffect = fx !== "none" || hasGradientBg || hasExtraStyle;

  if (!hasAnyEffect) {
    return <>{children}</>;
  }

  const gradientCss = hasGradientBg ? buildGradientCSS(gbgColors, gbgDir) : "";
  const needsBgOverride = hasGlass || hasGradientBg;

  // Inner card style
  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius,
    overflow: "hidden",
  };

  if (hasNeon) {
    const neonStyles = buildNeonStyles(neonColor, fxInt);
    cardStyle.border = neonStyles.border;
    // Inset glow so it's visible within overflow-hidden
    cardStyle.boxShadow = (neonStyles.boxShadow as string)
      .split(",")
      .map((s) => `inset ${s.trim()}`)
      .join(", ");
  }

  if (hasGlow) {
    // Show as subtle inset glow in editor
    const c = neonColor || "6366F1";
    cardStyle.boxShadow = `inset 0 0 20px rgba(${hexToRgb(c)},0.2)`;
  }

  // Extra style: border
  if (bw !== "none" && !hasNeon) {
    cardStyle.border = `${BORDER_WIDTH_CSS[bw]} solid #${bc}`;
  }

  // Extra style: opacity
  if (opacity !== "100") {
    cardStyle.opacity = Number(opacity) / 100;
  }

  // Content style: textShadow + letterSpacing
  const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    height: "100%",
  };
  if (tshadow !== "none") {
    contentStyle.textShadow = TEXT_SHADOW_CSS[tshadow];
  }
  if (ls !== "normal") {
    contentStyle.letterSpacing = LETTER_SPACING_CSS[ls];
  }

  return (
    <div style={cardStyle}>
      {/* Gradient underlay */}
      {gradientCss && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: gradientCss,
          }}
        />
      )}

      {/* Glass layer */}
      {hasGlass && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            ...buildGlassStyles(fxInt),
          }}
        />
      )}

      {/* Content */}
      <div style={contentStyle}>
        {needsBgOverride && (
          <style>{`
            .wfx-editor-override > * {
              background-color: transparent !important;
              background: transparent !important;
            }
          `}</style>
        )}
        <div className={needsBgOverride ? "wfx-editor-override" : undefined} style={{ width: "100%", height: "100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}
