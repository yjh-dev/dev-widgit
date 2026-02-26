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
import PomodoroPreview from "@/components/widget/PomodoroPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { usePomodoroStore } from "@/store/usePomodoroStore";
import { pomodoroPresets } from "@/lib/presets";
import type { PomodoroProgressStyle } from "@/store/usePomodoroStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";

export default function CreatePomodoroPage() {
  const {
    workTime, breakTime, color, bg, transparentBg,
    borderRadius, padding, fontSize, longBreak, rounds, showRounds, breakColor, autoStart, pStyle,
    setWorkTime, setBreakTime, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize, setLongBreak, setRounds, setShowRounds, setBreakColor, setAutoStart, setPStyle,
    loadPreset, reset,
  } = usePomodoroStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/pomodoro`;
    const params = new URLSearchParams();
    if (workTime !== 25) params.set("work", String(workTime));
    if (breakTime !== 5) params.set("break", String(breakTime));
    if (color !== "E11D48") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    if (longBreak !== 15) params.set("longBreak", String(longBreak));
    if (rounds !== 4) params.set("rounds", String(rounds));
    if (!showRounds) params.set("showRounds", "false");
    if (breakColor !== "22C55E") params.set("breakColor", breakColor);
    if (autoStart) params.set("autoStart", "true");
    if (pStyle !== "bar") params.set("pStyle", pStyle);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [workTime, breakTime, color, bg, transparentBg, borderRadius, padding, fontSize, longBreak, rounds, showRounds, breakColor, autoStart, pStyle]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="뽀모도로 타이머 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={pomodoroPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "타이머 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="workTime">집중 시간 (분)</Label>
                      <Input id="workTime" type="number" min={1} max={120} value={workTime}
                        onChange={(e) => { const v = Number(e.target.value); if (v >= 1 && v <= 120) setWorkTime(v); }} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breakTime">휴식 시간 (분)</Label>
                      <Input id="breakTime" type="number" min={1} max={60} value={breakTime}
                        onChange={(e) => { const v = Number(e.target.value); if (v >= 1 && v <= 60) setBreakTime(v); }} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longBreak">긴 휴식 시간 (분)</Label>
                      <Input id="longBreak" type="number" min={1} max={60} value={longBreak}
                        onChange={(e) => { const v = Number(e.target.value); if (v >= 1 && v <= 60) setLongBreak(v); }} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rounds">라운드 수</Label>
                      <Input id="rounds" type="number" min={1} max={10} value={rounds}
                        onChange={(e) => { const v = Number(e.target.value); if (v >= 1 && v <= 10) setRounds(v); }} />
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
                      <Label>프로그레스 스타일</Label>
                      <Select value={pStyle} onValueChange={(v) => setPStyle(v as PomodoroProgressStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">바</SelectItem>
                          <SelectItem value="ring">링</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showRounds">라운드 표시</Label>
                      <Switch id="showRounds" checked={showRounds} onCheckedChange={setShowRounds} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoStart">자동 시작</Label>
                      <Switch id="autoStart" checked={autoStart} onCheckedChange={setAutoStart} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="집중 색상" value={color} onChange={setColor} placeholder="E11D48" />
                    <ColorPicker id="breakColor" label="휴식 색상" value={breakColor} onChange={setBreakColor} placeholder="22C55E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[320px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <PomodoroPreview
              workTime={workTime} breakTime={breakTime} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize} longBreak={longBreak} rounds={rounds} showRounds={showRounds}
              breakColor={breakColor} autoStart={autoStart} pStyle={pStyle}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
