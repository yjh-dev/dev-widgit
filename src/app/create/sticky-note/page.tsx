"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import StickyNotePreview from "@/components/widget/StickyNotePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useStickyNoteStore } from "@/store/useStickyNoteStore";
import { NOTE_COLOR_PRESETS, parseMemos, serializeMemos } from "@/lib/sticky-note";
import type { StickyPinType, StickyLineHeight, StickyNoteMode } from "@/lib/sticky-note";
import { QUOTE_FONT_OPTIONS_EXTENDED, GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import { stickyNotePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateStickyNotePage() {
  const {
    text, noteColor, textColor, pin, rotation, font, lh, shadow,
    borderRadius, padding, fontSize,
    mode, memos, cols, interactive,
    setText, setNoteColor, setTextColor, setPin, setRotation, setFont, setLh, setShadow,
    setBorderRadius, setPadding, setFontSize,
    setMode, setMemos, setCols, setInteractive,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useStickyNoteStore();

  const [newMemoText, setNewMemoText] = useState("");

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("mode") && { mode: p.get("mode") as StickyNoteMode }),
      ...(p.has("text") && { text: p.get("text")! }),
      ...(p.has("noteColor") && { noteColor: p.get("noteColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("pin") && { pin: p.get("pin") as StickyPinType }),
      ...(p.has("rotation") && { rotation: Number(p.get("rotation")) }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("lh") && { lh: p.get("lh") as StickyLineHeight }),
      ...(p.has("shadow") && { shadow: p.get("shadow") !== "false" }),
      ...(p.has("memos") && { memos: p.get("memos")! }),
      ...(p.has("cols") && { cols: Number(p.get("cols")) }),
      ...(p.has("interactive") && { interactive: p.get("interactive") !== "false" }),
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

  const memoList = parseMemos(memos);

  const addMemo = () => {
    const t = newMemoText.trim();
    if (!t) return;
    const updated = [...memoList, t];
    setMemos(serializeMemos(updated));
    setNewMemoText("");
  };

  const removeMemo = (index: number) => {
    const updated = memoList.filter((_, i) => i !== index);
    setMemos(serializeMemos(updated));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/sticky-note`;
    const params = new URLSearchParams();
    if (mode !== "single") params.set("mode", mode);
    if (mode === "single") {
      if (text !== "메모를 입력하세요") params.set("text", text);
      if (pin !== "pin") params.set("pin", pin);
      if (rotation !== 2) params.set("rotation", String(rotation));
      if (lh !== "normal") params.set("lh", lh);
      if (!shadow) params.set("shadow", "false");
    }
    if (mode === "board") {
      if (memos) params.set("memos", memos);
      if (cols !== 3) params.set("cols", String(cols));
      if (!interactive) params.set("interactive", "false");
    }
    if (noteColor !== "FBBF24") params.set("noteColor", noteColor);
    if (textColor !== "1E1E1E") params.set("textColor", textColor);
    if (font !== "gaegu") params.set("font", font);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [text, noteColor, textColor, pin, rotation, font, lh, shadow, borderRadius, padding, fontSize, mode, memos, cols, interactive, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="메모지 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={stickyNotePresets} onSelect={loadPreset} />
          {/* Note color presets */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-medium text-muted-foreground">노트 색상 프리셋</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {NOTE_COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setNoteColor(preset.value)}
                  className={`w-8 h-8 rounded-md border-2 transition-all ${
                    noteColor === preset.value ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: `#${preset.value}` }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>모드</Label>
                      <Select value={mode} onValueChange={(v) => setMode(v as StickyNoteMode)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">단일 메모</SelectItem>
                          <SelectItem value="board">메모 보드</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {mode === "single" && (
                      <div className="space-y-2">
                        <Label htmlFor="text">메모 텍스트</Label>
                        <textarea
                          id="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows={4}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                          placeholder="메모 내용을 입력하세요 (줄바꿈 가능)"
                        />
                      </div>
                    )}

                    {mode === "board" && (
                      <>
                        <div className="space-y-2">
                          <Label>메모 목록</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newMemoText}
                              onChange={(e) => setNewMemoText(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && addMemo()}
                              placeholder="새 메모 추가"
                            />
                            <Button size="icon" onClick={addMemo} className="shrink-0" aria-label="추가">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          {memoList.length > 0 && (
                            <ul className="space-y-1.5">
                              {memoList.map((memo, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <span className="flex-1">{memo}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeMemo(i)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                    aria-label="삭제"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                          {memoList.length === 0 && (
                            <p className="text-xs text-muted-foreground">위에서 메모를 추가하세요.</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>열 수</Label>
                          <Select value={String(cols)} onValueChange={(v) => setCols(Number(v))}>
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2열</SelectItem>
                              <SelectItem value="3">3열</SelectItem>
                              <SelectItem value="4">4열</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="interactive">인터랙티브 (추가/삭제)</Label>
                          <Switch id="interactive" checked={interactive} onCheckedChange={setInteractive} />
                        </div>
                      </>
                    )}
                  </div>
                ),
              },
              ...(mode === "single"
                ? [
                    {
                      id: "display",
                      title: "표시 옵션",
                      children: (
                        <>
                          <div className="space-y-2">
                            <Label>장식</Label>
                            <Select value={pin} onValueChange={(v) => setPin(v as StickyPinType)}>
                              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pin">핀</SelectItem>
                                <SelectItem value="tape">테이프</SelectItem>
                                <SelectItem value="none">없음</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rotation">회전각 (-5 ~ 5)</Label>
                            <Input
                              id="rotation"
                              type="number"
                              min={-5}
                              max={5}
                              value={rotation}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                if (v >= -5 && v <= 5) setRotation(v);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>폰트</Label>
                            <Select value={font} onValueChange={setFont}>
                              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {QUOTE_FONT_OPTIONS_EXTENDED.map((f) => (
                                  <SelectItem key={f.value} value={f.value}>
                                    {f.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>줄 간격</Label>
                            <Select value={lh} onValueChange={(v) => setLh(v as StickyLineHeight)}>
                              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tight">좁게</SelectItem>
                                <SelectItem value="normal">보통</SelectItem>
                                <SelectItem value="relaxed">넓게</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="shadow">그림자</Label>
                            <Switch id="shadow" checked={shadow} onCheckedChange={setShadow} />
                          </div>
                        </>
                      ),
                    },
                  ]
                : [
                    {
                      id: "display",
                      title: "표시 옵션",
                      children: (
                        <div className="space-y-2">
                          <Label>폰트</Label>
                          <Select value={font} onValueChange={setFont}>
                            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {GENERAL_FONT_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ),
                    },
                  ]),
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="noteColor" label="노트 색상" value={noteColor} onChange={setNoteColor} placeholder="FBBF24" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="1E1E1E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useStickyNoteStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-square p-4 bg-muted/30 flex items-center justify-center">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <StickyNotePreview
                mode={mode}
                text={text}
                noteColor={noteColor}
                textColor={textColor}
                pin={pin}
                rotation={rotation}
                font={font}
                lh={lh}
                shadow={shadow}
                borderRadius={borderRadius}
                padding={padding}
                fontSize={fontSize}
                initialMemos={memoList}
                cols={cols}
                interactive={false}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
