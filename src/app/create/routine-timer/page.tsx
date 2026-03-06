"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import RoutineTimerPreview from "@/components/widget/RoutineTimerPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoutineTimerStore } from "@/store/useRoutineTimerStore";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseSteps, serializeSteps } from "@/lib/routine-timer";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";

export default function CreateRoutineTimerPage() {
  const {
    steps, autoNext,
    color, textColor, font, bg, transparentBg,
    borderRadius, padding, fontSize,
    setSteps, setAutoNext,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useRoutineTimerStore();

  useInitFromUrl((p) => {
    const parsed: Record<string, unknown> = {};
    if (p.has("steps")) {
      parsed.steps = parseSteps(p.get("steps")!);
    }
    if (p.has("autoNext")) parsed.autoNext = p.get("autoNext") !== "false";
    if (p.has("color")) parsed.color = p.get("color")!;
    if (p.has("textColor")) parsed.textColor = p.get("textColor")!;
    if (p.has("font")) parsed.font = p.get("font")!;
    if (p.has("tshadow")) parsed.tshadow = p.get("tshadow")!;
    if (p.has("bw")) parsed.bw = p.get("bw")!;
    if (p.has("bc")) parsed.bc = p.get("bc")!;
    if (p.has("opacity")) parsed.opacity = p.get("opacity")!;
    if (p.has("ls")) parsed.ls = p.get("ls")!;
    loadPreset({ ...parsed, ...parseCommonParams(p) });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/routine-timer`;
    const params = new URLSearchParams();
    if (steps.length > 0) params.set("steps", serializeSteps(steps));
    if (!autoNext) params.set("autoNext", "false");
    if (color !== "2563EB") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    addBgParam(params, transparentBg, bg);
    if (font !== "sans") params.set("font", font);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [steps, autoNext, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const addStep = () => {
    setSteps([...steps, { name: "", minutes: 5 }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStepName = (index: number, name: string) => {
    setSteps(steps.map((s, i) => (i === index ? { ...s, name } : s)));
  };

  const updateStepMinutes = (index: number, value: string) => {
    setSteps(steps.map((s, i) => (i === index ? { ...s, minutes: Math.max(1, Number(value) || 1) } : s)));
  };

  return (
    <EditorLayout title="루틴 타이머 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>루틴 단계</Label>
                      <Button size="sm" variant="outline" onClick={addStep} className="gap-1">
                        <Plus className="w-3.5 h-3.5" /> 추가
                      </Button>
                    </div>
                    {steps.length > 0 ? (
                      <ul className="space-y-2">
                        {steps.map((step, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-4 shrink-0 text-center">{i + 1}</span>
                            <Input
                              value={step.name}
                              onChange={(e) => updateStepName(i, e.target.value)}
                              placeholder="단계 이름"
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              value={step.minutes}
                              onChange={(e) => updateStepMinutes(i, e.target.value)}
                              min={1}
                              className="w-16 shrink-0"
                            />
                            <span className="text-xs text-muted-foreground shrink-0">분</span>
                            <button
                              type="button"
                              onClick={() => removeStep(i)}
                              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              aria-label="삭제"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-muted-foreground">위에서 단계를 추가하세요.</p>
                    )}
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoNext">자동 다음 단계</Label>
                      <Switch id="autoNext" checked={autoNext} onCheckedChange={setAutoNext} />
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
                    <ColorPicker id="color" label="강조 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 기본)" value={textColor} onChange={setTextColor} placeholder="" />
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
                    entrance={entrance} entranceDelay={entranceDelay}
                    onEntranceChange={setEntrance} onEntranceDelayChange={setEntranceDelay}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useRoutineTimerStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <EditorEffectsPreview
        fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
        neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
        tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
      >
        <RoutineTimerPreview
          steps={steps}
          autoNext={autoNext}
          color={color}
          textColor={textColor}
          font={font}
          bg={bg}
          transparentBg={transparentBg}
          borderRadius={borderRadius}
          padding={padding}
          fontSize={fontSize}
        />
      </EditorEffectsPreview>
    </EditorLayout>
  );
}
