"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnniversaryPreview from "@/components/widget/AnniversaryPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useAnniversaryStore } from "@/store/useAnniversaryStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import { addEffectParams, addExtraStyleParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateAnniversaryPage() {
  const {
    title, date, color, textColor,
    showDays, showWeeks, showMonths, font,
    bg, transparentBg, borderRadius, padding, fontSize,
    setTitle, setDate, setColor, setTextColor,
    setShowDays, setShowWeeks, setShowMonths, setFont,
    setBg, setTransparentBg, setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useAnniversaryStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("date") && { date: p.get("date")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("showDays") && { showDays: p.get("showDays") !== "false" }),
      ...(p.has("showWeeks") && { showWeeks: p.get("showWeeks") === "true" }),
      ...(p.has("showMonths") && { showMonths: p.get("showMonths") === "true" }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("bg") && {
        ...(p.get("bg") === "transparent"
          ? { transparentBg: true }
          : { bg: p.get("bg")!, transparentBg: false }),
      }),
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

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/anniversary`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (date) params.set("date", date);
    if (color !== "E11D48") params.set("color", color);
    if (textColor !== "FFFFFF") params.set("textColor", textColor);
    if (!showDays) params.set("showDays", "false");
    if (showWeeks) params.set("showWeeks", "true");
    if (showMonths) params.set("showMonths", "true");
    if (font !== "sans") params.set("font", font);
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
  }, [title, date, color, textColor, showDays, showWeeks, showMonths, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="기념일 카운터 위젯 만들기">
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
                      <Label htmlFor="title">제목</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="우리의 기념일" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">시작 날짜</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font">폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger id="font"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {GENERAL_FONT_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDays">일수 표시</Label>
                      <Switch id="showDays" checked={showDays} onCheckedChange={setShowDays} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showWeeks">주수 표시</Label>
                      <Switch id="showWeeks" checked={showWeeks} onCheckedChange={setShowWeeks} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showMonths">개월수 표시</Label>
                      <Switch id="showMonths" checked={showMonths} onCheckedChange={setShowMonths} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="강조 색상" value={color} onChange={setColor} placeholder="E11D48" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="FFFFFF" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useAnniversaryStore.setState(c)} />
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
              <AnniversaryPreview
                title={title} date={date} color={color} textColor={textColor}
                showDays={showDays} showWeeks={showWeeks} showMonths={showMonths}
                font={font} bg={bg} transparentBg={transparentBg}
                borderRadius={borderRadius} padding={padding} fontSize={fontSize}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
