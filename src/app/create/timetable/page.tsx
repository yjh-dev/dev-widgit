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
import TimetablePreview from "@/components/widget/TimetablePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useTimetableStore } from "@/store/useTimetableStore";
import {
  DAY_LABELS,
  ENTRY_COLORS,
  serializeEntries,
  deserializeEntries,
} from "@/lib/timetable";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { Preset } from "@/lib/presets";
import { addEffectParams, addExtraStyleParams , addEntranceParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

const timetablePresets: Preset[] = [
  {
    id: "timetable-university",
    name: "대학 시간표",
    data: {
      entries: [
        { day: 0, hour: 9, duration: 1, title: "국어", color: "2563EB" },
        { day: 0, hour: 11, duration: 1, title: "수학", color: "E11D48" },
        { day: 1, hour: 10, duration: 2, title: "영어", color: "22C55E" },
        { day: 2, hour: 9, duration: 1, title: "과학", color: "F59E0B" },
        { day: 2, hour: 14, duration: 1, title: "역사", color: "06B6D4" },
        { day: 3, hour: 13, duration: 2, title: "체육", color: "7C3AED" },
        { day: 4, hour: 10, duration: 1, title: "음악", color: "EC4899" },
      ],
      lang: "ko",
      startHour: 9,
      endHour: 17,
    },
  },
  {
    id: "timetable-dark",
    name: "다크 시간표",
    data: {
      entries: [
        { day: 0, hour: 9, duration: 1, title: "국어", color: "2563EB" },
        { day: 0, hour: 11, duration: 1, title: "수학", color: "E11D48" },
        { day: 1, hour: 10, duration: 2, title: "영어", color: "22C55E" },
        { day: 2, hour: 9, duration: 1, title: "과학", color: "F59E0B" },
        { day: 3, hour: 13, duration: 2, title: "체육", color: "7C3AED" },
        { day: 4, hour: 10, duration: 1, title: "음악", color: "EC4899" },
      ],
      bg: "1A1A2E",
      transparentBg: false,
      color: "E0E0E0",
      lang: "ko",
      startHour: 9,
      endHour: 17,
    },
  },
];

export default function CreateTimetablePage() {
  const {
    entries, startHour, endHour, lang, showGrid,
    color, bg, transparentBg,
    borderRadius, padding, fontSize,
    addEntry, removeEntry,
    setStartHour, setEndHour, setLang, setShowGrid,
    setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useTimetableStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("entries") && { entries: deserializeEntries(p.get("entries")!) }),
      ...(p.has("start") && { startHour: Number(p.get("start")) }),
      ...(p.has("end") && { endHour: Number(p.get("end")) }),
      ...(p.has("lang") && { lang: p.get("lang") as "ko" | "en" }),
      ...(p.has("showGrid") && { showGrid: p.get("showGrid") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("bg") && p.get("bg") === "transparent"
        ? { transparentBg: true }
        : p.has("bg") && { bg: p.get("bg")!, transparentBg: false }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
    });
  });

  const [newDay, setNewDay] = useState(0);
  const [newHour, setNewHour] = useState(9);
  const [newDuration, setNewDuration] = useState(1);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState(ENTRY_COLORS[0]);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    if (entries.length >= 20) {
      toast.error("최대 20개까지 추가할 수 있습니다.");
      return;
    }
    addEntry({
      day: newDay,
      hour: newHour,
      duration: newDuration,
      title: newTitle.trim(),
      color: newColor,
    });
    setNewTitle("");
  };

  // Generate hour options for selects
  const hourOptions = [];
  for (let h = 0; h <= 23; h++) {
    hourOptions.push(h);
  }

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/timetable`;
    const params = new URLSearchParams();
    if (entries.length > 0) params.set("entries", serializeEntries(entries));
    if (startHour !== 9) params.set("start", String(startHour));
    if (endHour !== 17) params.set("end", String(endHour));
    if (lang !== "ko") params.set("lang", lang);
    if (!showGrid) params.set("showGrid", "false");
    if (color !== "1E1E1E") params.set("color", color);
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
    addEntranceParams(params, entrance, entranceDelay);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [entries, startHour, endHour, lang, showGrid, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="시간표 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={timetablePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "수업 관리",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newTitle">수업명</Label>
                      <Input
                        id="newTitle"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="예: 국어"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>요일</Label>
                        <Select value={String(newDay)} onValueChange={(v) => setNewDay(Number(v))}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {DAY_LABELS.map((label, i) => (
                              <SelectItem key={i} value={String(i)}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>시작 시간</Label>
                        <Select value={String(newHour)} onValueChange={(v) => setNewHour(Number(v))}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((h) => (
                              <SelectItem key={h} value={String(h)}>{h}시</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>시간 수</Label>
                        <Select value={String(newDuration)} onValueChange={(v) => setNewDuration(Number(v))}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1시간</SelectItem>
                            <SelectItem value="2">2시간</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>색상</Label>
                        <Select value={newColor} onValueChange={setNewColor}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {ENTRY_COLORS.map((c) => (
                              <SelectItem key={c} value={c}>
                                <span className="flex items-center gap-2">
                                  <span
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{ backgroundColor: `#${c}` }}
                                  />
                                  #{c}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAdd}
                      disabled={!newTitle.trim() || entries.length >= 20}
                      className="w-full"
                    >
                      수업 추가
                    </Button>
                    {entries.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <Label className="text-xs opacity-50">등록된 수업 ({entries.length}/20)</Label>
                        {entries.map((e, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-1 px-2 rounded bg-muted">
                            <span className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: `#${e.color}` }}
                              />
                              {DAY_LABELS[e.day]} {e.hour}시 ({e.duration}h) — {e.title}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeEntry(i)}
                              className="text-muted-foreground hover:text-destructive"
                            >
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
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>시작 시간</Label>
                        <Select value={String(startHour)} onValueChange={(v) => setStartHour(Number(v))}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {hourOptions.filter((h) => h < endHour).map((h) => (
                              <SelectItem key={h} value={String(h)}>{h}시</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>종료 시간</Label>
                        <Select value={String(endHour)} onValueChange={(v) => setEndHour(Number(v))}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {hourOptions.filter((h) => h > startHour).map((h) => (
                              <SelectItem key={h} value={String(h)}>{h}시</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>언어</Label>
                      <Select value={lang} onValueChange={(v) => setLang(v as "ko" | "en")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showGrid">격자 표시</Label>
                      <Switch id="showGrid" checked={showGrid} onCheckedChange={setShowGrid} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="텍스트 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useTimetableStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/5]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <TimetablePreview
              entries={entries}
              startHour={startHour}
              endHour={endHour}
              lang={lang}
              showGrid={showGrid}
              color={color}
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
