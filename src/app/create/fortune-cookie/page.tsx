"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
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
import FortuneCookiePreview from "@/components/widget/FortuneCookiePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { fortuneCookiePresets } from "@/lib/presets";
import { useFortuneCookieStore } from "@/store/useFortuneCookieStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { parseCommonParams } from "@/lib/common-params";
import { copyToClipboard } from "@/lib/clipboard";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import type { CookieStyle } from "@/lib/fortune-cookie";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateFortuneCookiePage() {
  const {
    customMessages, lang, style, cookieColor,
    textColor, bg, transparentBg, taps,
    borderRadius, padding, fontSize,
    setCustomMessages, setLang, setStyle, setCookieColor,
    setTextColor, setBg, setTransparentBg, setTaps,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useFortuneCookieStore();

  useInitFromUrl((p) => {
    loadPreset({
      // 하위 호환: 기존 message (단일) → customMessages 배열 변환
      ...(p.has("messages") && { customMessages: p.get("messages")!.split("|").map(decodeURIComponent) }),
      ...(p.has("message") && !p.has("messages") && { customMessages: [p.get("message")!] }),
      ...(p.has("lang") && { lang: p.get("lang")! }),
      ...(p.has("style") && { style: p.get("style")! }),
      ...(p.has("cookieColor") && { cookieColor: p.get("cookieColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("taps") && { taps: Number(p.get("taps")) }),
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

  const [newMessage, setNewMessage] = useState("");

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;
    setCustomMessages([...customMessages, newMessage.trim()]);
    setNewMessage("");
  };

  const handleRemoveMessage = (index: number) => {
    setCustomMessages(customMessages.filter((_, i) => i !== index));
  };

  const handleUpdateMessage = (index: number, value: string) => {
    const updated = [...customMessages];
    updated[index] = value;
    setCustomMessages(updated);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/fortune-cookie`;
    const params = new URLSearchParams();
    if (customMessages.length > 0) {
      params.set("messages", customMessages.map(encodeURIComponent).join("|"));
    }
    if (lang !== "ko") params.set("lang", lang);
    if (style !== "classic") params.set("style", style);
    if (cookieColor !== "D97706") params.set("cookieColor", cookieColor);
    if (textColor) params.set("textColor", textColor);
    if (taps !== 1) params.set("taps", String(taps));
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [customMessages, lang, style, cookieColor, textColor, taps, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="포춘 쿠키 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={fortuneCookiePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>커스텀 메시지 (비우면 랜덤)</Label>
                      {customMessages.map((msg, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={msg}
                            onChange={(e) => handleUpdateMessage(i, e.target.value)}
                            placeholder={`메시지 ${i + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveMessage(i)}
                            className="text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="새 메시지 추가"
                          onKeyDown={(e) => e.key === "Enter" && handleAddMessage()}
                        />
                        <Button type="button" variant="outline" size="sm" onClick={handleAddMessage} disabled={!newMessage.trim()}>
                          추가
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>언어</Label>
                      <Select value={lang} onValueChange={(v) => setLang(v as "ko" | "en")}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as CookieStyle)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">클래식</SelectItem>
                          <SelectItem value="modern">모던</SelectItem>
                          <SelectItem value="paper">종이</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>탭 횟수</Label>
                      <Select value={String(taps)} onValueChange={(v) => setTaps(Number(v))}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n}회{n === 1 ? " (바로 열림)" : ""}
                            </SelectItem>
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
                    <ColorPicker id="cookieColor" label="쿠키 색상" value={cookieColor} onChange={setCookieColor} placeholder="D97706" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useFortuneCookieStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[250px]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <FortuneCookiePreview
                customMessages={customMessages}
                lang={lang}
                style={style}
                cookieColor={cookieColor}
                textColor={textColor}
                bg={bg}
                transparentBg={transparentBg}
                borderRadius={borderRadius}
                padding={padding}
                fontSize={fontSize}
                taps={taps}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
