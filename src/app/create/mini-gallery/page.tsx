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
import MiniGalleryPreview from "@/components/widget/MiniGalleryPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useMiniGalleryStore } from "@/store/useMiniGalleryStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import type { GalleryTransition } from "@/lib/mini-gallery";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";

export default function CreateMiniGalleryPage() {
  const {
    images, interval, transition, showDots, color, textColor, font,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    setImages, setInterval: setStoreInterval, setTransition, setShowDots,
    setColor, setTextColor, setFont, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useMiniGalleryStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...parseCommonParams(p),
      ...(p.has("images") && { images: p.get("images")!.split("|").filter(Boolean) }),
      ...(p.has("interval") && { interval: Number(p.get("interval")) }),
      ...(p.has("transition") && { transition: p.get("transition") as GalleryTransition }),
      ...(p.has("showDots") && { showDots: p.get("showDots") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
    });
  });

  const handleTextareaChange = (value: string) => {
    const urls = value.split("\n").map((line) => line.trim()).filter(Boolean);
    setImages(urls);
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/mini-gallery`;
    const params = new URLSearchParams();
    if (images.length > 0) params.set("images", images.join("|"));
    if (interval !== 5) params.set("interval", String(interval));
    if (transition !== "fade") params.set("transition", transition);
    if (!showDots) params.set("showDots", "false");
    if (color !== "1E1E1E") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [images, interval, transition, showDots, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="미니 갤러리 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="images">이미지 URL (줄바꿈으로 구분)</Label>
                      <textarea
                        id="images"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
                        value={images.join("\n")}
                        onChange={(e) => handleTextareaChange(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        각 줄에 하나의 이미지 URL을 입력하세요
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interval">전환 간격 (초)</Label>
                      <Input
                        id="interval"
                        type="number"
                        min={1}
                        max={30}
                        value={interval}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 1 && v <= 30) setStoreInterval(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>전환 효과</Label>
                      <Select value={transition} onValueChange={(v) => setTransition(v as GalleryTransition)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fade">페이드</SelectItem>
                          <SelectItem value="slide">슬라이드</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDots">인디케이터 표시</Label>
                      <Switch id="showDots" checked={showDots} onCheckedChange={setShowDots} />
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {GENERAL_FONT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
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
                    <ColorPicker id="color" label="인디케이터 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="인디케이터 색상과 동일" />
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
                    borderRadius={borderRadius}
                    padding={padding}
                    fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius}
                    onPaddingChange={setPadding}
                    onFontSizeChange={setFontSize}
                    tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
                    onTshadowChange={setTshadow} onBwChange={setBw} onBcChange={setBc}
                    onOpacityChange={setOpacity} onLsChange={setLs}
                    entrance={entrance} entranceDelay={entranceDelay}
                    onEntranceChange={setEntrance} onEntranceDelayChange={setEntranceDelay}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useMiniGalleryStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-square">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <MiniGalleryPreview
                images={images}
                interval={interval}
                transition={transition}
                showDots={showDots}
                color={color}
                textColor={textColor}
                bg={bg}
                transparentBg={transparentBg}
                borderRadius={borderRadius}
                padding={padding}
                fontSize={fontSize}
                font={font}
              />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
