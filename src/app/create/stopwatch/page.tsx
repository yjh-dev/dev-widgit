"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import StopwatchPreview from "@/components/widget/StopwatchPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useStopwatchStore } from "@/store/useStopwatchStore";
import { stopwatchPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateStopwatchPage() {
  const {
    showMs, showLap,
    color, btnColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setShowMs, setShowLap,
    setColor, setBtnColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useStopwatchStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("showMs") && { showMs: p.get("showMs") === "true" }),
      ...(p.has("showLap") && { showLap: p.get("showLap") === "true" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("btnColor") && { btnColor: p.get("btnColor")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/stopwatch`;
    const params = new URLSearchParams();
    if (showMs) params.set("showMs", "true");
    if (showLap) params.set("showLap", "true");
    if (color !== "1E1E1E") params.set("color", color);
    if (btnColor !== "2563EB") params.set("btnColor", btnColor);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    return buildUrl(base, params);
  }, [showMs, showLap, color, btnColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="스톱워치 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={stopwatchPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showMs">밀리초 표시</Label>
                      <Switch id="showMs" checked={showMs} onCheckedChange={setShowMs} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLap">랩 타임 표시</Label>
                      <Switch id="showLap" checked={showLap} onCheckedChange={setShowLap} />
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
                    <ColorPicker id="btnColor" label="버튼 색상" value={btnColor} onChange={setBtnColor} placeholder="2563EB" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useStopwatchStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <StopwatchPreview
              showMs={showMs} showLap={showLap} color={color} btnColor={btnColor}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
