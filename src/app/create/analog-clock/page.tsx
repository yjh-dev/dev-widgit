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
import AnalogClockPreview from "@/components/widget/AnalogClockPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useAnalogClockStore } from "@/store/useAnalogClockStore";
import { analogClockPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { TIMEZONE_OPTIONS } from "@/lib/clock";
import type { NumberStyle } from "@/lib/analog-clock";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateAnalogClockPage() {
  const {
    timezone, showNumbers, numStyle, showSeconds, showTicks, showBorder,
    handColor, secHandColor, faceColor, tickColor, borderColor,
    bg, transparentBg, borderRadius, padding, fontSize,
    setTimezone, setShowNumbers, setNumStyle, setShowSeconds, setShowTicks, setShowBorder,
    setHandColor, setSecHandColor, setFaceColor, setTickColor, setBorderColor,
    setBg, setTransparentBg, setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useAnalogClockStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("timezone") && { timezone: p.get("timezone")! }),
      ...(p.has("numbers") && { showNumbers: p.get("numbers") !== "false" }),
      ...(p.has("numStyle") && { numStyle: p.get("numStyle") as NumberStyle }),
      ...(p.has("seconds") && { showSeconds: p.get("seconds") !== "false" }),
      ...(p.has("ticks") && { showTicks: p.get("ticks") !== "false" }),
      ...(p.has("showBorder") && { showBorder: p.get("showBorder") !== "false" }),
      ...(p.has("hand") && { handColor: p.get("hand")! }),
      ...(p.has("secHand") && { secHandColor: p.get("secHand")! }),
      ...(p.has("face") && { faceColor: p.get("face")! }),
      ...(p.has("tick") && { tickColor: p.get("tick")! }),
      ...(p.has("border") && { borderColor: p.get("border")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/analog-clock`;
    const params = new URLSearchParams();
    if (timezone !== "Asia/Seoul") params.set("timezone", timezone);
    if (!showNumbers) params.set("numbers", "false");
    if (numStyle !== "quarter") params.set("numStyle", numStyle);
    if (!showSeconds) params.set("seconds", "false");
    if (!showTicks) params.set("ticks", "false");
    if (!showBorder) params.set("showBorder", "false");
    if (handColor !== "1E1E1E") params.set("hand", handColor);
    if (secHandColor !== "E11D48") params.set("secHand", secHandColor);
    if (faceColor !== "FFFFFF") params.set("face", faceColor);
    if (tickColor !== "999999") params.set("tick", tickColor);
    if (borderColor !== "1E1E1E") params.set("border", borderColor);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    return buildUrl(base, params);
  }, [timezone, showNumbers, numStyle, showSeconds, showTicks, showBorder, handColor, secHandColor, faceColor, tickColor, borderColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="아날로그 시계 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={analogClockPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
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
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showNumbers">숫자 표시</Label>
                      <Switch id="showNumbers" checked={showNumbers} onCheckedChange={setShowNumbers} />
                    </div>
                    {showNumbers && (
                      <div className="space-y-2">
                        <Label>숫자 스타일</Label>
                        <Select value={numStyle} onValueChange={(v) => setNumStyle(v as NumberStyle)}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quarter">4방향 (12, 3, 6, 9)</SelectItem>
                            <SelectItem value="all">전체 (1~12)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showSeconds">초침 표시</Label>
                      <Switch id="showSeconds" checked={showSeconds} onCheckedChange={setShowSeconds} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTicks">눈금 표시</Label>
                      <Switch id="showTicks" checked={showTicks} onCheckedChange={setShowTicks} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showBorder">테두리</Label>
                      <Switch id="showBorder" checked={showBorder} onCheckedChange={setShowBorder} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="handColor" label="시/분침 색상" value={handColor} onChange={setHandColor} placeholder="1E1E1E" />
                    {showSeconds && (
                      <ColorPicker id="secHandColor" label="초침 색상" value={secHandColor} onChange={setSecHandColor} placeholder="E11D48" />
                    )}
                    <ColorPicker id="faceColor" label="문자판 색상" value={faceColor} onChange={setFaceColor} placeholder="FFFFFF" />
                    {showTicks && (
                      <ColorPicker id="tickColor" label="눈금 색상" value={tickColor} onChange={setTickColor} placeholder="999999" />
                    )}
                    {showBorder && (
                      <ColorPicker id="borderColor" label="테두리 색상" value={borderColor} onChange={setBorderColor} placeholder="1E1E1E" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useAnalogClockStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-square">
            <AnalogClockPreview
              timezone={timezone} showNumbers={showNumbers} numStyle={numStyle}
              showSeconds={showSeconds} showTicks={showTicks} showBorder={showBorder}
              handColor={handColor} secHandColor={secHandColor} faceColor={faceColor}
              tickColor={tickColor} borderColor={borderColor} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
