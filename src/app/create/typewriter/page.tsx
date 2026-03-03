"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";
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
import TypewriterPreview from "@/components/widget/TypewriterPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useTypewriterStore } from "@/store/useTypewriterStore";
import { typewriterPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import type { CursorStyle, TypewriterAlign } from "@/lib/typewriter";

export default function CreateTypewriterPage() {
  const {
    texts, speed, pause, cursor, loop, deleteAnim,
    align, bold, font,
    color, bg, transparentBg, cursorColor,
    borderRadius, padding, fontSize,
    setTexts, setSpeed, setPause, setCursor, setLoop, setDeleteAnim,
    setAlign, setBold, setFont,
    setColor, setBg, setTransparentBg, setCursorColor,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useTypewriterStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...parseCommonParams(p),
      ...(p.has("texts") && { texts: p.get("texts")!.split("|").map(decodeURIComponent) }),
      ...(p.has("speed") && { speed: Number(p.get("speed")) }),
      ...(p.has("pause") && { pause: Number(p.get("pause")) }),
      ...(p.has("cursor") && { cursor: p.get("cursor") as CursorStyle }),
      ...(p.has("loop") && { loop: p.get("loop") !== "false" }),
      ...(p.has("deleteAnim") && { deleteAnim: p.get("deleteAnim") !== "false" }),
      ...(p.has("align") && { align: p.get("align") as TypewriterAlign }),
      ...(p.has("bold") && { bold: p.get("bold") !== "false" }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("text") && { color: p.get("text")! }),
      ...(p.has("cursorColor") && { cursorColor: p.get("cursorColor")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    });
  });

  const [newText, setNewText] = useState("");

  const handleAddText = () => {
    if (!newText.trim()) return;
    setTexts([...texts, newText.trim()]);
    setNewText("");
  };

  const handleRemoveText = (index: number) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  const handleUpdateText = (index: number, value: string) => {
    const updated = [...texts];
    updated[index] = value;
    setTexts(updated);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/typewriter`;
    const params = new URLSearchParams();
    if (texts.length > 0) {
      params.set("texts", texts.map(encodeURIComponent).join("|"));
    }
    if (speed !== 80) params.set("speed", String(speed));
    if (pause !== 2000) params.set("pause", String(pause));
    if (cursor !== "bar") params.set("cursor", cursor);
    if (!loop) params.set("loop", "false");
    if (!deleteAnim) params.set("deleteAnim", "false");
    if (align !== "center") params.set("align", align);
    if (!bold) params.set("bold", "false");
    if (font !== "sans") params.set("font", font);
    if (color !== "1E1E1E") params.set("text", color);
    addBgParam(params, transparentBg, bg);
    if (cursorColor) params.set("cursorColor", cursorColor);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [texts, speed, pause, cursor, loop, deleteAnim, align, bold, font, color, bg, transparentBg, cursorColor, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="타이핑 효과 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={typewriterPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["texts"]}
            sections={[
              {
                id: "texts",
                title: "텍스트",
                children: (
                  <>
                    {texts.map((text, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          value={text}
                          onChange={(e) => handleUpdateText(i, e.target.value)}
                          placeholder={`텍스트 ${i + 1}`}
                        />
                        {texts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveText(i)}
                            className="text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Input
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="새 텍스트 추가"
                        onKeyDown={(e) => e.key === "Enter" && handleAddText()}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={handleAddText} disabled={!newText.trim()}>
                        추가
                      </Button>
                    </div>
                  </>
                ),
              },
              {
                id: "animation",
                title: "타이핑 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="speed">타이핑 속도 (ms)</Label>
                      <Input
                        id="speed" type="number" min={30} max={200}
                        value={speed}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 30 && v <= 200) setSpeed(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pause">대기 시간 (ms)</Label>
                      <Input
                        id="pause" type="number" min={500} max={5000} step={100}
                        value={pause}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 500 && v <= 5000) setPause(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>커서 스타일</Label>
                      <Select value={cursor} onValueChange={(v) => setCursor(v as CursorStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">바 (|)</SelectItem>
                          <SelectItem value="block">블록 (█)</SelectItem>
                          <SelectItem value="underscore">밑줄 (_)</SelectItem>
                          <SelectItem value="none">없음</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loop">루프</Label>
                      <Switch id="loop" checked={loop} onCheckedChange={setLoop} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="deleteAnim">삭제 애니메이션</Label>
                      <Switch id="deleteAnim" checked={deleteAnim} onCheckedChange={setDeleteAnim} />
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>정렬</Label>
                      <Select value={align} onValueChange={(v) => setAlign(v as TypewriterAlign)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">왼쪽</SelectItem>
                          <SelectItem value="center">가운데</SelectItem>
                          <SelectItem value="right">오른쪽</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bold">굵게</Label>
                      <Switch id="bold" checked={bold} onCheckedChange={setBold} />
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans">Sans-serif</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
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
                    <ColorPicker id="color" label="글자 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
                    <ColorPicker id="cursorColor" label="커서 색상" value={cursorColor} onChange={setCursorColor} placeholder="글자 색상과 동일" />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useTypewriterStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[3/1]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <TypewriterPreview
              texts={texts} speed={speed} pause={pause} cursor={cursor}
              loop={loop} deleteAnim={deleteAnim} align={align}
              bold={bold} font={font} color={color} bg={bg}
              transparentBg={transparentBg} cursorColor={cursorColor}
              borderRadius={borderRadius} padding={padding} fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
