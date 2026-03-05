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
import BookGoalPreview from "@/components/widget/BookGoalPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useBookGoalStore } from "@/store/useBookGoalStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => {
  const y = currentYear - 2 + i;
  return { value: String(y), label: `${y}년` };
});

export default function CreateBookGoalPage() {
  const {
    title, current, target, year,
    color, textColor, font, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTitle, setCurrent, setTarget, setYear,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useBookGoalStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("current") && { current: Number(p.get("current")) }),
      ...(p.has("target") && { target: Number(p.get("target")) }),
      ...(p.has("year") && { year: p.get("year")! }),
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
    const base = `${window.location.origin}/widget/book-goal`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (current !== 0) params.set("current", String(current));
    if (target !== 24) params.set("target", String(target));
    if (year !== String(currentYear)) params.set("year", year);
    if (color !== "F59E0B") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [title, current, target, year, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="독서 목표 위젯 만들기">
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
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="독서 목표 제목 (비우면 연도 자동 표시)" />
                    </div>
                    <div className="space-y-2">
                      <Label>연도</Label>
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {YEAR_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">목표 권수</Label>
                      <Input
                        id="target" type="number" min={1} max={100}
                        value={target}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 1 && v <= 100) setTarget(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current">읽은 권수</Label>
                      <Input
                        id="current" type="number" min={0}
                        value={current}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0) setCurrent(v);
                        }}
                      />
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
                    <ColorPicker id="color" label="책 색상" value={color} onChange={setColor} placeholder="F59E0B" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 책 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useBookGoalStore.setState(c)} />
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
              <BookGoalPreview
                title={title} current={current} target={target} year={year}
                color={color} textColor={textColor}
                font={font} bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
                padding={padding} fontSize={fontSize}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
