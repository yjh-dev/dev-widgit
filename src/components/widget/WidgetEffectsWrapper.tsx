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

interface Props {
  config: WidgetEffectConfig;
  /** widget의 borderRadius (URL의 radius 파라미터). 효과 레이어에 동일한 radius 적용 */
  borderRadius?: number;
  children: ReactNode;
}

/**
 * 위젯 렌더링 페이지에서 시각 효과를 적용하는 래퍼.
 * 효과가 없으면 패스스루한다.
 *
 * shadow/neon/glow → 외부 컨테이너에 padding을 줘서 shadow가 viewport 내에 보이게 함
 * glass/gradient  → content bg를 강제 투명화하고 underlay 레이어를 노출
 */
export default function WidgetEffectsWrapper({ config, borderRadius = 16, children }: Props) {
  if (!hasActiveEffects(config)) {
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
        <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
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
