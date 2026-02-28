"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import DicePreview from "@/components/widget/DicePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useDiceStore } from "@/store/useDiceStore";
import { DICE_SIDES_OPTIONS } from "@/lib/dice";
import { dicePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { DiceMode, DiceSides } from "@/lib/dice";

export default function CreateDicePage() {
  const {
    mode, count, sides, color, textColor, bg, transparentBg,
    items, showTotal, history,
    borderRadius, padding, fontSize,
    setMode, setCount, setSides, setColor, setTextColor, setBg, setTransparentBg,
    setItems, setShowTotal, setHistory,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useDiceStore();

  useInitFromUrl((p) => {
    const bgVal = p.get("bg");
    loadPreset({
      ...(p.has("mode") && { mode: p.get("mode") as DiceMode }),
      ...(p.has("count") && { count: Number(p.get("count")) }),
      ...(p.has("sides") && { sides: Number(p.get("sides")) as DiceSides }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(bgVal === "transparent"
        ? { transparentBg: true }
        : bgVal
          ? { bg: bgVal, transparentBg: false }
          : {}),
      ...(p.has("items") && { items: p.get("items")!.split("|").map(decodeURIComponent) }),
      ...(p.has("showTotal") && { showTotal: p.get("showTotal") !== "false" }),
      ...(p.has("history") && { history: p.get("history") === "true" }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem.trim()]);
    setNewItem("");
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/dice`;
    const params = new URLSearchParams();
    if (mode !== "dice") params.set("mode", mode);
    if (mode === "dice") {
      if (count !== 1) params.set("count", String(count));
      if (sides !== 6) params.set("sides", String(sides));
      if (!showTotal) params.set("showTotal", "false");
    }
    if (mode === "picker" && items.length > 0) {
      params.set("items", items.map(encodeURIComponent).join("|"));
    }
    if (color !== "2563EB") params.set("color", color);
    if (textColor !== "FFFFFF") params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (history) params.set("history", "true");
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [mode, count, sides, color, textColor, bg, transparentBg, items, showTotal, history, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="주사위 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={dicePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>모드</Label>
                      <Select value={mode} onValueChange={(v) => setMode(v as DiceMode)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dice">주사위</SelectItem>
                          <SelectItem value="coin">동전</SelectItem>
                          <SelectItem value="picker">랜덤 뽑기</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {mode === "dice" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="count">주사위 수 (1~4)</Label>
                          <Input
                            id="count"
                            type="number"
                            min={1}
                            max={4}
                            value={count}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              if (v >= 1 && v <= 4) setCount(v);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>면 수</Label>
                          <Select value={String(sides)} onValueChange={(v) => setSides(Number(v) as DiceSides)}>
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {DICE_SIDES_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={String(opt.value)}>
                                  {opt.label} ({opt.value}면)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    {mode === "picker" && (
                      <>
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Input value={item} readOnly className="flex-1" />
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(i)}
                              className="text-muted-foreground hover:text-destructive shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <Input
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="항목 추가"
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                          />
                          <Button type="button" variant="outline" size="sm" onClick={handleAddItem} disabled={!newItem.trim()}>
                            추가
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    {mode === "dice" && count > 1 && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showTotal">합계 표시</Label>
                        <Switch id="showTotal" checked={showTotal} onCheckedChange={setShowTotal} />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="history">기록 표시</Label>
                      <Switch id="history" checked={history} onCheckedChange={setHistory} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="주사위/버튼 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="FFFFFF" />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useDiceStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-square">
            <DicePreview
              mode={mode}
              count={count}
              sides={sides}
              color={color}
              textColor={textColor}
              bg={bg}
              transparentBg={transparentBg}
              items={items}
              showTotal={showTotal}
              history={history}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
