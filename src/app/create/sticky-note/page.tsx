"use client";

import { toast } from "sonner";
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
import { NOTE_COLOR_PRESETS } from "@/lib/sticky-note";
import { QUOTE_FONT_OPTIONS_EXTENDED } from "@/lib/fonts";
import { stickyNotePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addCommonStyleParams, addEffectParams, buildUrl } from "@/lib/url-builder-utils";
import type { StickyPinType, StickyLineHeight } from "@/lib/sticky-note";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateStickyNotePage() {
  const {
    text, noteColor, textColor, pin, rotation, font, lh, shadow,
    borderRadius, padding, fontSize,
    setText, setNoteColor, setTextColor, setPin, setRotation, setFont, setLh, setShadow,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    loadPreset, reset,
  } = useStickyNoteStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("text") && { text: p.get("text")! }),
      ...(p.has("noteColor") && { noteColor: p.get("noteColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("pin") && { pin: p.get("pin") as StickyPinType }),
      ...(p.has("rotation") && { rotation: Number(p.get("rotation")) }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("lh") && { lh: p.get("lh") as StickyLineHeight }),
      ...(p.has("shadow") && { shadow: p.get("shadow") !== "false" }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/sticky-note`;
    const params = new URLSearchParams();
    if (text !== "메모를 입력하세요") params.set("text", text);
    if (noteColor !== "FBBF24") params.set("noteColor", noteColor);
    if (textColor !== "1E1E1E") params.set("textColor", textColor);
    if (pin !== "pin") params.set("pin", pin);
    if (rotation !== 2) params.set("rotation", String(rotation));
    if (font !== "gaegu") params.set("font", font);
    if (lh !== "normal") params.set("lh", lh);
    if (!shadow) params.set("shadow", "false");
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    return buildUrl(base, params);
  }, [text, noteColor, textColor, pin, rotation, font, lh, shadow, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

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
            defaultOpen={["content"]}
            sections={[
              {
                id: "content",
                title: "내용",
                children: (
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
                ),
              },
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
            >
              <StickyNotePreview
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
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
