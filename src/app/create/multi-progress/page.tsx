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
import MultiProgressPreview from "@/components/widget/MultiProgressPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useMultiProgressStore } from "@/store/useMultiProgressStore";
import { multiProgressPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import {
  serializeItems,
  deserializeItems,
  DEFAULT_COLORS,
  type BarHeight,
  type ProgressLayout,
} from "@/lib/multi-progress";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams, addExtraStyleParams , addEntranceParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateMultiProgressPage() {
  const {
    items, showPercent, showValue, barHeight, layout, animated,
    textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    addItem, removeItem,
    setShowPercent, setShowValue, setBarHeight, setLayout, setAnimated,
    setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useMultiProgressStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("items") && { items: deserializeItems(p.get("items")!) }),
      ...(p.has("showPercent") && { showPercent: p.get("showPercent") !== "false" }),
      ...(p.has("showValue") && { showValue: p.get("showValue") === "true" }),
      ...(p.has("barHeight") && { barHeight: p.get("barHeight") as BarHeight }),
      ...(p.has("layout") && { layout: p.get("layout") as ProgressLayout }),
      ...(p.has("animated") && { animated: p.get("animated") === "true" }),
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
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
    });
  });

  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState(50);
  const [newMax, setNewMax] = useState(100);
  const [newColor, setNewColor] = useState(DEFAULT_COLORS[0]);

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    if (items.length >= 8) {
      toast.error("항목은 최대 8개까지 추가할 수 있습니다.");
      return;
    }
    addItem({ label: newLabel.trim(), value: newValue, max: newMax, color: newColor });
    setNewLabel("");
    setNewValue(50);
    setNewMax(100);
    setNewColor(DEFAULT_COLORS[items.length % DEFAULT_COLORS.length]);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/multi-progress`;
    const params = new URLSearchParams();
    if (items.length > 0) params.set("items", serializeItems(items));
    if (!showPercent) params.set("showPercent", "false");
    if (showValue) params.set("showValue", "true");
    if (barHeight !== "default") params.set("barHeight", barHeight);
    if (layout !== "stacked") params.set("layout", layout);
    if (animated) params.set("animated", "true");
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
    addEntranceParams(params, entrance, entranceDelay);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [items, showPercent, showValue, barHeight, layout, animated, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="멀티 프로그레스 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={multiProgressPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    {/* Add item form */}
                    <div className="space-y-2">
                      <Label htmlFor="newLabel">항목 이름</Label>
                      <Input
                        id="newLabel"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="예: 프론트엔드"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAdd();
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="newValue">현재값</Label>
                        <Input
                          id="newValue"
                          type="number"
                          min={0}
                          value={newValue}
                          onChange={(e) => setNewValue(Math.max(0, Number(e.target.value)))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newMax">최대값</Label>
                        <Input
                          id="newMax"
                          type="number"
                          min={1}
                          value={newMax}
                          onChange={(e) => setNewMax(Math.max(1, Number(e.target.value)))}
                        />
                      </div>
                    </div>
                    <ColorPicker
                      id="newColor"
                      label="바 색상"
                      value={newColor}
                      onChange={setNewColor}
                      placeholder={DEFAULT_COLORS[0]}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAdd}
                      disabled={!newLabel.trim() || items.length >= 8}
                      className="w-full"
                    >
                      항목 추가 ({items.length}/8)
                    </Button>

                    {/* Item list */}
                    {items.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <Label className="text-xs opacity-50">등록된 항목</Label>
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-1 px-2 rounded bg-muted">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="inline-block w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: `#${item.color}` }}
                              />
                              <span>{item.label}</span>
                              <span className="text-xs text-muted-foreground">
                                ({item.value}/{item.max})
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(i)}
                              disabled={items.length <= 1}
                              className="text-muted-foreground hover:text-destructive disabled:opacity-30"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPercent">퍼센트 표시</Label>
                      <Switch id="showPercent" checked={showPercent} onCheckedChange={setShowPercent} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showValue">값 표시 (현재/최대)</Label>
                      <Switch id="showValue" checked={showValue} onCheckedChange={setShowValue} />
                    </div>
                    <div className="space-y-2">
                      <Label>바 높이</Label>
                      <Select value={barHeight} onValueChange={(v) => setBarHeight(v as BarHeight)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="thin">얇게</SelectItem>
                          <SelectItem value="default">보통</SelectItem>
                          <SelectItem value="thick">두껍게</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as ProgressLayout)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stacked">세로 나열</SelectItem>
                          <SelectItem value="grouped">가로 차트</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animated">애니메이션</Label>
                      <Switch id="animated" checked={animated} onCheckedChange={setAnimated} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 바 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useMultiProgressStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[200px]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <MultiProgressPreview
              items={items} showPercent={showPercent} showValue={showValue}
              barHeight={barHeight} layout={layout} animated={animated}
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
