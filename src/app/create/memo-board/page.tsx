"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import MemoBoardPreview from "@/components/widget/MemoBoardPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import EffectOptions from "@/components/editor/EffectOptions";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import { useMemoBoardStore } from "@/store/useMemoBoardStore";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseMemos, serializeMemos } from "@/lib/memo-board";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateMemoBoardPage() {
  const {
    memos, cols,
    noteColor, textColor, font,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    setMemos, setCols,
    setNoteColor, setTextColor, setFont,
    setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useMemoBoardStore();

  const [newMemoText, setNewMemoText] = useState("");

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("memos") && { memos: p.get("memos")! }),
      ...(p.has("cols") && { cols: Number(p.get("cols")) }),
      ...(p.has("noteColor") && { noteColor: p.get("noteColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...parseCommonParams(p),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    });
  });

  const memoList = parseMemos(memos);

  const addMemo = () => {
    const text = newMemoText.trim();
    if (!text) return;
    const updated = [...memoList, text];
    setMemos(serializeMemos(updated));
    setNewMemoText("");
  };

  const removeMemo = (index: number) => {
    const updated = memoList.filter((_, i) => i !== index);
    setMemos(serializeMemos(updated));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/memo-board`;
    const params = new URLSearchParams();
    if (memos) params.set("memos", memos);
    if (cols !== 3) params.set("cols", String(cols));
    if (noteColor !== "FBBF24") params.set("noteColor", noteColor);
    if (textColor !== "1E1E1E") params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [memos, cols, noteColor, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="메모 보드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-3">
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
                  </div>
                ),
              },
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
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="noteColor" label="메모 색상" value={noteColor} onChange={setNoteColor} placeholder="FBBF24" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="1E1E1E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useMemoBoardStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <EditorEffectsPreview
        fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
        neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
        tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
      >
        <MemoBoardPreview
          initialMemos={memoList}
          interactive={false}
          cols={cols}
          noteColor={noteColor}
          textColor={textColor}
          bg={bg}
          transparentBg={transparentBg}
          borderRadius={borderRadius}
          padding={padding}
          fontSize={fontSize}
          font={font}
        />
      </EditorEffectsPreview>
    </EditorLayout>
  );
}
