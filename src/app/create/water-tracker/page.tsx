"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import WaterTrackerPreview from "@/components/widget/WaterTrackerPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useWaterTrackerStore } from "@/store/useWaterTrackerStore";
import { waterTrackerPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams, addExtraStyleParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateWaterTrackerPage() {
  const {
    goal, glassSize,
    color, showMl, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setGoal, setGlassSize,
    setColor, setShowMl, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useWaterTrackerStore();

  useInitFromUrl((p) => {
    const bgVal = p.get("bg");
    loadPreset({
      ...(p.has("goal") && { goal: Number(p.get("goal")) }),
      ...(p.has("glass") && { glassSize: Number(p.get("glass")) }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("showMl") && { showMl: p.get("showMl") !== "false" }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(bgVal === "transparent"
        ? { transparentBg: true }
        : bgVal
          ? { bg: bgVal, transparentBg: false }
          : {}),
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
    const base = `${window.location.origin}/widget/water-tracker`;
    const params = new URLSearchParams();
    if (goal !== 8) params.set("goal", String(goal));
    if (glassSize !== 250) params.set("glass", String(glassSize));
    if (color !== "3B82F6") params.set("color", color);
    if (!showMl) params.set("showMl", "false");
    if (textColor !== "1E1E1E") params.set("textColor", textColor);
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
  }, [goal, glassSize, color, showMl, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="물 마시기 트래커 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={waterTrackerPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="goal">목표 잔 수 (1~20)</Label>
                      <Input
                        id="goal"
                        type="number"
                        min={1}
                        max={20}
                        value={goal}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 1 && v <= 20) setGoal(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="glassSize">한 잔 용량 (ml)</Label>
                      <Input
                        id="glassSize"
                        type="number"
                        min={50}
                        max={1000}
                        step={50}
                        value={glassSize}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 50 && v <= 1000) setGlassSize(v);
                        }}
                      />
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
                      <Label htmlFor="showMl">ml 표시</Label>
                      <Switch id="showMl" checked={showMl} onCheckedChange={setShowMl} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="물방울 색상" value={color} onChange={setColor} placeholder="3B82F6" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="1E1E1E" />
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
                    borderRadius={borderRadius}
                    padding={padding}
                    fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius}
                    onPaddingChange={setPadding}
                    onFontSizeChange={setFontSize}
                    tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
                    onTshadowChange={setTshadow} onBwChange={setBw} onBcChange={setBc}
                    onOpacityChange={setOpacity} onLsChange={setLs}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useWaterTrackerStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-square">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <WaterTrackerPreview
              goal={goal}
              glassSize={glassSize}
              color={color}
              showMl={showMl}
              textColor={textColor}
              bg={bg}
              transparentBg={transparentBg}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
