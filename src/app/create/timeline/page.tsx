"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import TimelinePreview from "@/components/widget/TimelinePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useTimelineStore } from "@/store/useTimelineStore";
import { timelinePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { serializeEvents, parseEvents } from "@/lib/timeline";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateTimelinePage() {
  const {
    events, showPast,
    color, pastColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    addEvent, removeEvent, setShowPast,
    setColor, setPastColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useTimelineStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("events") && { events: parseEvents(p.get("events")!) }),
      ...(p.has("past") && { showPast: p.get("past") === "true" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("pastColor") && { pastColor: p.get("pastColor")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim() || !newDate) return;
    addEvent({ title: newTitle.trim(), date: newDate });
    setNewTitle("");
    setNewDate("");
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/timeline`;
    const params = new URLSearchParams();
    if (events.length > 0) params.set("events", serializeEvents(events));
    if (showPast) params.set("past", "true");
    if (color !== "2563EB") params.set("color", color);
    if (pastColor !== "999999") params.set("pastColor", pastColor);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [events, showPast, color, pastColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="타임라인 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={timelinePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["events"]}
            sections={[
              {
                id: "events",
                title: "일정 관리",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newTitle">일정 제목</Label>
                      <Input id="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="예: 기말고사" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newDate">날짜</Label>
                      <Input id="newDate" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAdd}
                      disabled={!newTitle.trim() || !newDate}
                      className="w-full"
                    >
                      일정 추가
                    </Button>
                    {events.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <Label className="text-xs opacity-50">등록된 일정</Label>
                        {events.map((e, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-1 px-2 rounded bg-muted">
                            <span>{e.title} ({e.date})</span>
                            <button type="button" onClick={() => removeEvent(i)} className="text-muted-foreground hover:text-destructive">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showPast">지난 일정 표시</Label>
                    <Switch id="showPast" checked={showPast} onCheckedChange={setShowPast} />
                  </div>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="메인 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="pastColor" label="지난 일정 색상" value={pastColor} onChange={setPastColor} placeholder="999999" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useTimelineStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[200px]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <TimelinePreview
              events={events} showPast={showPast} color={color} pastColor={pastColor}
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
