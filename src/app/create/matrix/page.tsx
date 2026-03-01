"use client";

import { useState } from "react";
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
import MatrixPreview from "@/components/widget/MatrixPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useMatrixStore } from "@/store/useMatrixStore";
import { matrixPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import {
  serializeItems,
  deserializeItems,
  serializeLabels,
  deserializeLabels,
  DEFAULT_LABELS,
  QUADRANT_COLORS,
} from "@/lib/matrix";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

const QUADRANT_NAMES = ["긴급+중요 (좌상)", "중요+비긴급 (우상)", "긴급+비중요 (좌하)", "비긴급+비중요 (우하)"];

export default function CreateMatrixPage() {
  const {
    items, labels, showLabels, showAxes, axisX, axisY,
    color0, color1, color2, color3, textColor,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    addItem, removeItem,
    setLabel, setShowLabels, setShowAxes, setAxisX, setAxisY,
    setColor0, setColor1, setColor2, setColor3, setTextColor,
    setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    loadPreset, reset,
  } = useMatrixStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("items") && { items: deserializeItems(p.get("items")!) }),
      ...(p.has("labels") && { labels: deserializeLabels(p.get("labels")!) || [...DEFAULT_LABELS] as [string, string, string, string] }),
      ...(p.has("showLabels") && { showLabels: p.get("showLabels") !== "false" }),
      ...(p.has("showAxes") && { showAxes: p.get("showAxes") !== "false" }),
      ...(p.has("axisX") && { axisX: p.get("axisX")! }),
      ...(p.has("axisY") && { axisY: p.get("axisY")! }),
      ...(p.has("color0") && { color0: p.get("color0")! }),
      ...(p.has("color1") && { color1: p.get("color1")! }),
      ...(p.has("color2") && { color2: p.get("color2")! }),
      ...(p.has("color3") && { color3: p.get("color3")! }),
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

  const [newText, setNewText] = useState("");
  const [newQuadrant, setNewQuadrant] = useState<string>("0");

  const handleAdd = () => {
    if (!newText.trim()) return;
    if (items.length >= 16) {
      toast.error("항목은 최대 16개까지 추가할 수 있습니다.");
      return;
    }
    addItem({ text: newText.trim(), quadrant: Number(newQuadrant) as 0 | 1 | 2 | 3 });
    setNewText("");
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/matrix`;
    const params = new URLSearchParams();
    if (items.length > 0) params.set("items", serializeItems(items));
    const defaultLabels = DEFAULT_LABELS;
    if (labels.some((l, i) => l !== defaultLabels[i])) params.set("labels", serializeLabels(labels));
    if (!showLabels) params.set("showLabels", "false");
    if (!showAxes) params.set("showAxes", "false");
    if (axisX !== "긴급도") params.set("axisX", axisX);
    if (axisY !== "중요도") params.set("axisY", axisY);
    if (color0 !== QUADRANT_COLORS[0]) params.set("color0", color0);
    if (color1 !== QUADRANT_COLORS[1]) params.set("color1", color1);
    if (color2 !== QUADRANT_COLORS[2]) params.set("color2", color2);
    if (color3 !== QUADRANT_COLORS[3]) params.set("color3", color3);
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
  }, [items, labels, showLabels, showAxes, axisX, axisY, color0, color1, color2, color3, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="매트릭스 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={matrixPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    {/* Add item */}
                    <div className="space-y-2">
                      <Label htmlFor="newText">항목 텍스트</Label>
                      <Input
                        id="newText"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="예: 프로젝트 마감"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAdd();
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>사분면</Label>
                      <Select value={newQuadrant} onValueChange={setNewQuadrant}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {QUADRANT_NAMES.map((name, i) => (
                            <SelectItem key={i} value={String(i)}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAdd}
                      disabled={!newText.trim() || items.length >= 16}
                      className="w-full"
                    >
                      항목 추가 ({items.length}/16)
                    </Button>
                    {items.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <Label className="text-xs opacity-50">등록된 항목</Label>
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-1 px-2 rounded bg-muted">
                            <span>
                              <span
                                className="inline-block w-2 h-2 rounded-full mr-1.5"
                                style={{ backgroundColor: `#${[color0, color1, color2, color3][item.quadrant]}` }}
                              />
                              {item.text}
                              <span className="text-xs text-muted-foreground ml-1">
                                ({QUADRANT_NAMES[item.quadrant].split(" ")[0]})
                              </span>
                            </span>
                            <button type="button" onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quadrant labels */}
                    <div className="space-y-2 mt-4">
                      <Label className="text-xs opacity-50">사분면 라벨</Label>
                      {labels.map((label, i) => (
                        <div key={i} className="space-y-1">
                          <Label htmlFor={`label-${i}`} className="text-xs">{QUADRANT_NAMES[i]}</Label>
                          <Input
                            id={`label-${i}`}
                            value={label}
                            onChange={(e) => setLabel(i, e.target.value)}
                            placeholder={DEFAULT_LABELS[i]}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Axis labels */}
                    <div className="space-y-2 mt-4">
                      <Label className="text-xs opacity-50">축 라벨</Label>
                      <div className="space-y-1">
                        <Label htmlFor="axisX" className="text-xs">X축 (가로)</Label>
                        <Input id="axisX" value={axisX} onChange={(e) => setAxisX(e.target.value)} placeholder="긴급도" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="axisY" className="text-xs">Y축 (세로)</Label>
                        <Input id="axisY" value={axisY} onChange={(e) => setAxisY(e.target.value)} placeholder="중요도" />
                      </div>
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
                      <Label htmlFor="showLabels">사분면 라벨 표시</Label>
                      <Switch id="showLabels" checked={showLabels} onCheckedChange={setShowLabels} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showAxes">축 라벨 표시</Label>
                      <Switch id="showAxes" checked={showAxes} onCheckedChange={setShowAxes} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color0" label="긴급+중요 색상" value={color0} onChange={setColor0} placeholder={QUADRANT_COLORS[0]} />
                    <ColorPicker id="color1" label="중요+비긴급 색상" value={color1} onChange={setColor1} placeholder={QUADRANT_COLORS[1]} />
                    <ColorPicker id="color2" label="긴급+비중요 색상" value={color2} onChange={setColor2} placeholder={QUADRANT_COLORS[2]} />
                    <ColorPicker id="color3" label="비긴급+비중요 색상" value={color3} onChange={setColor3} placeholder={QUADRANT_COLORS[3]} />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useMatrixStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[300px]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
            >
              <MatrixPreview
              items={items} labels={labels} showLabels={showLabels}
              showAxes={showAxes} axisX={axisX} axisY={axisY}
              color0={color0} color1={color1} color2={color2} color3={color3}
              textColor={textColor} bg={bg} transparentBg={transparentBg}
              borderRadius={borderRadius} padding={padding} fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
