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
import TimeProgressPreview from "@/components/widget/TimeProgressPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useTimeProgressStore } from "@/store/useTimeProgressStore";
import type { BarStyle, BarHeight } from "@/store/useTimeProgressStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { ProgressType } from "@/lib/time-progress";

export default function CreateTimeProgressPage() {
  const {
    type, color, bg, transparentBg, borderRadius, padding, fontSize,
    style, showLabel, showPercent, barHeight,
    setType, setColor, setBg, setTransparentBg, setBorderRadius, setPadding, setFontSize,
    setStyle, setShowLabel, setShowPercent, setBarHeight,
    reset,
  } = useTimeProgressStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/time-progress`;
    const params = new URLSearchParams();
    if (type !== "day") params.set("type", type);
    if (color !== "2563EB") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    if (style !== "bar") params.set("style", style);
    if (!showLabel) params.set("label", "false");
    if (!showPercent) params.set("percent", "false");
    if (barHeight !== "default") params.set("barH", barHeight);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [type, color, bg, transparentBg, borderRadius, padding, fontSize, style, showLabel, showPercent, barHeight]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="시간 진행률 바 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic", "display", "color"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>진행률 타입</Label>
                      <Select value={type} onValueChange={(v) => setType(v as ProgressType)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">오늘 하루</SelectItem>
                          <SelectItem value="week">이번 주</SelectItem>
                          <SelectItem value="month">이번 달</SelectItem>
                          <SelectItem value="year">올해</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>바 스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as BarStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">바</SelectItem>
                          <SelectItem value="ring">링</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {style === "bar" && (
                      <div className="space-y-2">
                        <Label>바 높이</Label>
                        <Select value={barHeight} onValueChange={(v) => setBarHeight(v as BarHeight)}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="thin">얇게</SelectItem>
                            <SelectItem value="default">보통</SelectItem>
                            <SelectItem value="thick">두껍게</SelectItem>
                          </SelectContent>
                        </Select>
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLabel">라벨 표시</Label>
                      <Switch id="showLabel" checked={showLabel} onCheckedChange={setShowLabel} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPercent">퍼센트 표시</Label>
                      <Switch id="showPercent" checked={showPercent} onCheckedChange={setShowPercent} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="바 색상" value={color} onChange={setColor} placeholder="2563EB" />
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

      <div className="flex items-center justify-center">
        <div className="space-y-3 w-full max-w-[320px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <TimeProgressPreview
              type={type} color={color} bg={bg} transparentBg={transparentBg}
              borderRadius={borderRadius} padding={padding} fontSize={fontSize}
              style={style} showLabel={showLabel} showPercent={showPercent} barHeight={barHeight}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
