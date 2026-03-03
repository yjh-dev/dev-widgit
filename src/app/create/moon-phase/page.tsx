"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
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
import MoonPhasePreview from "@/components/widget/MoonPhasePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useMoonPhaseStore } from "@/store/useMoonPhaseStore";
import { moonPhasePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import type { MoonStyle, MoonSize } from "@/lib/moon-phase";

export default function CreateMoonPhasePage() {
  const {
    style, showName, showPercent, showNext,
    moonColor, shadowColor, bg, transparentBg, textColor, moonSize,
    borderRadius, padding, fontSize,
    setStyle, setShowName, setShowPercent, setShowNext,
    setMoonColor, setShadowColor, setBg, setTransparentBg, setTextColor, setMoonSize,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useMoonPhaseStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...parseCommonParams(p),
      ...(p.has("style") && { style: p.get("style") as MoonStyle }),
      ...(p.has("showName") && { showName: p.get("showName") !== "false" }),
      ...(p.has("showPercent") && { showPercent: p.get("showPercent") !== "false" }),
      ...(p.has("showNext") && { showNext: p.get("showNext") === "true" }),
      ...(p.has("moonColor") && { moonColor: p.get("moonColor")! }),
      ...(p.has("shadowColor") && { shadowColor: p.get("shadowColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("moonSize") && { moonSize: p.get("moonSize") as MoonSize }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/moon-phase`;
    const params = new URLSearchParams();
    if (style !== "realistic") params.set("style", style);
    if (!showName) params.set("showName", "false");
    if (!showPercent) params.set("showPercent", "false");
    if (showNext) params.set("showNext", "true");
    if (moonColor !== "F5F5DC") params.set("moonColor", moonColor);
    if (shadowColor !== "1A1A2E") params.set("shadowColor", shadowColor);
    if (textColor !== "E0E0E0") params.set("textColor", textColor);
    addBgParam(params, transparentBg, bg, "0F172A");
    if (moonSize !== "md") params.set("moonSize", moonSize);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [style, showName, showPercent, showNext, moonColor, shadowColor, bg, transparentBg, textColor, moonSize, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="달 위상 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={moonPhasePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["display"]}
            sections={[
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as MoonStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realistic">리얼리스틱</SelectItem>
                          <SelectItem value="simple">심플</SelectItem>
                          <SelectItem value="emoji">이모지</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>달 크기</Label>
                      <Select value={moonSize} onValueChange={(v) => setMoonSize(v as MoonSize)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">작게</SelectItem>
                          <SelectItem value="md">보통</SelectItem>
                          <SelectItem value="lg">크게</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showName">위상명 표시</Label>
                      <Switch id="showName" checked={showName} onCheckedChange={setShowName} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPercent">조도% 표시</Label>
                      <Switch id="showPercent" checked={showPercent} onCheckedChange={setShowPercent} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showNext">다음 보름달 표시</Label>
                      <Switch id="showNext" checked={showNext} onCheckedChange={setShowNext} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    {style !== "emoji" && (
                      <>
                        <ColorPicker id="moonColor" label="달 색상" value={moonColor} onChange={setMoonColor} placeholder="F5F5DC" />
                        <ColorPicker id="shadowColor" label="그림자 색상" value={shadowColor} onChange={setShadowColor} placeholder="1A1A2E" />
                      </>
                    )}
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="E0E0E0" />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch id="transparent" checked={transparentBg} onCheckedChange={setTransparentBg} />
                    </div>
                    {!transparentBg && (
                      <ColorPicker id="bg" label="배경색" value={bg} onChange={setBg} placeholder="0F172A" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useMoonPhaseStore.setState(c)} />
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
              <MoonPhasePreview
              style={style}
              showName={showName}
              showPercent={showPercent}
              showNext={showNext}
              moonColor={moonColor}
              shadowColor={shadowColor}
              bg={bg}
              transparentBg={transparentBg}
              textColor={textColor}
              moonSize={moonSize}
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
