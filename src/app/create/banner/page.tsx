"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import BannerPreview from "@/components/widget/BannerPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useBannerStore } from "@/store/useBannerStore";
import { bannerPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { BannerAnimation, BannerAlign } from "@/lib/banner";
import type { FontSizeKey } from "@/lib/common-widget-options";

export default function CreateBannerPage() {
  const {
    texts, animation, speed, align, bold, font,
    color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTexts, setAnimation, setSpeed, setAlign, setBold, setFont,
    setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useBannerStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("texts") && { texts: p.get("texts")!.split("|").map(decodeURIComponent) }),
      ...(p.has("anim") && { animation: p.get("anim") as BannerAnimation }),
      ...(p.has("speed") && { speed: Number(p.get("speed")) }),
      ...(p.has("align") && { align: p.get("align") as BannerAlign }),
      ...(p.has("bold") && { bold: p.get("bold") !== "false" }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("bg") && {
        ...(p.get("bg") === "transparent"
          ? { transparentBg: true }
          : { bg: p.get("bg")!, transparentBg: false }),
      }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const [newText, setNewText] = useState("");

  const handleAddText = () => {
    if (!newText.trim()) return;
    setTexts([...texts, newText.trim()]);
    setNewText("");
  };

  const handleRemoveText = (index: number) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  const handleUpdateText = (index: number, value: string) => {
    const updated = [...texts];
    updated[index] = value;
    setTexts(updated);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/banner`;
    const params = new URLSearchParams();
    if (texts.length > 0) {
      params.set("texts", texts.map(encodeURIComponent).join("|"));
    }
    if (animation !== "none") params.set("anim", animation);
    if (speed !== 3) params.set("speed", String(speed));
    if (align !== "center") params.set("align", align);
    if (!bold) params.set("bold", "false");
    if (font !== "sans") params.set("font", font);
    if (color !== "1E1E1E") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "lg") params.set("fsize", fontSize);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [texts, animation, speed, align, bold, font, color, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="텍스트 배너 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={bannerPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["texts"]}
            sections={[
              {
                id: "texts",
                title: "텍스트",
                children: (
                  <>
                    {texts.map((text, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          value={text}
                          onChange={(e) => handleUpdateText(i, e.target.value)}
                          placeholder={`텍스트 ${i + 1}`}
                        />
                        {texts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveText(i)}
                            className="text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Input
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="새 텍스트 추가"
                        onKeyDown={(e) => e.key === "Enter" && handleAddText()}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={handleAddText} disabled={!newText.trim()}>
                        추가
                      </Button>
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
                      <Label>애니메이션</Label>
                      <Select value={animation} onValueChange={(v) => setAnimation(v as BannerAnimation)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">없음</SelectItem>
                          <SelectItem value="scroll">스크롤 (좌로 흐름)</SelectItem>
                          <SelectItem value="fade">페이드 (순환 전환)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {animation !== "none" && (
                      <div className="space-y-2">
                        <Label htmlFor="speed">속도 (초)</Label>
                        <Input
                          id="speed" type="number" min={1} max={10}
                          value={speed}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v >= 1 && v <= 10) setSpeed(v);
                          }}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>정렬</Label>
                      <Select value={align} onValueChange={(v) => setAlign(v as BannerAlign)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">왼쪽</SelectItem>
                          <SelectItem value="center">가운데</SelectItem>
                          <SelectItem value="right">오른쪽</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bold">굵게</Label>
                      <Switch id="bold" checked={bold} onCheckedChange={setBold} />
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans">Sans-serif</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                      </Select>
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useBannerStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[3/1]">
            <BannerPreview
              texts={texts} animation={animation} speed={speed} align={align}
              bold={bold} font={font} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
