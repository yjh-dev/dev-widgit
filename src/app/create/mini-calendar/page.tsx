"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
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
import MiniCalendarPreview from "@/components/widget/MiniCalendarPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useMiniCalendarStore } from "@/store/useMiniCalendarStore";
import { miniCalendarPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { WeekStartDay, HeaderFormat, DayNameLang } from "@/lib/mini-calendar";
import { parseCommonParams } from "@/lib/common-params";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateMiniCalendarPage() {
  const {
    weekStart, header, showDayNames, lang, showOtherDays, showNav,
    highlight, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setWeekStart, setHeader, setShowDayNames, setLang, setShowOtherDays, setShowNav,
    setHighlight, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useMiniCalendarStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("weekStart") && { weekStart: p.get("weekStart") as WeekStartDay }),
      ...(p.has("header") && { header: p.get("header") as HeaderFormat }),
      ...(p.has("dayNames") && { showDayNames: p.get("dayNames") !== "false" }),
      ...(p.has("lang") && { lang: p.get("lang") as DayNameLang }),
      ...(p.has("otherDays") && { showOtherDays: p.get("otherDays") !== "false" }),
      ...(p.has("nav") && { showNav: p.get("nav") !== "false" }),
      ...(p.has("highlight") && { highlight: p.get("highlight")! }),
      ...(p.has("color") && { color: p.get("color")! }),
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

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/mini-calendar`;
    const params = new URLSearchParams();
    if (weekStart !== "mon") params.set("weekStart", weekStart);
    if (header !== "full") params.set("header", header);
    if (!showDayNames) params.set("dayNames", "false");
    if (lang !== "ko") params.set("lang", lang);
    if (!showOtherDays) params.set("otherDays", "false");
    if (!showNav) params.set("nav", "false");
    if (highlight !== "2563EB") params.set("highlight", highlight);
    if (color !== "1E1E1E") params.set("color", color);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [weekStart, header, showDayNames, lang, showOtherDays, showNav, highlight, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="미니 캘린더 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={miniCalendarPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>주 시작일</Label>
                      <Select value={weekStart} onValueChange={(v) => setWeekStart(v as WeekStartDay)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mon">월요일</SelectItem>
                          <SelectItem value="sun">일요일</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>언어</Label>
                      <Select value={lang} onValueChange={(v) => setLang(v as DayNameLang)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>헤더 형식</Label>
                      <Select value={header} onValueChange={(v) => setHeader(v as HeaderFormat)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">전체 (2026년 2월)</SelectItem>
                          <SelectItem value="short">짧게 (2026.02)</SelectItem>
                          <SelectItem value="none">숨기기</SelectItem>
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
                      <Label htmlFor="showDayNames">요일 표시</Label>
                      <Switch id="showDayNames" checked={showDayNames} onCheckedChange={setShowDayNames} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showOtherDays">이전/다음 달 날짜</Label>
                      <Switch id="showOtherDays" checked={showOtherDays} onCheckedChange={setShowOtherDays} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showNav">네비게이션</Label>
                      <Switch id="showNav" checked={showNav} onCheckedChange={setShowNav} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="글자 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
                    <ColorPicker id="highlight" label="오늘 강조색" value={highlight} onChange={setHighlight} placeholder="2563EB" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useMiniCalendarStore.setState(c)} />
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
              <MiniCalendarPreview
              weekStart={weekStart} header={header} showDayNames={showDayNames} lang={lang}
              showOtherDays={showOtherDays} showNav={showNav} highlight={highlight} color={color}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
