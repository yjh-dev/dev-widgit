"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GradientPreview from "@/components/widget/GradientPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useGradientStore } from "@/store/useGradientStore";
import { GRADIENT_PRESETS } from "@/lib/gradient";
import { gradientPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { GradientType } from "@/lib/gradient";
import { parseCommonParams } from "@/lib/common-params";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { addCommonStyleParams, addEffectParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateGradientPage() {
  const {
    colors, dir, type, animate, speed, text, textColor,
    borderRadius, padding, fontSize,
    setColors, setDir, setType, setAnimate, setSpeed, setText, setTextColor,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    loadPreset, reset,
  } = useGradientStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("colors") && { colors: p.get("colors")!.split("|") }),
      ...(p.has("dir") && { dir: Number(p.get("dir")) }),
      ...(p.has("type") && { type: p.get("type") as GradientType }),
      ...(p.has("animate") && { animate: p.get("animate") === "true" }),
      ...(p.has("speed") && { speed: Number(p.get("speed")) }),
      ...(p.has("text") && { text: p.get("text")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...parseCommonParams(p),
    });
  });

  const handleColorChange = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const handleAddColor = () => {
    if (colors.length < 4) setColors([...colors, "F59E0B"]);
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/gradient`;
    const params = new URLSearchParams();
    const defaultColors = "6366F1|EC4899";
    const currentColors = colors.join("|");
    if (currentColors !== defaultColors) params.set("colors", currentColors);
    if (dir !== 135) params.set("dir", String(dir));
    if (type !== "linear") params.set("type", type);
    if (animate) params.set("animate", "true");
    if (animate && speed !== 10) params.set("speed", String(speed));
    if (text) params.set("text", text);
    if (text && textColor !== "FFFFFF") params.set("textColor", textColor);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    return buildUrl(base, params);
  }, [colors, dir, type, animate, speed, text, textColor, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="그라데이션 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={gradientPresets} onSelect={loadPreset} />
          {/* Gradient Presets */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-medium text-muted-foreground">프리셋</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadPreset({ colors: preset.colors, dir: preset.dir })}
                  className="h-7 px-3 rounded-md border text-xs font-medium hover:bg-accent transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      background: `linear-gradient(135deg, #${preset.colors[0]}, #${preset.colors[preset.colors.length - 1]})`,
                    }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <EditorSection
            defaultOpen={["colors"]}
            sections={[
              {
                id: "colors",
                title: "색상",
                children: (
                  <>
                    {colors.map((c, i) => (
                      <div key={i} className="flex items-end gap-2">
                        <div className="flex-1">
                          <ColorPicker
                            id={`color-${i}`}
                            label={`색상 ${i + 1}`}
                            value={c}
                            onChange={(v) => handleColorChange(i, v)}
                          />
                        </div>
                        {colors.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(i)}
                            className="text-muted-foreground hover:text-destructive shrink-0 pb-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {colors.length < 4 && (
                      <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                        색상 추가
                      </Button>
                    )}
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>그라데이션 타입</Label>
                      <Select value={type} onValueChange={(v) => setType(v as GradientType)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">선형 (Linear)</SelectItem>
                          <SelectItem value="radial">원형 (Radial)</SelectItem>
                          <SelectItem value="conic">원뿔형 (Conic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dir">방향 (각도: 0~360)</Label>
                      <Input
                        id="dir"
                        type="number"
                        min={0}
                        max={360}
                        value={dir}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0 && v <= 360) setDir(v);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animate">애니메이션</Label>
                      <Switch id="animate" checked={animate} onCheckedChange={setAnimate} />
                    </div>
                    {animate && (
                      <div className="space-y-2">
                        <Label htmlFor="speed">속도 (초: 3~30)</Label>
                        <Input
                          id="speed"
                          type="number"
                          min={3}
                          max={30}
                          value={speed}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v >= 3 && v <= 30) setSpeed(v);
                          }}
                        />
                      </div>
                    )}
                  </>
                ),
              },
              {
                id: "text",
                title: "오버레이 텍스트",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="text">텍스트</Label>
                      <Input
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="텍스트 입력 (선택)"
                      />
                    </div>
                    {text && (
                      <ColorPicker
                        id="textColor"
                        label="텍스트 색상"
                        value={textColor}
                        onChange={setTextColor}
                        placeholder="FFFFFF"
                      />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useGradientStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[3/1]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
            >
              <GradientPreview
              colors={colors}
              dir={dir}
              type={type}
              animate={animate}
              speed={speed}
              text={text}
              textColor={textColor}
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
