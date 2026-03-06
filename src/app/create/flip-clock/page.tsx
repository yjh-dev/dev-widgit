"use client";

import { toast } from "sonner";
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
import FlipClockPreview from "@/components/widget/FlipClockPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useFlipClockStore } from "@/store/useFlipClockStore";
import { TIMEZONE_OPTIONS, CLOCK_DATE_FORMAT_OPTIONS } from "@/lib/clock";
import { flipClockPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import type { FlipClockFormat, FlipClockDateFormat } from "@/lib/flip-clock";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateFlipClockPage() {
  const {
    timezone, format, showSeconds, flipColor, textColor, gapColor,
    bg, transparentBg, showDate, dateFmt,
    borderRadius, padding, fontSize,
    setTimezone, setFormat, setShowSeconds, setFlipColor, setTextColor, setGapColor,
    setBg, setTransparentBg, setShowDate, setDateFmt,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useFlipClockStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...parseCommonParams(p),
      ...(p.has("timezone") && { timezone: p.get("timezone")! }),
      ...(p.has("format") && { format: p.get("format") as FlipClockFormat }),
      ...(p.has("showSeconds") && { showSeconds: p.get("showSeconds") === "true" }),
      ...(p.has("flipColor") && { flipColor: p.get("flipColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("gapColor") && { gapColor: p.get("gapColor")! }),
      ...(p.has("showDate") && { showDate: p.get("showDate") === "true" }),
      ...(p.has("dateFmt") && { dateFmt: p.get("dateFmt") as FlipClockDateFormat }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/flip-clock`;
    const params = new URLSearchParams();
    if (timezone !== "Asia/Seoul") params.set("timezone", timezone);
    if (format !== "24h") params.set("format", format);
    if (showSeconds) params.set("showSeconds", "true");
    if (flipColor !== "1E1E1E") params.set("flipColor", flipColor);
    if (textColor !== "FFFFFF") params.set("textColor", textColor);
    if (gapColor !== "333333") params.set("gapColor", gapColor);
    addBgParam(params, transparentBg, bg);
    if (showDate) params.set("showDate", "true");
    if (showDate && dateFmt !== "kr") params.set("dateFmt", dateFmt);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [timezone, format, showSeconds, flipColor, textColor, gapColor, bg, transparentBg, showDate, dateFmt, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="플립 시계 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={flipClockPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>타임존</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {TIMEZONE_OPTIONS.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>시간 포맷</Label>
                      <Select value={format} onValueChange={(v) => setFormat(v as FlipClockFormat)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24시간</SelectItem>
                          <SelectItem value="12h">12시간</SelectItem>
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
                      <Label htmlFor="showSeconds">초 표시</Label>
                      <Switch id="showSeconds" checked={showSeconds} onCheckedChange={setShowSeconds} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDate">날짜 표시</Label>
                      <Switch id="showDate" checked={showDate} onCheckedChange={setShowDate} />
                    </div>
                    {showDate && (
                      <div className="space-y-2">
                        <Label>날짜 포맷</Label>
                        <Select value={dateFmt} onValueChange={(v) => setDateFmt(v as FlipClockDateFormat)}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {CLOCK_DATE_FORMAT_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="flipColor" label="카드 색상" value={flipColor} onChange={setFlipColor} placeholder="1E1E1E" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="FFFFFF" />
                    <ColorPicker id="gapColor" label="구분선 색상" value={gapColor} onChange={setGapColor} placeholder="333333" />
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
                    entrance={entrance} entranceDelay={entranceDelay}
                    onEntranceChange={setEntrance} onEntranceDelayChange={setEntranceDelay}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useFlipClockStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[2/1]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <FlipClockPreview
              timezone={timezone}
              format={format}
              showSeconds={showSeconds}
              flipColor={flipColor}
              textColor={textColor}
              gapColor={gapColor}
              bg={bg}
              transparentBg={transparentBg}
              showDate={showDate}
              dateFmt={dateFmt}
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
