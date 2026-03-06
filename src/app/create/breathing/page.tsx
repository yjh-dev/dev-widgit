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
import BreathingPreview from "@/components/widget/BreathingPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useBreathingStore } from "@/store/useBreathingStore";
import { breathingPresets } from "@/lib/presets";
import { TECHNIQUES } from "@/lib/breathing";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import type { BreathingTechnique } from "@/lib/breathing";

export default function CreateBreathingPage() {
  const {
    technique, inhale, hold1, exhale, hold2, rounds, showGuide,
    accentColor, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTechnique, setInhale, setHold1, setExhale, setHold2, setRounds, setShowGuide,
    setAccentColor, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useBreathingStore();

  const applyTechnique = (tech: BreathingTechnique) => {
    setTechnique(tech);
    const info = TECHNIQUES[tech];
    if (tech !== "custom" && info) {
      setInhale(info.phases[0]?.duration ?? 4);
      setHold1(info.phases[1]?.duration ?? 0);
      setExhale(info.phases[2]?.duration ?? 4);
      setHold2(info.phases[3]?.duration ?? 0);
    }
  };

  useInitFromUrl((p) => {
    const tech = (p.get("tech") || "478") as BreathingTechnique;
    const techInfo = TECHNIQUES[tech] || TECHNIQUES["478"];
    loadPreset({
      technique: tech,
      inhale: p.has("in") ? Number(p.get("in")) : techInfo.phases[0]?.duration ?? 4,
      hold1: p.has("h1") ? Number(p.get("h1")) : techInfo.phases[1]?.duration ?? 0,
      exhale: p.has("ex") ? Number(p.get("ex")) : techInfo.phases[2]?.duration ?? 4,
      hold2: p.has("h2") ? Number(p.get("h2")) : techInfo.phases[3]?.duration ?? 0,
      ...(p.has("rounds") && { rounds: Number(p.get("rounds")) }),
      ...(p.has("guide") && { showGuide: p.get("guide") !== "false" }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
      ...parseCommonParams(p),
    });
  });

  const defaults = TECHNIQUES[technique] || TECHNIQUES["478"];
  const defInhale = defaults.phases[0]?.duration ?? 4;
  const defHold1 = defaults.phases[1]?.duration ?? 0;
  const defExhale = defaults.phases[2]?.duration ?? 4;
  const defHold2 = defaults.phases[3]?.duration ?? 0;

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/breathing`;
    const params = new URLSearchParams();
    if (technique !== "478") params.set("tech", technique);
    if (inhale !== defInhale) params.set("in", String(inhale));
    if (hold1 !== defHold1) params.set("h1", String(hold1));
    if (exhale !== defExhale) params.set("ex", String(exhale));
    if (hold2 !== defHold2) params.set("h2", String(hold2));
    if (rounds !== 3) params.set("rounds", String(rounds));
    if (!showGuide) params.set("guide", "false");
    if (accentColor !== "06B6D4") params.set("accent", accentColor);
    if (color !== "1E1E1E") params.set("color", color);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [technique, inhale, hold1, exhale, hold2, rounds, showGuide, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="호흡 타이머 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={breathingPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "호흡법 설정",
                children: (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>호흡법</Label>
                      <Select value={technique} onValueChange={(v) => applyTechnique(v as BreathingTechnique)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="478">4-7-8 호흡</SelectItem>
                          <SelectItem value="box">박스 호흡 (4-4-4-4)</SelectItem>
                          <SelectItem value="22">2-2 호흡 (간단)</SelectItem>
                          <SelectItem value="custom">커스텀</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {TECHNIQUES[technique]?.desc}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="inhale">들이쉬기 (초)</Label>
                        <Input id="inhale" type="number" min={1} max={20} value={inhale} onChange={(e) => setInhale(Math.max(1, Math.min(20, Number(e.target.value))))} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="hold1">참기 1 (초)</Label>
                        <Input id="hold1" type="number" min={0} max={20} value={hold1} onChange={(e) => setHold1(Math.max(0, Math.min(20, Number(e.target.value))))} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="exhale">내쉬기 (초)</Label>
                        <Input id="exhale" type="number" min={1} max={20} value={exhale} onChange={(e) => setExhale(Math.max(1, Math.min(20, Number(e.target.value))))} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="hold2">참기 2 (초)</Label>
                        <Input id="hold2" type="number" min={0} max={20} value={hold2} onChange={(e) => setHold2(Math.max(0, Math.min(20, Number(e.target.value))))} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rounds">라운드 수</Label>
                      <Input id="rounds" type="number" min={1} max={20} value={rounds} onChange={(e) => setRounds(Math.max(1, Math.min(20, Number(e.target.value))))} />
                    </div>
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showGuide">가이드 표시</Label>
                    <Switch id="showGuide" checked={showGuide} onCheckedChange={setShowGuide} />
                  </div>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="강조 색상" value={accentColor} onChange={setAccentColor} placeholder="06B6D4" />
                    <ColorPicker id="color" label="글자 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useBreathingStore.setState(c)} />
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
              <BreathingPreview
              inhale={inhale} hold1={hold1} exhale={exhale} hold2={hold2}
              rounds={rounds} showGuide={showGuide}
              accentColor={accentColor} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
