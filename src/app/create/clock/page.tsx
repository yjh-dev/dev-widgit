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
import ClockPreview from "@/components/widget/ClockPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useClockStore } from "@/store/useClockStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import { TIMEZONE_OPTIONS, type ClockFormat, type ClockFont } from "@/lib/clock";

export default function CreateClockPage() {
  const {
    timezone, format, font, color, bg, transparentBg,
    borderRadius, padding, fontSize, showSeconds, showDate, blink,
    setTimezone, setFormat, setFont, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize, setShowSeconds, setShowDate, setBlink,
    reset,
  } = useClockStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/clock`;
    const params = new URLSearchParams();
    if (timezone !== "Asia/Seoul") params.set("timezone", timezone);
    if (format !== "24h") params.set("format", format);
    if (font !== "mono") params.set("font", font);
    if (color !== "1E1E1E") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    if (!showSeconds) params.set("seconds", "false");
    if (showDate) params.set("date", "true");
    if (!blink) params.set("blink", "false");
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [timezone, format, font, color, bg, transparentBg, borderRadius, padding, fontSize, showSeconds, showDate, blink]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="미니멀 시계 위젯 만들기">
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
                      <Label>타임존</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {TIMEZONE_OPTIONS.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>시간 형식</Label>
                      <Select value={format} onValueChange={(v) => setFormat(v as ClockFormat)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24시간</SelectItem>
                          <SelectItem value="12h">12시간 (AM/PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={(v) => setFont(v as ClockFont)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mono">Mono</SelectItem>
                          <SelectItem value="sans">Sans</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="blink">구분자 깜빡임</Label>
                      <Switch id="blink" checked={blink} onCheckedChange={setBlink} />
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
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/7]">
            <ClockPreview
              timezone={timezone} format={format} font={font} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize} showSeconds={showSeconds} showDate={showDate} blink={blink}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
