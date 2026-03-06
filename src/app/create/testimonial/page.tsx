"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import TestimonialPreview from "@/components/widget/TestimonialPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useTestimonialStore } from "@/store/useTestimonialStore";
import { testimonialPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { TestimonialLayout } from "@/lib/testimonial";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { addEffectParams, addExtraStyleParams , addEntranceParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

export default function CreateTestimonialPage() {
  const {
    quote, author, role, avatarUrl,
    showAvatar, showRole, showQuoteMarks, layout,
    showRating, rating, maxStars,
    accentColor, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setQuote, setAuthor, setRole, setAvatarUrl,
    setShowAvatar, setShowRole, setShowQuoteMarks, setLayout,
    setShowRating, setRating, setMaxStars,
    setAccentColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useTestimonialStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("quote") && { quote: p.get("quote")! }),
      ...(p.has("author") && { author: p.get("author")! }),
      ...(p.has("role") && { role: p.get("role")! }),
      ...(p.has("avatarUrl") && { avatarUrl: p.get("avatarUrl")! }),
      ...(p.has("showAvatar") && { showAvatar: p.get("showAvatar") !== "false" }),
      ...(p.has("showRole") && { showRole: p.get("showRole") !== "false" }),
      ...(p.has("showQuoteMarks") && { showQuoteMarks: p.get("showQuoteMarks") !== "false" }),
      ...(p.has("layout") && { layout: p.get("layout") as TestimonialLayout }),
      ...(p.has("showRating") && { showRating: p.get("showRating") === "true" }),
      ...(p.has("rating") && { rating: Number(p.get("rating")) }),
      ...(p.has("maxStars") && { maxStars: Number(p.get("maxStars")) }),
      ...(p.has("accentColor") && { accentColor: p.get("accentColor")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("bg") && {
        ...(p.get("bg") === "transparent"
          ? { transparentBg: true }
          : { bg: p.get("bg")!, transparentBg: false }),
      }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/testimonial`;
    const params = new URLSearchParams();
    if (quote !== "이 서비스를 사용한 후 생산성이 크게 향상되었습니다. 강력히 추천합니다!") params.set("quote", quote);
    if (author !== "김지수") params.set("author", author);
    if (role !== "프로덕트 매니저") params.set("role", role);
    if (avatarUrl) params.set("avatarUrl", avatarUrl);
    if (!showAvatar) params.set("showAvatar", "false");
    if (!showRole) params.set("showRole", "false");
    if (!showQuoteMarks) params.set("showQuoteMarks", "false");
    if (layout !== "card") params.set("layout", layout);
    if (showRating) params.set("showRating", "true");
    if (showRating && rating !== 0) params.set("rating", String(rating));
    if (showRating && maxStars !== 5) params.set("maxStars", String(maxStars));
    if (accentColor !== "6366F1") params.set("accentColor", accentColor);
    if (textColor) params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [quote, author, role, avatarUrl, showAvatar, showRole, showQuoteMarks, layout, showRating, rating, maxStars, accentColor, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="후기 카드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={testimonialPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="quote">후기 내용</Label>
                      <textarea
                        id="quote"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px] resize-y"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="후기 내용을 입력하세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">작성자</Label>
                      <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="이름" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">직함 / 소속</Label>
                      <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="프로덕트 매니저" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatarUrl">아바타 이미지 URL</Label>
                      <Input id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.jpg" />
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
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as TestimonialLayout)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">카드</SelectItem>
                          <SelectItem value="minimal">미니멀</SelectItem>
                          <SelectItem value="centered">중앙 정렬</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showAvatar">아바타 표시</Label>
                      <Switch id="showAvatar" checked={showAvatar} onCheckedChange={setShowAvatar} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showRole">직함 표시</Label>
                      <Switch id="showRole" checked={showRole} onCheckedChange={setShowRole} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showQuoteMarks">따옴표 장식</Label>
                      <Switch id="showQuoteMarks" checked={showQuoteMarks} onCheckedChange={setShowQuoteMarks} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showRating">별점 표시</Label>
                      <Switch id="showRating" checked={showRating} onCheckedChange={setShowRating} />
                    </div>
                    {showRating && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="rating">별점 (0.5 단위)</Label>
                          <Input
                            id="rating" type="number" min={0} max={maxStars} step={0.5}
                            value={rating}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              if (v >= 0 && v <= maxStars) setRating(v);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxStars">최대 별 수</Label>
                          <Input
                            id="maxStars" type="number" min={1} max={10}
                            value={maxStars}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              if (v >= 1 && v <= 10) setMaxStars(v);
                            }}
                          />
                        </div>
                      </>
                    )}
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="강조 색상" value={accentColor} onChange={setAccentColor} placeholder="6366F1" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 기본)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useTestimonialStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <TestimonialPreview
              quote={quote} author={author} role={role} avatarUrl={avatarUrl}
              showAvatar={showAvatar} showRole={showRole} showQuoteMarks={showQuoteMarks}
              showRating={showRating} rating={rating} maxStars={maxStars}
              layout={layout} accentColor={accentColor} textColor={textColor}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
