"use client";

import type { ReactNode } from "react";
import {
  type WidgetEffectConfig,
  hasActiveEffects,
  buildGradientCSS,
  buildGlassStyles,
  buildNeonStyles,
  buildGlowShadow,
  buildBoxShadow,
} from "@/lib/widget-effects";
import type { TextShadowKey, BorderWidthKey, OpacityKey, LetterSpacingKey } from "@/lib/common-widget-options";
import { TEXT_SHADOW_CSS, BORDER_WIDTH_CSS, LETTER_SPACING_CSS } from "@/lib/common-widget-options";

export interface ExtraStyleConfig {
  tshadow: TextShadowKey;
  bw: BorderWidthKey;
  bc: string;
  opacity: OpacityKey;
  ls: LetterSpacingKey;
}

interface Props {
  config: WidgetEffectConfig;
  /** widget의 borderRadius (URL의 radius 파라미터). 효과 레이어에 동일한 radius 적용 */
  borderRadius?: number;
  extraStyle?: ExtraStyleConfig;
  children: ReactNode;
}

/**
 * 위젯 렌더링 페이지에서 시각 효과를 적용하는 래퍼.
 * 효과가 없으면 패스스루한다.
 *
 * shadow/neon/glow → 외부 컨테이너에 padding을 줘서 shadow가 viewport 내에 보이게 함
 * glass/gradient  → content bg를 강제 투명화하고 underlay 레이어를 노출
 */
export default function WidgetEffectsWrapper({ config, borderRadius = 16, extraStyle, children }: Props) {
  const hasExtra = extraStyle && (
    extraStyle.tshadow !== "none" ||
    extraStyle.bw !== "none" ||
    extraStyle.opacity !== "100" ||
    extraStyle.ls !== "normal"
  );

  if (!hasActiveEffects(config) && !hasExtra) {
    return <>{children}</>;
  }

  const { fx, fxInt, gbg, gbgDir, neonColor, bshadow } = config;

  const gbgColors = gbg ? gbg.split("|").filter(Boolean) : [];
  const hasGradientBg = gbgColors.length >= 2;
  const hasGlass = fx === "glass";
  const hasNeon = fx === "neon";
  const hasGlow = fx === "glow";

  // shadow 계열 효과가 있으면 padding이 필요 (viewport 밖으로 잘리지 않도록)
  const hasOuterShadow = hasNeon || hasGlow || bshadow !== "none";

  // Build combined box-shadow for the inner card
  const shadows: string[] = [];
  if (hasNeon) {
    const neonStyles = buildNeonStyles(neonColor, fxInt);
    if (neonStyles.boxShadow) shadows.push(neonStyles.boxShadow as string);
  }
  if (hasGlow) {
    shadows.push(buildGlowShadow(neonColor, fxInt));
  }
  if (bshadow !== "none") {
    shadows.push(buildBoxShadow(bshadow));
  }

  // Inner card style (shadow, border, border-radius)
  const cardStyle: React.CSSProperties = {
    borderRadius,
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: "100%",
  };
  if (shadows.length > 0) {
    cardStyle.boxShadow = shadows.join(", ");
  }
  if (hasNeon) {
    const neonStyles = buildNeonStyles(neonColor, fxInt);
    cardStyle.border = neonStyles.border;
  }

  // Extra style: border
  if (extraStyle && extraStyle.bw !== "none") {
    const bwCss = BORDER_WIDTH_CSS[extraStyle.bw];
    if (!hasNeon) {
      cardStyle.border = `${bwCss} solid #${extraStyle.bc || "D1D5DB"}`;
    }
  }

  // Extra style: opacity
  if (extraStyle && extraStyle.opacity !== "100") {
    cardStyle.opacity = Number(extraStyle.opacity) / 100;
  }

  // Glass overlay styles
  const glassStyles = hasGlass ? { ...buildGlassStyles(fxInt), borderRadius } : {};

  // Gradient background
  const gradientCss = hasGradientBg ? buildGradientCSS(gbgColors, gbgDir) : "";

  // When glass or gradient is active, make child bg transparent
  const needsBgOverride = hasGlass || hasGradientBg;

  // Outer wrapper: padding when shadow effects need breathing room
  const outerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: hasOuterShadow ? 16 : 0,
    boxSizing: "border-box",
  };

  // Content style: textShadow + letterSpacing (CSS inherited → propagates to all text children)
  const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    height: "100%",
  };
  if (extraStyle) {
    if (extraStyle.tshadow !== "none") {
      contentStyle.textShadow = TEXT_SHADOW_CSS[extraStyle.tshadow];
    }
    if (extraStyle.ls !== "normal") {
      contentStyle.letterSpacing = LETTER_SPACING_CSS[extraStyle.ls];
    }
  }

  return (
    <div style={outerStyle}>
      <div style={cardStyle}>
        {/* Gradient underlay */}
        {gradientCss && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background: gradientCss,
              borderRadius,
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
              ...glassStyles,
            }}
          />
        )}

        {/* Content */}
        <div style={contentStyle}>
          {needsBgOverride && (
            <style>{`
              .wfx-bg-override > * {
                background-color: transparent !important;
                background: transparent !important;
              }
            `}</style>
          )}
          <div className={needsBgOverride ? "wfx-bg-override" : undefined} style={{ width: "100%", height: "100%" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
