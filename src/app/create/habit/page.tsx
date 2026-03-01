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
import HabitPreview from "@/components/widget/HabitPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useHabitStore } from "@/store/useHabitStore";
import { habitPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { HabitView } from "@/lib/habit";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateHabitPage() {
  const {
    title, view, weekStart,
    color, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTitle, setView, setWeekStart,
    setColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useHabitStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("view") && { view: p.get("view") as HabitView }),
      ...(p.has("weekStart") && { weekStart: p.get("weekStart") as "sun" | "mon" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/habit`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (view !== "week") params.set("view", view);
    if (weekStart !== "mon") params.set("weekStart", weekStart);
    if (color !== "22C55E") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    return buildUrl(base, params);
  }, [title, view, weekStart, color, textColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="습관 트래커 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={habitPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">습관 이름</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 운동, 독서" />
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
                      <Label>표시 방식</Label>
                      <Select value={view} onValueChange={(v) => setView(v as HabitView)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">주간 (7일)</SelectItem>
                          <SelectItem value="month">월간 (이번 달)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {view === "week" && (
                      <div className="space-y-2">
                        <Label>주 시작일</Label>
                        <Select value={weekStart} onValueChange={(v) => setWeekStart(v as "sun" | "mon")}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mon">월요일</SelectItem>
                            <SelectItem value="sun">일요일</SelectItem>
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
                    <ColorPicker id="color" label="체크 색상" value={color} onChange={setColor} placeholder="22C55E" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 체크 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useHabitStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기 (클릭해서 체크)</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <HabitPreview
              title={title} view={view} weekStart={weekStart}
              interactive={true} color={color} textColor={textColor}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
