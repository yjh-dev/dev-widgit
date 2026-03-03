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
import FlashcardPreview from "@/components/widget/FlashcardPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import { serializeCards, deserializeCards } from "@/lib/flashcard";
import { flashcardPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { FlashCard } from "@/lib/flashcard";
import { addEffectParams, addExtraStyleParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateFlashcardPage() {
  const {
    cards, showCount, autoFlip,
    accentColor, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setCards, setShowCount, setAutoFlip,
    setAccentColor, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useFlashcardStore();

  useInitFromUrl((p) => {
    const bgVal = p.get("bg");
    loadPreset({
      ...(p.has("cards") && { cards: deserializeCards(p.get("cards")!) }),
      ...(p.has("showCount") && { showCount: p.get("showCount") !== "false" }),
      ...(p.has("autoFlip") && { autoFlip: p.get("autoFlip") === "true" }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(bgVal === "transparent"
        ? { transparentBg: true }
        : bgVal
          ? { bg: bgVal, transparentBg: false }
          : {}),
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

  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  const handleAddCard = () => {
    if (!newFront.trim() && !newBack.trim()) return;
    setCards([...cards, { front: newFront.trim(), back: newBack.trim() }]);
    setNewFront("");
    setNewBack("");
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleUpdateCard = (index: number, field: keyof FlashCard, value: string) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    setCards(updated);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/flashcard`;
    const params = new URLSearchParams();
    if (cards.length > 0) {
      const serialized = serializeCards(cards);
      if (serialized) params.set("cards", serialized);
    }
    if (!showCount) params.set("showCount", "false");
    if (autoFlip) params.set("autoFlip", "true");
    if (accentColor !== "7C3AED") params.set("accent", accentColor);
    if (color !== "1E1E1E") params.set("color", color);
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
  }, [cards, showCount, autoFlip, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="플래시카드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={flashcardPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>카드 목록</Label>
                      {cards.map((card, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={card.front}
                            onChange={(e) => handleUpdateCard(i, "front", e.target.value)}
                            placeholder="앞면"
                            className="flex-1"
                          />
                          <Input
                            value={card.back}
                            onChange={(e) => handleUpdateCard(i, "back", e.target.value)}
                            placeholder="뒷면"
                            className="flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCard(i)}
                            className="text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <Input
                          value={newFront}
                          onChange={(e) => setNewFront(e.target.value)}
                          placeholder="앞면 (문제/단어)"
                          className="flex-1"
                          onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
                        />
                        <Input
                          value={newBack}
                          onChange={(e) => setNewBack(e.target.value)}
                          placeholder="뒷면 (답/뜻)"
                          className="flex-1"
                          onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddCard}
                          disabled={!newFront.trim() && !newBack.trim()}
                        >
                          추가
                        </Button>
                      </div>
                      {cards.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          카드를 추가하지 않으면 샘플 카드가 표시됩니다.
                        </p>
                      )}
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
                      <Label htmlFor="showCount">카드 번호 표시</Label>
                      <Switch id="showCount" checked={showCount} onCheckedChange={setShowCount} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoFlip">자동 뒤집기</Label>
                      <Switch id="autoFlip" checked={autoFlip} onCheckedChange={setAutoFlip} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="카드 색상" value={accentColor} onChange={setAccentColor} placeholder="7C3AED" />
                    <ColorPicker id="color" label="텍스트 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useFlashcardStore.setState(c)} />
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
              <FlashcardPreview
              cards={cards}
              showCount={showCount}
              autoFlip={autoFlip}
              accentColor={accentColor}
              color={color}
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
