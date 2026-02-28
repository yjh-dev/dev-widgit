"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
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
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useLifeCalendarStore } from "@/store/useLifeCalendarStore";
import { lifeCalendarPresets } from "@/lib/presets";
import type { CellShape, CellSize } from "@/store/useLifeCalendarStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";

export default function CreateLifeCalendarPage() {
  const {
    birthdate, lifespan, color, bg, transparentBg, showStats,
    borderRadius, padding, fontSize, shape, cellSize, futureColor,
    showYears, nowColor,
    setBirthdate, setLifespan, setColor, setBg, setTransparentBg, setShowStats,
    setBorderRadius, setPadding, setFontSize, setShape, setCellSize, setFutureColor,
    setShowYears, setNowColor,
    loadPreset, reset,
  } = useLifeCalendarStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("birthdate") && { birthdate: p.get("birthdate")! }),
      ...(p.has("lifespan") && { lifespan: Number(p.get("lifespan")) }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("bg") && {
        ...(p.get("bg") === "transparent"
          ? { transparentBg: true }
          : { bg: p.get("bg")! }),
      }),
      ...(p.has("stats") && { showStats: p.get("stats") !== "false" }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
      ...(p.has("shape") && { shape: p.get("shape") as CellShape }),
      ...(p.has("cellSize") && { cellSize: p.get("cellSize") as CellSize }),
      ...(p.has("futureColor") && { futureColor: p.get("futureColor")! }),
      ...(p.has("years") && { showYears: p.get("years") === "true" }),
      ...(p.has("nowColor") && { nowColor: p.get("nowColor")! }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/life-calendar`;
    const params = new URLSearchParams();
    if (birthdate) params.set("birthdate", birthdate);
    if (lifespan !== 80) params.set("lifespan", String(lifespan));
    if (color !== "2563EB") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (!showStats) params.set("stats", "false");
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    if (shape !== "square") params.set("shape", shape);
    if (cellSize !== "sm") params.set("cellSize", cellSize);
    if (futureColor) params.set("futureColor", futureColor);
    if (showYears) params.set("years", "true");
    if (nowColor) params.set("nowColor", nowColor);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [birthdate, lifespan, color, bg, transparentBg, showStats, borderRadius, padding, fontSize, shape, cellSize, futureColor, showYears, nowColor]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="인생 달력 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={lifeCalendarPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">생년월일</Label>
                      <Input id="birthdate" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lifespan">기대 수명 (년)</Label>
                      <Input
                        id="lifespan" type="number" min={1} max={120} value={lifespan}
                        onChange={(e) => { const v = Number(e.target.value); if (v >= 1 && v <= 120) setLifespan(v); }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showStats">통계 표시</Label>
                      <Switch id="showStats" checked={showStats} onCheckedChange={setShowStats} />
                    </div>
                  </>
                ),
              },
              {
                id: "cell",
                title: "셀 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>셀 모양</Label>
                      <Select value={shape} onValueChange={(v) => setShape(v as CellShape)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">네모</SelectItem>
                          <SelectItem value="round">원형</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>셀 크기</Label>
                      <Select value={cellSize} onValueChange={(v) => setCellSize(v as CellSize)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">작게</SelectItem>
                          <SelectItem value="md">보통</SelectItem>
                          <SelectItem value="lg">크게</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showYears">나이 라벨</Label>
                      <Switch id="showYears" checked={showYears} onCheckedChange={setShowYears} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="칸 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="futureColor" label="미래 셀 색상 (비우면 테두리)" value={futureColor} onChange={setFutureColor} placeholder="비우면 테두리 스타일" />
                    <ColorPicker id="nowColor" label="현재 주 색상 (비우면 칸 색상)" value={nowColor} onChange={setNowColor} placeholder="비우면 칸 색상" />
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
                id: "style",
                title: "스타일",
                children: (
                  <CommonStyleOptions
                    borderRadius={borderRadius} padding={padding} fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius} onPaddingChange={setPadding} onFontSizeChange={setFontSize}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useLifeCalendarStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[52/80]">
            <LifeCalendarPreview
              birthdate={birthdate} lifespan={lifespan} color={color} bg={bg}
              transparentBg={transparentBg} showStats={showStats} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize} shape={shape} cellSize={cellSize} futureColor={futureColor}
              showYears={showYears} nowColor={nowColor}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
