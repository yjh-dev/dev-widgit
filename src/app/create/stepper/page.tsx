"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import StepperPreview from "@/components/widget/StepperPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useStepperStore } from "@/store/useStepperStore";
import { stepperPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import {
  serializeSteps,
  deserializeSteps,
  type StepperLayout,
} from "@/lib/stepper";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams, addExtraStyleParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateStepperPage() {
  const {
    steps, currentStep, layout, showDesc, showNumbers,
    color, completedColor, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    updateStep, addStep, removeStep,
    setCurrentStep, setLayout, setShowDesc, setShowNumbers,
    setColor, setCompletedColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useStepperStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("steps") && { steps: deserializeSteps(p.get("steps")!) }),
      ...(p.has("current") && { currentStep: Number(p.get("current")) }),
      ...(p.has("layout") && { layout: p.get("layout") as StepperLayout }),
      ...(p.has("showDesc") && { showDesc: p.get("showDesc") !== "false" }),
      ...(p.has("showNumbers") && { showNumbers: p.get("showNumbers") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("completedColor") && { completedColor: p.get("completedColor")! }),
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
    const base = `${window.location.origin}/widget/stepper`;
    const params = new URLSearchParams();
    if (steps.length > 0) params.set("steps", serializeSteps(steps));
    if (currentStep !== 1) params.set("current", String(currentStep));
    if (layout !== "horizontal") params.set("layout", layout);
    if (!showDesc) params.set("showDesc", "false");
    if (!showNumbers) params.set("showNumbers", "false");
    if (color !== "2563EB") params.set("color", color);
    if (completedColor !== "22C55E") params.set("completedColor", completedColor);
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
  }, [steps, currentStep, layout, showDesc, showNumbers, color, completedColor, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const handleAddStep = () => {
    if (steps.length >= 8) return;
    addStep({ label: `단계 ${steps.length + 1}`, desc: "" });
  };

  return (
    <EditorLayout title="단계 진행 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={stepperPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>단계 목록</Label>
                      {steps.map((step, i) => (
                        <div key={i} className="space-y-1 p-2 rounded bg-muted">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}</span>
                            <Input
                              value={step.label}
                              onChange={(e) => updateStep(i, { ...step, label: e.target.value })}
                              placeholder="단계 이름"
                              className="flex-1"
                            />
                            {steps.length > 2 && (
                              <button
                                type="button"
                                onClick={() => removeStep(i)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <Input
                            value={step.desc || ""}
                            onChange={(e) => updateStep(i, { ...step, desc: e.target.value })}
                            placeholder="설명 (선택)"
                            className="ml-6"
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddStep}
                      disabled={steps.length >= 8}
                      className="w-full"
                    >
                      단계 추가 (최대 8개)
                    </Button>
                    <div className="space-y-2">
                      <Label htmlFor="currentStep">현재 단계 (0 = 시작 전)</Label>
                      <Input
                        id="currentStep"
                        type="number"
                        min={0}
                        max={steps.length}
                        value={currentStep}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0 && v <= steps.length) setCurrentStep(v);
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
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as StepperLayout)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="horizontal">가로</SelectItem>
                          <SelectItem value="vertical">세로</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDesc">설명 표시</Label>
                      <Switch id="showDesc" checked={showDesc} onCheckedChange={setShowDesc} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showNumbers">번호 표시</Label>
                      <Switch id="showNumbers" checked={showNumbers} onCheckedChange={setShowNumbers} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="진행 중 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="completedColor" label="완료 색상" value={completedColor} onChange={setCompletedColor} placeholder="22C55E" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useStepperStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[120px]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <StepperPreview
              steps={steps} currentStep={currentStep} layout={layout}
              showDesc={showDesc} showNumbers={showNumbers}
              color={color} completedColor={completedColor} textColor={textColor}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
