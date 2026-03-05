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
import PollPreview from "@/components/widget/PollPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import EffectOptions from "@/components/editor/EffectOptions";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import { usePollStore } from "@/store/usePollStore";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parsePollOptions, serializePollOptions } from "@/lib/poll";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreatePollPage() {
  const {
    question, options,
    showPercent, color, textColor, font,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    setQuestion, setOptions,
    setShowPercent, setColor, setTextColor, setFont,
    setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = usePollStore();

  const [newOptionText, setNewOptionText] = useState("");

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("question") && { question: p.get("question")! }),
      ...(p.has("options") && { options: p.get("options")! }),
      ...(p.has("showPercent") && { showPercent: p.get("showPercent") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
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

  // Parse options string to array for editing
  const optionList = options ? options.split("|").filter(Boolean).map((t) => decodeURIComponent(t)) : [];
  const pollOptions = parsePollOptions(options);

  const addOption = () => {
    const text = newOptionText.trim();
    if (!text) return;
    const updated = [...optionList, text];
    setOptions(serializePollOptions(updated));
    setNewOptionText("");
  };

  const removeOption = (index: number) => {
    const updated = optionList.filter((_, i) => i !== index);
    setOptions(serializePollOptions(updated));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/poll`;
    const params = new URLSearchParams();
    if (question) params.set("question", question);
    if (options) params.set("options", options);
    if (!showPercent) params.set("showPercent", "false");
    if (color !== "2563EB") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [question, options, showPercent, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="투표 위젯 만들기">
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
                      <Label htmlFor="question">질문</Label>
                      <Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="예: 좋아하는 프로그래밍 언어는?" />
                    </div>
                    <div className="space-y-2">
                      <Label>선택지</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newOptionText}
                          onChange={(e) => setNewOptionText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addOption()}
                          placeholder="새 선택지 추가"
                        />
                        <Button size="icon" onClick={addOption} className="shrink-0" aria-label="추가">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {optionList.length > 0 && (
                        <ul className="space-y-1.5">
                          {optionList.map((opt, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <span className="flex-1">{opt}</span>
                              <button
                                type="button"
                                onClick={() => removeOption(i)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                                aria-label="삭제"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {optionList.length === 0 && (
                        <p className="text-xs text-muted-foreground">위에서 선택지를 추가하세요.</p>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPercent">퍼센트 표시</Label>
                      <Switch id="showPercent" checked={showPercent} onCheckedChange={setShowPercent} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="강조 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 기본)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => usePollStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <EditorEffectsPreview
        fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
        neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
        tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
      >
        <PollPreview
          question={question}
          initialOptions={pollOptions}
          interactive={false}
          showPercent={showPercent}
          color={color}
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
