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
import ImageCardPreview from "@/components/widget/ImageCardPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useImageCardStore } from "@/store/useImageCardStore";
import { imageCardPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { ImageFit, CaptionPosition } from "@/lib/image-card";
import { addEffectParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateImageCardPage() {
  const {
    imageUrl, caption, linkUrl, fit, captionPos, showCaption,
    color, bg, transparentBg, borderRadius, padding, fontSize,
    setImageUrl, setCaption, setLinkUrl, setFit, setCaptionPos, setShowCaption,
    setColor, setBg, setTransparentBg, setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    loadPreset, reset,
  } = useImageCardStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("img") && { imageUrl: p.get("img")! }),
      ...(p.has("caption") && { caption: p.get("caption")! }),
      ...(p.has("link") && { linkUrl: p.get("link")! }),
      ...(p.has("fit") && { fit: p.get("fit") as ImageFit }),
      ...(p.has("captionPos") && { captionPos: p.get("captionPos") as CaptionPosition }),
      ...(p.has("showCaption") && { showCaption: p.get("showCaption") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("bg") && p.get("bg") === "transparent"
        ? { transparentBg: true }
        : p.has("bg") && { bg: p.get("bg")!, transparentBg: false }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/image-card`;
    const params = new URLSearchParams();
    if (imageUrl) params.set("img", imageUrl);
    if (caption) params.set("caption", caption);
    if (linkUrl) params.set("link", linkUrl);
    if (fit !== "cover") params.set("fit", fit);
    if (captionPos !== "bottom") params.set("captionPos", captionPos);
    if (!showCaption) params.set("showCaption", "false");
    if (color !== "1E1E1E") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [imageUrl, caption, linkUrl, fit, captionPos, showCaption, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="이미지 카드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={imageCardPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">이미지 URL</Label>
                      <Input
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caption">캡션</Label>
                      <Input
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="이미지 설명"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkUrl">링크 URL (클릭 시 이동)</Label>
                      <Input
                        id="linkUrl"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
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
                    <div className="space-y-2">
                      <Label>이미지 맞춤</Label>
                      <Select value={fit} onValueChange={(v) => setFit(v as ImageFit)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cover">채우기 (cover)</SelectItem>
                          <SelectItem value="contain">맞추기 (contain)</SelectItem>
                          <SelectItem value="fill">늘리기 (fill)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showCaption">캡션 표시</Label>
                      <Switch id="showCaption" checked={showCaption} onCheckedChange={setShowCaption} />
                    </div>
                    {showCaption && (
                      <div className="space-y-2">
                        <Label>캡션 위치</Label>
                        <Select value={captionPos} onValueChange={(v) => setCaptionPos(v as CaptionPosition)}>
                          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">상단</SelectItem>
                            <SelectItem value="bottom">하단</SelectItem>
                            <SelectItem value="overlay">오버레이</SelectItem>
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
                id: "effects",
                title: "효과",
                children: (
                  <>
                    <EffectPresetSelector onSelect={loadPreset} />
                    <EffectOptions
                      fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
                      neonColor={neonColor} bshadow={bshadow}
                      onFxChange={setFx} onFxIntChange={setFxInt}
                      onGbgChange={setGbg} onGbgDirChange={setGbgDir}
                      onNeonColorChange={setNeonColor} onBshadowChange={setBshadow}
                    />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useImageCardStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
            >
              <ImageCardPreview
              imageUrl={imageUrl}
              caption={caption}
              linkUrl={linkUrl}
              fit={fit}
              captionPos={captionPos}
              showCaption={showCaption}
              color={color}
              bg={bg}
              transparentBg={transparentBg}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
              linkable={false}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
