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
import PresetSelector from "@/components/editor/PresetSelector";
import { useClockStore } from "@/store/useClockStore";
import { clockPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import { TIMEZONE_OPTIONS, CLOCK_DATE_FORMAT_OPTIONS, type ClockFormat, type ClockDateFormat } from "@/lib/clock";
import { CLOCK_FONT_OPTIONS } from "@/lib/fonts";

export default function CreateClockPage() {
  const {
    timezone, format, font, color, bg, transparentBg,
    borderRadius, padding, fontSize, showSeconds, showDate, blink,
    dateColor, dateFmt,
    setTimezone, setFormat, setFont, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize, setShowSeconds, setShowDate, setBlink,
    setDateColor, setDateFmt,
    loadPreset, reset,
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
    if (dateColor) params.set("dateColor", dateColor);
    if (dateFmt !== "kr") params.set("dateFmt", dateFmt);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [timezone, format, font, color, bg, transparentBg, borderRadius, padding, fontSize, showSeconds, showDate, blink, dateColor, dateFmt]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="미니멀 시계 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={clockPresets} onSelect={loadPreset} />
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
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CLOCK_FONT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
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
                        <Label>날짜 형식</Label>
                        <Select value={dateFmt} onValueChange={(v) => setDateFmt(v as ClockDateFormat)}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {CLOCK_DATE_FORMAT_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
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
                    {showDate && (
                      <ColorPicker id="dateColor" label="날짜 색상 (비우면 글자 색상)" value={dateColor} onChange={setDateColor} placeholder="비우면 글자 색상" />
                    )}
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
          <div className="border rounded-lg overflow-hidden aspect-[16/7]">
            <ClockPreview
              timezone={timezone} format={format} font={font} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize} showSeconds={showSeconds} showDate={showDate} blink={blink}
              dateColor={dateColor} dateFmt={dateFmt}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
