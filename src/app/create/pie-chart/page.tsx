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
import PieChartPreview from "@/components/widget/PieChartPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { usePieChartStore } from "@/store/usePieChartStore";
import { pieChartPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import {
  serializeSlices,
  deserializeSlices,
  DEFAULT_COLORS,
  type PieChartStyle,
} from "@/lib/pie-chart";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreatePieChartPage() {
  const {
    slices, style, showLabels, showPercent, showLegend, innerRadius,
    textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    updateSlice, addSlice, removeSlice,
    setStyle, setShowLabels, setShowPercent, setShowLegend, setInnerRadius,
    setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    loadPreset, reset,
  } = usePieChartStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("slices") && { slices: deserializeSlices(p.get("slices")!) }),
      ...(p.has("style") && { style: p.get("style") as PieChartStyle }),
      ...(p.has("showLabels") && { showLabels: p.get("showLabels") !== "false" }),
      ...(p.has("showPercent") && { showPercent: p.get("showPercent") !== "false" }),
      ...(p.has("showLegend") && { showLegend: p.get("showLegend") !== "false" }),
      ...(p.has("innerRadius") && { innerRadius: Number(p.get("innerRadius")) }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("bg") && {
        ...(p.get("bg") === "transparent"
          ? { transparentBg: true }
          : { bg: p.get("bg")!, transparentBg: false }),
      }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/pie-chart`;
    const params = new URLSearchParams();
    if (slices.length > 0) params.set("slices", serializeSlices(slices));
    if (style !== "donut") params.set("style", style);
    if (!showLabels) params.set("showLabels", "false");
    if (!showPercent) params.set("showPercent", "false");
    if (!showLegend) params.set("showLegend", "false");
    if (innerRadius !== 60) params.set("innerRadius", String(innerRadius));
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
  }, [slices, style, showLabels, showPercent, showLegend, innerRadius, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const handleAddSlice = () => {
    if (slices.length >= 8) return;
    const nextColor = DEFAULT_COLORS[slices.length % DEFAULT_COLORS.length];
    addSlice({ label: `카테고리 ${String.fromCharCode(65 + slices.length)}`, value: 10, color: nextColor });
  };

  return (
    <EditorLayout title="도넛 차트 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={pieChartPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      {slices.map((slice, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={slice.label}
                            onChange={(e) => updateSlice(i, { ...slice, label: e.target.value })}
                            placeholder="라벨"
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            min={0}
                            value={slice.value}
                            onChange={(e) => updateSlice(i, { ...slice, value: Math.max(0, Number(e.target.value)) })}
                            className="w-20"
                          />
                          <input
                            type="color"
                            value={`#${slice.color}`}
                            onChange={(e) => updateSlice(i, { ...slice, color: e.target.value.replace("#", "") })}
                            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                          />
                          {slices.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeSlice(i)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddSlice}
                      disabled={slices.length >= 8}
                      className="w-full"
                    >
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
                    <div className="space-y-2">
                      <Label>차트 스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as PieChartStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donut">도넛</SelectItem>
                          <SelectItem value="pie">파이</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {style === "donut" && (
                      <div className="space-y-2">
                        <Label>도넛 두께 (내부 반경 %)</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={20}
                            max={85}
                            value={innerRadius}
                            onChange={(e) => setInnerRadius(Number(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground w-10 text-right">{innerRadius}%</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLabels">라벨 표시</Label>
                      <Switch id="showLabels" checked={showLabels} onCheckedChange={setShowLabels} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPercent">퍼센트 표시</Label>
                      <Switch id="showPercent" checked={showPercent} onCheckedChange={setShowPercent} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLegend">범례 표시</Label>
                      <Switch id="showLegend" checked={showLegend} onCheckedChange={setShowLegend} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => usePieChartStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
            >
              <PieChartPreview
              slices={slices} style={style}
              showLabels={showLabels} showPercent={showPercent} showLegend={showLegend}
              innerRadius={innerRadius} textColor={textColor}
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
