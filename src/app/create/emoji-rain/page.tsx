"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmojiRainPreview from "@/components/widget/EmojiRainPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import PresetSelector from "@/components/editor/PresetSelector";
import { useEmojiRainStore } from "@/store/useEmojiRainStore";
import { emojiRainPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import {
  SPEED_OPTIONS,
  DENSITY_OPTIONS,
  type SpeedKey,
  type DensityKey,
} from "@/lib/emoji-rain";
import {
  BORDER_RADIUS_OPTIONS,
  PADDING_OPTIONS,
} from "@/lib/common-widget-options";

export default function CreateEmojiRainPage() {
  const {
    emojis, speed, density, minSize, maxSize,
    bg, transparentBg, borderRadius, padding,
    setEmojis, setSpeed, setDensity, setMinSize, setMaxSize,
    setBg, setTransparentBg, setBorderRadius, setPadding,
    loadPreset, reset,
  } = useEmojiRainStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/emoji-rain`;
    const params = new URLSearchParams();
    if (emojis !== "🎉🎊✨💖🌟") params.set("emojis", emojis);
    if (speed !== "normal") params.set("speed", speed);
    if (density !== "normal") params.set("density", density);
    if (minSize !== 16) params.set("minSize", String(minSize));
    if (maxSize !== 32) params.set("maxSize", String(maxSize));
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [emojis, speed, density, minSize, maxSize, bg, transparentBg, borderRadius, padding]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="이모지 비 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={emojiRainPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="emojis">이모지</Label>
                      <Input
                        id="emojis"
                        value={emojis}
                        onChange={(e) => setEmojis(e.target.value)}
                        placeholder="🎉🎊✨💖🌟"
                      />
                      <p className="text-xs text-muted-foreground">
                        사용할 이모지를 입력하세요
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>속도</Label>
                      <Select value={speed} onValueChange={(v) => setSpeed(v as SpeedKey)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SPEED_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>밀도</Label>
                      <Select value={density} onValueChange={(v) => setDensity(v as DensityKey)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DENSITY_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ),
              },
              {
                id: "size",
                title: "크기",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="minSize">최소 크기 (px)</Label>
                      <Input
                        id="minSize"
                        type="number"
                        min={8}
                        max={64}
                        value={minSize}
                        onChange={(e) => setMinSize(Math.max(8, Math.min(64, Number(e.target.value) || 8)))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSize">최대 크기 (px)</Label>
                      <Input
                        id="maxSize"
                        type="number"
                        min={8}
                        max={64}
                        value={maxSize}
                        onChange={(e) => setMaxSize(Math.max(8, Math.min(64, Number(e.target.value) || 32)))}
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
                  <>
                    <div className="space-y-2">
                      <Label>모서리 둥글기</Label>
                      <Select
                        value={String(borderRadius)}
                        onValueChange={(v) => setBorderRadius(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {BORDER_RADIUS_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={String(opt.value)}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>안쪽 여백</Label>
                      <Select
                        value={String(padding)}
                        onValueChange={(v) => setPadding(Number(v))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PADDING_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={String(opt.value)}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
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
          <div className="border rounded-lg overflow-hidden min-h-[300px]">
            <EmojiRainPreview
              emojis={emojis}
              speed={speed}
              density={density}
              minSize={minSize}
              maxSize={maxSize}
              bg={bg}
              transparentBg={transparentBg}
              borderRadius={borderRadius}
              padding={padding}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
