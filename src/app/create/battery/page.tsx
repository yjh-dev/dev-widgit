"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BatteryPreview from "@/components/widget/BatteryPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useBatteryStore } from "@/store/useBatteryStore";
import { batteryPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams, addExtraStyleParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateBatteryPage() {
  const {
    level, label, showPercent, animate, autoColor,
    color, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setLevel, setLabel, setShowPercent, setAnimate, setAutoColor,
    setColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useBatteryStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("level") && { level: Number(p.get("level")) }),
      ...(p.has("label") && { label: p.get("label")! }),
      ...(p.has("showPercent") && { showPercent: p.get("showPercent") !== "false" }),
      ...(p.has("animate") && { animate: p.get("animate") === "true" }),
      ...(p.has("autoColor") && { autoColor: p.get("autoColor") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("bg") && {
        ...(p.get("bg") === "transparent"
          ? { transparentBg: true }
          : { bg: p.get("bg")!, transparentBg: false }),
      }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/battery`;
    const params = new URLSearchParams();
    if (level !== 75) params.set("level", String(level));
    if (label) params.set("label", label);
    if (!showPercent) params.set("showPercent", "false");
    if (animate) params.set("animate", "true");
    if (!autoColor) params.set("autoColor", "false");
    if (color !== "22C55E") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [level, label, showPercent, animate, autoColor, color, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="배터리 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={batteryPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="level">배터리 잔량 (%)</Label>
                      <Input
                        id="level" type="number" min={0} max={100}
                        value={level}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0 && v <= 100) setLevel(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label">라벨</Label>
                      <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="라벨 텍스트" />
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPercent">퍼센트 표시</Label>
                      <Switch id="showPercent" checked={showPercent} onCheckedChange={setShowPercent} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animate">충전 애니메이션</Label>
                      <Switch id="animate" checked={animate} onCheckedChange={setAnimate} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoColor">자동 색상 (잔량 기반)</Label>
                      <Switch id="autoColor" checked={autoColor} onCheckedChange={setAutoColor} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    {!autoColor && (
                      <ColorPicker id="color" label="배터리 색상" value={color} onChange={setColor} placeholder="22C55E" />
                    )}
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 배터리 색상)" value={textColor} onChange={setTextColor} placeholder="" />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch id="transparent" checked={transparentBg} onCheckedChange={setTransparentBg} />
                    </div>
                    {!transparentBg && (
                      <ColorPicker id="bg" label="배경색" value={bg} onChange={setBg} placeholder="FFFFFF" />
                    )}
                  </>
                ),
              },
              {
                id: "effects",
                title: "효과",
                children: (
                  <>
                    <EffectPresetSelector onSelect={loadPreset} />
                    <EffectOptions
                      fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
                      neonColor={neonColor} bshadow={bshadow}
                      onFxChange={setFx} onFxIntChange={setFxInt}
                      onGbgChange={setGbg} onGbgDirChange={setGbgDir}
                      onNeonColorChange={setNeonColor} onBshadowChange={setBshadow}
                    />
                  </>
                ),
              },
              {
                id: "style",
                title: "스타일",
                children: (
                  <CommonStyleOptions
                    borderRadius={borderRadius} padding={padding} fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius} onPaddingChange={setPadding} onFontSizeChange={setFontSize}
                    tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
                    onTshadowChange={setTshadow} onBwChange={setBw} onBcChange={setBc}
                    onOpacityChange={setOpacity} onLsChange={setLs}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useBatteryStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <BatteryPreview
              level={level} label={label} showPercent={showPercent}
              animate={animate} autoColor={autoColor} color={color}
              textColor={textColor} bg={bg} transparentBg={transparentBg}
              borderRadius={borderRadius} padding={padding} fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
