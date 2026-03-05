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
import GpaCalculatorPreview from "@/components/widget/GpaCalculatorPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useGpaCalculatorStore } from "@/store/useGpaCalculatorStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { GpaStyle, GpaScale } from "@/lib/gpa-calculator";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";

const SCALE_OPTIONS: { value: GpaScale; label: string }[] = [
  { value: "4.5", label: "4.5 만점" },
  { value: "4.3", label: "4.3 만점" },
  { value: "4.0", label: "4.0 만점" },
];

export default function CreateGpaCalculatorPage() {
  const {
    current, max, target, scale, style,
    color, textColor, font, bg, transparentBg,
    borderRadius, padding, fontSize,
    setCurrent, setMax, setTarget, setScale, setStyle,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useGpaCalculatorStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("current") && { current: Number(p.get("current")) }),
      ...(p.has("max") && { max: Number(p.get("max")) }),
      ...(p.has("target") && { target: Number(p.get("target")) }),
      ...(p.has("scale") && { scale: p.get("scale") as GpaScale }),
      ...(p.has("style") && { style: p.get("style") as GpaStyle }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const handleScaleChange = (v: GpaScale) => {
    const newMax = Number(v);
    setScale(v);
    setMax(newMax);
    setTarget(newMax);
    if (current > newMax) setCurrent(newMax);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/gpa-calculator`;
    const params = new URLSearchParams();
    if (current !== 3.5) params.set("current", String(current));
    if (max !== 4.5) params.set("max", String(max));
    if (target !== max) params.set("target", String(target));
    if (style !== "ring") params.set("style", style);
    if (color !== "6366F1") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [current, max, target, style, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="학점 계산기 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>학점 체계</Label>
                      <Select value={scale} onValueChange={(v) => handleScaleChange(v as GpaScale)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {SCALE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current">현재 학점</Label>
                      <Input
                        id="current" type="number" min={0} max={max} step={0.01}
                        value={current}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0 && v <= max) setCurrent(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">목표 학점</Label>
                      <Input
                        id="target" type="number" min={0} max={max} step={0.01}
                        value={target}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0 && v <= max) setTarget(v);
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
                      <Label>프로그레스 스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as GpaStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ring">링</SelectItem>
                          <SelectItem value="bar">바</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="프로그레스 색상" value={color} onChange={setColor} placeholder="6366F1" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 프로그레스 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useGpaCalculatorStore.setState(c)} />
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
              <GpaCalculatorPreview
                current={current} max={max} target={target}
                style={style} color={color} textColor={textColor}
                font={font} bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
                padding={padding} fontSize={fontSize}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
