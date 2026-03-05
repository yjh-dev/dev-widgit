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
import PasswordGenPreview from "@/components/widget/PasswordGenPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { usePasswordGenStore } from "@/store/usePasswordGenStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";

export default function CreatePasswordGenPage() {
  const {
    length, upper, lower, numbers, symbols, color, textColor, font,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    setLength, setUpper, setLower, setNumbers, setSymbols,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = usePasswordGenStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...parseCommonParams(p),
      ...(p.has("length") && { length: Number(p.get("length")) }),
      ...(p.has("upper") && { upper: p.get("upper") !== "false" }),
      ...(p.has("lower") && { lower: p.get("lower") !== "false" }),
      ...(p.has("numbers") && { numbers: p.get("numbers") !== "false" }),
      ...(p.has("symbols") && { symbols: p.get("symbols") === "true" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    });
  });

  const MONO_FONT_OPTIONS = [
    { value: "mono", label: "Mono" },
    ...GENERAL_FONT_OPTIONS,
  ];

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/password-gen`;
    const params = new URLSearchParams();
    if (length !== 16) params.set("length", String(length));
    if (!upper) params.set("upper", "false");
    if (!lower) params.set("lower", "false");
    if (!numbers) params.set("numbers", "false");
    if (symbols) params.set("symbols", "true");
    if (color !== "2563EB") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "mono") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [length, upper, lower, numbers, symbols, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="비밀번호 생성기 위젯 만들기">
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
                    <div className="space-y-2">
                      <Label htmlFor="length">비밀번호 길이 (4~64)</Label>
                      <Input
                        id="length"
                        type="number"
                        min={4}
                        max={64}
                        value={length}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 4 && v <= 64) setLength(v);
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="upper">대문자 (A-Z)</Label>
                      <Switch id="upper" checked={upper} onCheckedChange={setUpper} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lower">소문자 (a-z)</Label>
                      <Switch id="lower" checked={lower} onCheckedChange={setLower} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="numbers">숫자 (0-9)</Label>
                      <Switch id="numbers" checked={numbers} onCheckedChange={setNumbers} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="symbols">특수문자 (!@#$...)</Label>
                      <Switch id="symbols" checked={symbols} onCheckedChange={setSymbols} />
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {MONO_FONT_OPTIONS.map((opt) => (
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
                    <ColorPicker id="color" label="강조 색상" value={color} onChange={setColor} placeholder="2563EB" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => usePasswordGenStore.setState(c)} />
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
              <PasswordGenPreview
                length={length}
                upper={upper}
                lower={lower}
                numbers={numbers}
                symbols={symbols}
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
