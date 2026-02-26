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
import GoalPreview from "@/components/widget/GoalPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useGoalStore } from "@/store/useGoalStore";
import { goalPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { GoalStyle } from "@/lib/goal";

export default function CreateGoalPage() {
  const {
    title, current, target, unit, style, showValue,
    color, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTitle, setCurrent, setTarget, setUnit, setStyle, setShowValue,
    setColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useGoalStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/goal`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (current !== 0) params.set("current", String(current));
    if (target !== 100) params.set("target", String(target));
    if (unit) params.set("unit", unit);
    if (style !== "bar") params.set("style", style);
    if (!showValue) params.set("showValue", "false");
    if (color !== "2563EB") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [title, current, target, unit, style, showValue, color, textColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="목표 진행률 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={goalPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">목표 제목</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="목표 이름" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">목표값</Label>
                      <Input
                        id="target" type="number" min={1}
                        value={target}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 1) setTarget(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current">현재값</Label>
                      <Input
                        id="current" type="number" min={0}
                        value={current}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0) setCurrent(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">단위</Label>
                      <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="원, 회, km 등" />
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
                      <Select value={style} onValueChange={(v) => setStyle(v as GoalStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">바</SelectItem>
                          <SelectItem value="ring">링</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showValue">값 표시</Label>
                      <Switch id="showValue" checked={showValue} onCheckedChange={setShowValue} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="프로그레스 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 프로그레스 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <GoalPreview
              title={title} current={current} target={target} unit={unit}
              style={style} showValue={showValue} color={color} textColor={textColor}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
