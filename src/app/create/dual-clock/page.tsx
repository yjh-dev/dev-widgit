"use client";

import { toast } from "sonner";
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
import DualClockPreview from "@/components/widget/DualClockPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useDualClockStore } from "@/store/useDualClockStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { DUAL_TIMEZONE_OPTIONS, type DualClockFormat } from "@/lib/dual-clock";
import { CLOCK_FONT_OPTIONS } from "@/lib/fonts";

export default function CreateDualClockPage() {
  const {
    tz1, tz2, label1, label2, format,
    color, textColor, font, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTz1, setTz2, setLabel1, setLabel2, setFormat,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useDualClockStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("tz1") && { tz1: p.get("tz1")! }),
      ...(p.has("tz2") && { tz2: p.get("tz2")! }),
      ...(p.has("label1") && { label1: p.get("label1")! }),
      ...(p.has("label2") && { label2: p.get("label2")! }),
      ...(p.has("format") && { format: p.get("format") as DualClockFormat }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/dual-clock`;
    const params = new URLSearchParams();
    if (tz1 !== "Asia/Seoul") params.set("tz1", tz1);
    if (tz2 !== "America/New_York") params.set("tz2", tz2);
    if (label1 !== "서울") params.set("label1", label1);
    if (label2 !== "뉴욕") params.set("label2", label2);
    if (format !== "24h") params.set("format", format);
    if (color !== "1E1E1E") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "mono") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [tz1, tz2, label1, label2, format, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="듀얼 시계 위젯 만들기">
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
                      <Label>시계 1 — 타임존</Label>
                      <Select value={tz1} onValueChange={setTz1}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {DUAL_TIMEZONE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label1">시계 1 — 라벨</Label>
                      <Input id="label1" value={label1} onChange={(e) => setLabel1(e.target.value)} placeholder="서울" />
                    </div>
                    <div className="space-y-2">
                      <Label>시계 2 — 타임존</Label>
                      <Select value={tz2} onValueChange={setTz2}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {DUAL_TIMEZONE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label2">시계 2 — 라벨</Label>
                      <Input id="label2" value={label2} onChange={(e) => setLabel2(e.target.value)} placeholder="뉴욕" />
                    </div>
                    <div className="space-y-2">
                      <Label>시간 형식</Label>
                      <Select value={format} onValueChange={(v) => setFormat(v as DualClockFormat)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24시간</SelectItem>
                          <SelectItem value="12h">12시간 (AM/PM)</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CLOCK_FONT_OPTIONS.map((opt) => (
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
                    <ColorPicker id="color" label="메인 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 메인 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useDualClockStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <DualClockPreview
                tz1={tz1} tz2={tz2} label1={label1} label2={label2} format={format}
                color={color} textColor={textColor} font={font}
                bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
                padding={padding} fontSize={fontSize}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
