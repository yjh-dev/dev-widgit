"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import CountdownPreview from "@/components/widget/CountdownPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useCountdownStore } from "@/store/useCountdownStore";
import { countdownPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";

export default function CreateCountdownPage() {
  const {
    minutes, seconds, showMs, autoRestart,
    accentColor, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setMinutes, setSeconds, setShowMs, setAutoRestart,
    setAccentColor, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useCountdownStore();

  useInitFromUrl((p) => {
    const bgVal = p.get("bg");
    loadPreset({
      ...(p.has("min") && { minutes: Math.max(0, Math.min(999, Number(p.get("min")) || 5)) }),
      ...(p.has("sec") && { seconds: Math.max(0, Math.min(59, Number(p.get("sec")) || 0)) }),
      ...(p.has("showMs") && { showMs: p.get("showMs") === "true" }),
      ...(p.has("autoRestart") && { autoRestart: p.get("autoRestart") === "true" }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(bgVal === "transparent"
        ? { transparentBg: true }
        : bgVal
          ? { bg: bgVal, transparentBg: false }
          : {}),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/countdown`;
    const params = new URLSearchParams();
    if (minutes !== 5) params.set("min", String(minutes));
    if (seconds !== 0) params.set("sec", String(seconds));
    if (showMs) params.set("showMs", "true");
    if (autoRestart) params.set("autoRestart", "true");
    if (accentColor !== "E11D48") params.set("accent", accentColor);
    if (color !== "1E1E1E") params.set("color", color);
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
  }, [minutes, seconds, showMs, autoRestart, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="카운트다운 타이머 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={countdownPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="minutes">분</Label>
                      <Input
                        id="minutes"
                        type="number"
                        min={0}
                        max={999}
                        value={minutes}
                        onChange={(e) =>
                          setMinutes(
                            Math.max(0, Math.min(999, Number(e.target.value) || 0)),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seconds">초</Label>
                      <Input
                        id="seconds"
                        type="number"
                        min={0}
                        max={59}
                        value={seconds}
                        onChange={(e) =>
                          setSeconds(
                            Math.max(0, Math.min(59, Number(e.target.value) || 0)),
                          )
                        }
                      />
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
                      <Label htmlFor="showMs">밀리초 표시</Label>
                      <Switch
                        id="showMs"
                        checked={showMs}
                        onCheckedChange={setShowMs}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoRestart">자동 재시작</Label>
                      <Switch
                        id="autoRestart"
                        checked={autoRestart}
                        onCheckedChange={setAutoRestart}
                      />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker
                      id="accentColor"
                      label="강조 색상"
                      value={accentColor}
                      onChange={setAccentColor}
                      placeholder="E11D48"
                    />
                    <ColorPicker
                      id="color"
                      label="글자 색상"
                      value={color}
                      onChange={setColor}
                      placeholder="1E1E1E"
                    />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch
                        id="transparent"
                        checked={transparentBg}
                        onCheckedChange={setTransparentBg}
                      />
                    </div>
                    {!transparentBg && (
                      <ColorPicker
                        id="bg"
                        label="배경색"
                        value={bg}
                        onChange={setBg}
                        placeholder="FFFFFF"
                      />
                    )}
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions
              widgetUrl={widgetUrl}
              onCopy={handleCopy}
              onReset={reset}
              onApplyTheme={(c) => useCountdownStore.setState(c)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[1/1]">
            <CountdownPreview
              minutes={minutes}
              seconds={seconds}
              showMs={showMs}
              autoRestart={autoRestart}
              accentColor={accentColor}
              color={color}
              bg={bg}
              transparentBg={transparentBg}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
