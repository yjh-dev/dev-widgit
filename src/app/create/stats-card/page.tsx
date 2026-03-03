"use client";

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
import StatsCardPreview from "@/components/widget/StatsCardPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useStatsCardStore } from "@/store/useStatsCardStore";
import { serializeStats, deserializeStats } from "@/lib/stats-card";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import type { TrendDirection } from "@/lib/stats-card";
import type { Preset } from "@/lib/presets";
import { addEffectParams, addExtraStyleParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

const statsCardPresets: Preset[] = [
  {
    id: "stats-blog",
    name: "블로그 통계",
    data: {
      stats: [
        { label: "방문자", value: "1,234", trend: "up", trendValue: "+12%" },
        { label: "페이지뷰", value: "5,678", trend: "up", trendValue: "+8%" },
        { label: "구독자", value: "456", trend: "up", trendValue: "+3%" },
      ],
      accentColor: "2563EB",
    },
  },
  {
    id: "stats-dark-dashboard",
    name: "다크 대시보드",
    data: {
      stats: [
        { label: "방문자", value: "1,234", trend: "up", trendValue: "+12%" },
        { label: "페이지뷰", value: "5,678", trend: "up", trendValue: "+8%" },
        { label: "구독자", value: "456", trend: "down", trendValue: "-2%" },
      ],
      bg: "1A1A2E",
      color: "E0E0E0",
      accentColor: "06B6D4",
    },
  },
];

export default function CreateStatsCardPage() {
  const {
    stats, layout, accentColor, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setStats, setLayout, setAccentColor, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useStatsCardStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("stats") && { stats: deserializeStats(p.get("stats")!) }),
      ...(p.has("layout") && { layout: p.get("layout") as "row" | "grid" }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const handleStatChange = (index: number, field: keyof typeof stats[number], value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const handleAddStat = () => {
    if (stats.length >= 4) return;
    setStats([...stats, { label: "", value: "0", trend: "none" as TrendDirection, trendValue: "" }]);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/stats-card`;
    const params = new URLSearchParams();
    if (stats.length > 0) params.set("stats", serializeStats(stats));
    if (layout !== "row") params.set("layout", layout);
    if (accentColor !== "2563EB") params.set("accent", accentColor);
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
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [stats, layout, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="통계 카드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={statsCardPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as "row" | "grid")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="row">가로 나열</SelectItem>
                          <SelectItem value="grid">2x2 그리드</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center justify-between">
                        <Label>통계 항목</Label>
                        <span className="text-xs text-muted-foreground">{stats.length}/4</span>
                      </div>
                      {stats.map((stat, i) => (
                        <div key={i} className="space-y-2 p-3 rounded-lg bg-muted/50 relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveStat(i)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="space-y-1">
                            <Label className="text-xs">라벨</Label>
                            <Input
                              value={stat.label}
                              onChange={(e) => handleStatChange(i, "label", e.target.value)}
                              placeholder="예: 방문자"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">값</Label>
                            <Input
                              value={stat.value}
                              onChange={(e) => handleStatChange(i, "value", e.target.value)}
                              placeholder="예: 1,234"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs">추세</Label>
                              <Select
                                value={stat.trend}
                                onValueChange={(v) => handleStatChange(i, "trend", v)}
                              >
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="up">상승</SelectItem>
                                  <SelectItem value="down">하락</SelectItem>
                                  <SelectItem value="none">없음</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">변동값</Label>
                              <Input
                                value={stat.trendValue}
                                onChange={(e) => handleStatChange(i, "trendValue", e.target.value)}
                                placeholder="+12%"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {stats.length < 4 && (
                        <Button type="button" variant="outline" size="sm" className="w-full" onClick={handleAddStat}>
                          항목 추가
                        </Button>
                      )}
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="강조 색상" value={accentColor} onChange={setAccentColor} placeholder="2563EB" />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useStatsCardStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[120px]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <StatsCardPreview
              stats={stats}
              layout={layout}
              accentColor={accentColor}
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
