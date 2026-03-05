"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Label } from "@/components/ui/label";
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
import VocabularyPreview from "@/components/widget/VocabularyPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useVocabularyStore } from "@/store/useVocabularyStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import { parseWords, type VocabMode, type VocabWord } from "@/lib/vocabulary";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";

function wordsToText(words: VocabWord[]): string {
  return words.map((w) => `${w.word} - ${w.meaning}`).join("\n");
}

function textToWords(text: string): VocabWord[] {
  return text
    .split("\n")
    .map((line) => {
      const sep = line.indexOf(" - ");
      if (sep === -1) return { word: line.trim(), meaning: "" };
      return { word: line.slice(0, sep).trim(), meaning: line.slice(sep + 3).trim() };
    })
    .filter((w) => w.word);
}

export default function CreateVocabularyPage() {
  const {
    words, mode, color, textColor, font,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    setWords, setMode, setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useVocabularyStore();

  const [wordsText, setWordsText] = useState(() => wordsToText(words));
  const [useBuiltin, setUseBuiltin] = useState(words.length === 0);

  useInitFromUrl((p) => {
    const preset: Record<string, unknown> = {
      ...parseCommonParams(p),
      ...(p.has("mode") && { mode: p.get("mode") as VocabMode }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    };
    if (p.has("words")) {
      const parsed = parseWords(p.get("words")!);
      preset.words = parsed;
      setWordsText(wordsToText(parsed));
      setUseBuiltin(false);
    }
    loadPreset(preset);
  });

  const handleWordsTextChange = (text: string) => {
    setWordsText(text);
    const parsed = textToWords(text);
    setWords(parsed);
    if (parsed.length > 0) setUseBuiltin(false);
  };

  const handleUseBuiltinChange = (checked: boolean) => {
    setUseBuiltin(checked);
    if (checked) {
      setWords([]);
      setWordsText("");
    }
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/vocabulary`;
    const params = new URLSearchParams();
    if (words.length > 0) {
      params.set("words", words.map((w) => `${encodeURIComponent(w.word)}~${encodeURIComponent(w.meaning)}`).join("|"));
    }
    if (mode !== "daily") params.set("mode", mode);
    if (color !== "7C3AED") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [words, mode, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="단어장 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="useBuiltin">기본 제공 단어 사용</Label>
                      <Switch id="useBuiltin" checked={useBuiltin} onCheckedChange={handleUseBuiltinChange} />
                    </div>
                    {!useBuiltin && (
                      <div className="space-y-2">
                        <Label htmlFor="wordsText">단어 목록 (줄당 &quot;단어 - 뜻&quot;)</Label>
                        <textarea
                          id="wordsText"
                          className="w-full min-h-[120px] px-3 py-2 rounded-md border bg-background text-sm resize-y"
                          value={wordsText}
                          onChange={(e) => handleWordsTextChange(e.target.value)}
                          placeholder={"apple - 사과\nbook - 책\nhappy - 행복한"}
                        />
                        <p className="text-xs text-muted-foreground">{words.length}개 단어</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>모드</Label>
                      <Select value={mode} onValueChange={(v) => setMode(v as VocabMode)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">오늘의 단어</SelectItem>
                          <SelectItem value="random">랜덤</SelectItem>
                          <SelectItem value="sequential">순서대로</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="강조 색상" value={color} onChange={setColor} placeholder="7C3AED" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="자동" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useVocabularyStore.setState(c)} />
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
              <VocabularyPreview
                words={words}
                mode={mode}
                color={color}
                textColor={textColor}
                font={font}
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
