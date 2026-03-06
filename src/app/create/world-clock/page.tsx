"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import WorldClockPreview from "@/components/widget/WorldClockPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useWorldClockStore } from "@/store/useWorldClockStore";
import {
  WORLD_CLOCK_TIMEZONE_OPTIONS,
  serializeZones,
  serializeLabels,
  deserializeZones,
  deserializeLabels,
} from "@/lib/world-clock";
import type { WorldClockFormat } from "@/lib/world-clock";
import { CLOCK_FONT_OPTIONS } from "@/lib/fonts";
import { worldClockPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateWorldClockPage() {
  const {
    zones, labels, format, showLabel, showSeconds, showDate,
    color, textColor, font, bg, transparentBg,
    borderRadius, padding, fontSize,
    setZones, setLabels, setFormat, setShowLabel, setShowSeconds, setShowDate,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useWorldClockStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("zones") && { zones: deserializeZones(p.get("zones")!) }),
      ...(p.has("labels") && { labels: deserializeLabels(p.get("labels")!) }),
      ...(p.has("format") && { format: p.get("format") as WorldClockFormat }),
      ...(p.has("showLabel") && { showLabel: p.get("showLabel") !== "false" }),
      ...(p.has("showSec") && { showSeconds: p.get("showSec") === "true" }),
      ...(p.has("showDate") && { showDate: p.get("showDate") === "true" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
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

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/world-clock`;
    const params = new URLSearchParams();
    const defaultZones = ["Asia/Seoul", "America/New_York"];
    const zonesStr = serializeZones(zones);
    const defaultStr = serializeZones(defaultZones);
    if (zonesStr !== defaultStr) params.set("zones", zonesStr);
    const labelsStr = serializeLabels(labels);
    if (labelsStr) params.set("labels", labelsStr);
    if (format !== "24h") params.set("format", format);
    if (!showLabel) params.set("showLabel", "false");
    if (showSeconds) params.set("showSec", "true");
    if (showDate) params.set("showDate", "true");
    if (color !== "1E1E1E") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "mono") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [zones, labels, format, showLabel, showSeconds, showDate, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const addZone = () => {
    if (zones.length >= 4) return;
    const available = WORLD_CLOCK_TIMEZONE_OPTIONS.find(
      (tz) => !zones.includes(tz.value),
    );
    if (available) {
      setZones([...zones, available.value]);
      // Keep labels array in sync (pad with empty strings)
      setLabels([...labels, ""]);
    }
  };

  const removeZone = (index: number) => {
    if (zones.length <= 2) return;
    setZones(zones.filter((_, i) => i !== index));
    setLabels(labels.filter((_, i) => i !== index));
  };

  const updateZone = (index: number, value: string) => {
    const updated = [...zones];
    updated[index] = value;
    setZones(updated);
  };

  const updateLabel = (index: number, value: string) => {
    const updated = [...labels];
    while (updated.length <= index) updated.push("");
    updated[index] = value;
    setLabels(updated);
  };

  return (
    <EditorLayout title="세계 시계 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={worldClockPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>타임존 ({zones.length}/4)</Label>
                        {zones.length < 4 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={addZone}
                          >
                            <Plus className="w-3.5 h-3.5 mr-1" />
                            추가
                          </Button>
                        )}
                      </div>
                      {zones.map((tz, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Select
                              value={tz}
                              onValueChange={(v) => updateZone(idx, v)}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {WORLD_CLOCK_TIMEZONE_OPTIONS.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label} ({opt.short})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {zones.length > 2 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0"
                                onClick={() => removeZone(idx)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <Input
                            value={labels[idx] || ""}
                            onChange={(e) => updateLabel(idx, e.target.value)}
                            placeholder={`라벨 (비우면 자동: ${WORLD_CLOCK_TIMEZONE_OPTIONS.find((o) => o.value === tz)?.label ?? tz})`}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>시간 포맷</Label>
                      <Select
                        value={format}
                        onValueChange={(v) => setFormat(v as WorldClockFormat)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24시간</SelectItem>
                          <SelectItem value="12h">12시간</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="showLabel">도시 이름 표시</Label>
                      <Switch
                        id="showLabel"
                        checked={showLabel}
                        onCheckedChange={setShowLabel}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showSeconds">초 표시</Label>
                      <Switch
                        id="showSeconds"
                        checked={showSeconds}
                        onCheckedChange={setShowSeconds}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDate">날짜 표시</Label>
                      <Switch
                        id="showDate"
                        checked={showDate}
                        onCheckedChange={setShowDate}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CLOCK_FONT_OPTIONS.map((opt) => (
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
                    <ColorPicker
                      id="color"
                      label="메인 색상"
                      value={color}
                      onChange={setColor}
                      placeholder="1E1E1E"
                    />
                    <ColorPicker
                      id="textColor"
                      label="텍스트 색상 (비우면 메인 색상)"
                      value={textColor}
                      onChange={setTextColor}
                      placeholder=""
                    />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch
                        id="transparent"
                        checked={transparentBg}
                        onCheckedChange={setTransparentBg}
                      />
                    </div>
                    {!transparentBg && (
                      <ColorPicker
                        id="bg"
                        label="배경색"
                        value={bg}
                        onChange={setBg}
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
            <EditorActions
              widgetUrl={widgetUrl}
              onCopy={handleCopy}
              onReset={reset}
              onApplyTheme={(c) => useWorldClockStore.setState(c)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[2/1]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <WorldClockPreview
                zones={zones}
                labels={labels}
                format={format}
                showLabel={showLabel}
                showSeconds={showSeconds}
                showDate={showDate}
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
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
