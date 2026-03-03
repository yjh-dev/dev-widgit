"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CounterPreview from "@/components/widget/CounterPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useCounterStore } from "@/store/useCounterStore";
import { counterPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateCounterPage() {
  const {
    label, initial, step, min, max, showReset,
    color, btnColor, font, bg, transparentBg,
    borderRadius, padding, fontSize,
    setLabel, setInitial, setStep, setMin, setMax, setShowReset,
    setColor, setBtnColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useCounterStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("label") && { label: p.get("label")! }),
      ...(p.has("initial") && { initial: Number(p.get("initial")) }),
      ...(p.has("step") && { step: Number(p.get("step")) }),
      ...(p.has("min") && { min: p.get("min")! }),
      ...(p.has("max") && { max: p.get("max")! }),
      ...(p.has("showReset") && { showReset: p.get("showReset") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("btnColor") && { btnColor: p.get("btnColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const minNum = min !== "" ? Number(min) : undefined;
  const maxNum = max !== "" ? Number(max) : undefined;

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/counter`;
    const params = new URLSearchParams();
    if (label !== "카운터") params.set("label", label);
    if (initial !== 0) params.set("initial", String(initial));
    if (step !== 1) params.set("step", String(step));
    if (min !== "") params.set("min", min);
    if (max !== "") params.set("max", max);
    if (!showReset) params.set("showReset", "false");
    if (color !== "1E1E1E") params.set("color", color);
    if (btnColor !== "2563EB") params.set("btnColor", btnColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [label, initial, step, min, max, showReset, color, btnColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="카운터 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={counterPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="label">라벨</Label>
                      <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="카운터" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="initial">초기값</Label>
                      <Input id="initial" type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="step">증가 단위</Label>
                      <Input
                        id="step" type="number" min={1} max={100}
                        value={step}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 1 && v <= 100) setStep(v);
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
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {GENERAL_FONT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min">최소값 (비우면 제한 없음)</Label>
                      <Input
                        id="min" type="number"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        placeholder="제한 없음"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max">최대값 (비우면 제한 없음)</Label>
                      <Input
                        id="max" type="number"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        placeholder="제한 없음"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showReset">리셋 버튼</Label>
                      <Switch id="showReset" checked={showReset} onCheckedChange={setShowReset} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="글자 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
                    <ColorPicker id="btnColor" label="버튼 색상" value={btnColor} onChange={setBtnColor} placeholder="2563EB" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useCounterStore.setState(c)} />
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
              <CounterPreview
              label={label} initial={initial} step={step} min={minNum} max={maxNum}
              showReset={showReset} color={color} btnColor={btnColor} font={font} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize} persist={false}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
