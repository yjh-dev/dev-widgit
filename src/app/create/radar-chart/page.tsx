"use client";

import { toast } from "sonner";
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
import { Plus, Trash2 } from "lucide-react";
import RadarChartPreview from "@/components/widget/RadarChartPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useRadarChartStore } from "@/store/useRadarChartStore";
import { radarChartPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { parseCommonParams } from "@/lib/common-params";
import { copyToClipboard } from "@/lib/clipboard";
import { serializeItems, deserializeItems, type RadarItem } from "@/lib/radar-chart";
import { addEffectParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateRadarChartPage() {
  const {
    items, showValues, showGrid, gridLevels, fillOpacity,
    color, gridColor, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setItems, setShowValues, setShowGrid, setGridLevels, setFillOpacity,
    setColor, setGridColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    loadPreset, reset,
  } = useRadarChartStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("items") && { items: deserializeItems(p.get("items")!) }),
      ...(p.has("showValues") && { showValues: p.get("showValues") !== "false" }),
      ...(p.has("showGrid") && { showGrid: p.get("showGrid") !== "false" }),
      ...(p.has("gridLevels") && { gridLevels: Number(p.get("gridLevels")) }),
      ...(p.has("fillOpacity") && { fillOpacity: Number(p.get("fillOpacity")) }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("gridColor") && { gridColor: p.get("gridColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/radar-chart`;
    const params = new URLSearchParams();
    if (items.length > 0) params.set("items", serializeItems(items));
    if (showValues) params.set("showValues", "true");
    if (!showGrid) params.set("showGrid", "false");
    if (gridLevels !== 4) params.set("gridLevels", String(gridLevels));
    if (fillOpacity !== 30) params.set("fillOpacity", String(fillOpacity));
    if (color !== "6366F1") params.set("color", color);
    if (gridColor !== "E5E7EB") params.set("gridColor", gridColor);
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
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [items, showValues, showGrid, gridLevels, fillOpacity, color, gridColor, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const updateItem = (index: number, field: keyof RadarItem, value: string | number) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    setItems(next);
  };

  const addItem = () => {
    if (items.length >= 8) {
      toast.error("최대 8개 항목까지 추가할 수 있습니다.");
      return;
    }
    setItems([...items, { label: `항목${items.length + 1}`, value: 50 }]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 3) {
      toast.error("최소 3개 항목이 필요합니다.");
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <EditorLayout title="레이더 차트 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={radarChartPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-3">
                      {items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            className="flex-1"
                            value={item.label}
                            onChange={(e) => updateItem(i, "label", e.target.value)}
                            placeholder="항목 이름"
                          />
                          <Input
                            className="w-20"
                            type="number"
                            min={0}
                            max={100}
                            value={item.value}
                            onChange={(e) => {
                              const v = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                              updateItem(i, "value", v);
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(i)}
                            disabled={items.length <= 3}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={addItem}
                      disabled={items.length >= 8}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      항목 추가 (최대 8개)
                    </Button>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showValues">값 표시</Label>
                      <Switch id="showValues" checked={showValues} onCheckedChange={setShowValues} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showGrid">격자 표시</Label>
                      <Switch id="showGrid" checked={showGrid} onCheckedChange={setShowGrid} />
                    </div>
                    {showGrid && (
                      <div className="space-y-2">
                        <Label>격자 단계 수</Label>
                        <Select value={String(gridLevels)} onValueChange={(v) => setGridLevels(Number(v))}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3단계</SelectItem>
                            <SelectItem value="4">4단계</SelectItem>
                            <SelectItem value="5">5단계</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="fillOpacity">채우기 투명도 ({fillOpacity}%)</Label>
                      <Input
                        id="fillOpacity"
                        type="number"
                        min={0}
                        max={100}
                        value={fillOpacity}
                        onChange={(e) => {
                          const v = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                          setFillOpacity(v);
                        }}
                      />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="차트 색상" value={color} onChange={setColor} placeholder="6366F1" />
                    <ColorPicker id="gridColor" label="격자 색상" value={gridColor} onChange={setGridColor} placeholder="E5E7EB" />
                    <ColorPicker id="textColor" label="라벨 색상 (비우면 차트 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useRadarChartStore.setState(c)} />
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
            >
              <RadarChartPreview
              items={items} showValues={showValues} showGrid={showGrid}
              gridLevels={gridLevels} fillOpacity={fillOpacity}
              color={color} gridColor={gridColor} textColor={textColor}
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
