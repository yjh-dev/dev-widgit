"use client";

import { useState, useMemo, useCallback, useEffect, startTransition } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  RotateCcw,
  X,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColorPicker from "@/components/ui/color-picker";
import ThemeToggle from "@/components/ui/theme-toggle";
import { copyToClipboard } from "@/lib/clipboard";


type CoverType = "gradient" | "pattern" | "text" | "solid";
type PatternType = "dots" | "grid" | "diagonal" | "waves";
type PatternScale = "sm" | "md" | "lg";
type TextAlign = "left" | "center" | "right";

interface CoverPreset {
  name: string;
  type: CoverType;
  colors: string[];
  dir?: number;
  pattern?: PatternType;
  patternColor?: string;
  patternScale?: PatternScale;
  text?: string;
  subtitle?: string;
  textColor?: string;
}

const PRESETS: CoverPreset[] = [
  { name: "오션", type: "gradient", colors: ["0EA5E9", "6366F1"], dir: 135 },
  { name: "선셋", type: "gradient", colors: ["F59E0B", "EF4444", "7C3AED"], dir: 135 },
  { name: "미니멀 다크", type: "solid", colors: ["1A1A2E"] },
  { name: "도트 패턴", type: "pattern", colors: ["F0F9FF"], pattern: "dots", patternColor: "3B82F6" },
  { name: "모노크롬", type: "gradient", colors: ["374151", "1F2937"], dir: 180 },
  { name: "파스텔", type: "gradient", colors: ["FDE68A", "A7F3D0", "BAE6FD"], dir: 90 },
  { name: "네온", type: "gradient", colors: ["7C3AED", "EC4899", "F59E0B"], dir: 135 },
  { name: "포레스트", type: "gradient", colors: ["065F46", "10B981"], dir: 180 },
];

const DEFAULTS = {
  type: "gradient" as CoverType,
  colors: ["6366F1", "EC4899"],
  dir: 135,
  text: "",
  subtitle: "",
  textColor: "FFFFFF",
  pattern: "dots" as PatternType,
  patternColor: "",
  patternScale: "md" as PatternScale,
  align: "center" as TextAlign,
};

function InitFromUrl({
  onInit,
}: {
  onInit: (p: URLSearchParams) => void;
}) {
  const searchParams = useSearchParams();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done && searchParams.toString()) {
      onInit(searchParams);
      startTransition(() => { setDone(true); });
    }
  }, [searchParams, onInit, done]);
  return null;
}

export default function CreateCoverPage() {
  const [type, setType] = useState<CoverType>(DEFAULTS.type);
  const [colors, setColors] = useState<string[]>(DEFAULTS.colors);
  const [dir, setDir] = useState(DEFAULTS.dir);
  const [text, setText] = useState(DEFAULTS.text);
  const [subtitle, setSubtitle] = useState(DEFAULTS.subtitle);
  const [textColor, setTextColor] = useState(DEFAULTS.textColor);
  const [pattern, setPattern] = useState<PatternType>(DEFAULTS.pattern);
  const [patternColor, setPatternColor] = useState(DEFAULTS.patternColor);
  const [patternScale, setPatternScale] = useState<PatternScale>(DEFAULTS.patternScale);
  const [align, setAlign] = useState<TextAlign>(DEFAULTS.align);
  const [guideOpen, setGuideOpen] = useState(false);

  const handleInit = useCallback((p: URLSearchParams) => {
    if (p.has("type")) setType(p.get("type") as CoverType);
    if (p.has("colors")) setColors(p.get("colors")!.split("|"));
    if (p.has("dir")) setDir(Number(p.get("dir")));
    if (p.has("text")) setText(p.get("text")!);
    if (p.has("subtitle")) setSubtitle(p.get("subtitle")!);
    if (p.has("textColor")) setTextColor(p.get("textColor")!);
    if (p.has("pattern")) setPattern(p.get("pattern") as PatternType);
    if (p.has("patternColor")) setPatternColor(p.get("patternColor")!);
    if (p.has("patternScale")) setPatternScale(p.get("patternScale") as PatternScale);
    if (p.has("align")) setAlign(p.get("align") as TextAlign);
  }, []);

  const handleColorChange = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const handleAddColor = () => {
    if (colors.length < 4) setColors([...colors, "F59E0B"]);
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length > 1) setColors(colors.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: CoverPreset) => {
    setType(preset.type);
    setColors([...preset.colors]);
    if (preset.dir !== undefined) setDir(preset.dir);
    if (preset.pattern) setPattern(preset.pattern);
    if (preset.patternColor) setPatternColor(preset.patternColor);
    if (preset.patternScale) setPatternScale(preset.patternScale);
    if (preset.text !== undefined) setText(preset.text);
    if (preset.subtitle !== undefined) setSubtitle(preset.subtitle);
    if (preset.textColor) setTextColor(preset.textColor);
  };

  const handleReset = () => {
    setType(DEFAULTS.type);
    setColors([...DEFAULTS.colors]);
    setDir(DEFAULTS.dir);
    setText(DEFAULTS.text);
    setSubtitle(DEFAULTS.subtitle);
    setTextColor(DEFAULTS.textColor);
    setPattern(DEFAULTS.pattern);
    setPatternColor(DEFAULTS.patternColor);
    setPatternScale(DEFAULTS.patternScale);
    setAlign(DEFAULTS.align);
  };

  const coverUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/api/cover`;
    const params = new URLSearchParams();
    if (type !== "gradient") params.set("type", type);
    const currentColors = colors.join("|");
    if (currentColors !== "6366F1|EC4899") params.set("colors", currentColors);
    if (dir !== 135) params.set("dir", String(dir));
    if (text) params.set("text", text);
    if (subtitle) params.set("subtitle", subtitle);
    if (textColor !== "FFFFFF") params.set("textColor", textColor);
    if (type === "pattern") {
      if (pattern !== "dots") params.set("pattern", pattern);
      if (patternColor) params.set("patternColor", patternColor);
      if (patternScale !== "md") params.set("patternScale", patternScale);
    }
    if (align !== "center") params.set("align", align);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [type, colors, dir, text, subtitle, textColor, pattern, patternColor, patternScale, align]);

  const handleCopy = async () => {
    await copyToClipboard(coverUrl);
    toast.success("커버 이미지 URL이 복사되었습니다!");
  };

  // Local CSS preview background
  const previewBg = useMemo(() => {
    switch (type) {
      case "solid":
        return `#${colors[0]}`;
      case "pattern":
        return `#${colors[0]}`;
      case "text":
        return colors.length >= 2
          ? `linear-gradient(${dir}deg, ${colors.map((c) => `#${c}`).join(", ")})`
          : `#${colors[0]}`;
      case "gradient":
      default:
        return `linear-gradient(${dir}deg, ${colors.map((c) => `#${c}`).join(", ")})`;
    }
  }, [type, colors, dir]);

  // Build SVG pattern for local preview
  const previewPattern = useMemo(() => {
    if (type !== "pattern") return undefined;
    const effectiveColor = patternColor || (colors.length > 1 ? colors[1] : "3B82F6");
    const size = { sm: 16, md: 24, lg: 36 }[patternScale];
    const hex = `#${effectiveColor}`;
    let svg = "";
    switch (pattern) {
      case "dots": {
        const r = Math.max(size / 8, 1.5);
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${hex}" opacity="0.35"/></svg>`;
        break;
      }
      case "grid":
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M${size} 0L${size} ${size}M0 ${size}L${size} ${size}" stroke="${hex}" stroke-width="0.8" opacity="0.25"/></svg>`;
        break;
      case "diagonal":
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path d="M0 ${size}L${size} 0M-${size / 4} ${size / 4}L${size / 4} -${size / 4}M${(size * 3) / 4} ${size + size / 4}L${size + size / 4} ${(size * 3) / 4}" stroke="${hex}" stroke-width="1" opacity="0.25"/></svg>`;
        break;
      case "waves": {
        const h = size;
        const w = size * 2;
        svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><path d="M0 ${h / 2}Q${w / 4} 0 ${w / 2} ${h / 2}Q${(w * 3) / 4} ${h} ${w} ${h / 2}" fill="none" stroke="${hex}" stroke-width="1" opacity="0.3"/></svg>`;
        break;
      }
    }
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [type, pattern, patternColor, patternScale, colors]);

  const resolveAlign = (a: TextAlign) =>
    a === "left" ? "flex-start" : a === "right" ? "flex-end" : "center";

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <Suspense fallback={null}>
        <InitFromUrl onInit={handleInit} />
      </Suspense>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-2xl font-bold mb-1">커버 이미지 만들기</h1>
        <p className="text-muted-foreground text-sm mb-8">
          노션 페이지 커버 이미지를 URL로 생성합니다. 설정을 변경하면 미리보기에 실시간으로 반영됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: options */}
          <div className="space-y-4">
            {/* Presets */}
            <Card>
              <CardContent className="pt-6">
                <Label className="mb-2 block">프리셋</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="h-7 px-3 rounded-md border text-xs font-medium hover:bg-accent transition-colors flex items-center gap-1.5"
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          background:
                            preset.colors.length >= 2
                              ? `linear-gradient(135deg, #${preset.colors[0]}, #${preset.colors[preset.colors.length - 1]})`
                              : `#${preset.colors[0]}`,
                        }}
                      />
                      {preset.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Type */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>커버 타입</Label>
                  <Select value={type} onValueChange={(v) => setType(v as CoverType)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gradient">그라데이션</SelectItem>
                      <SelectItem value="pattern">패턴</SelectItem>
                      <SelectItem value="text">텍스트</SelectItem>
                      <SelectItem value="solid">단색</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Gradient direction */}
                {(type === "gradient" || type === "text") && (
                  <div className="space-y-2">
                    <Label htmlFor="dir">방향 (0~360)</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        id="dir"
                        min={0}
                        max={360}
                        value={dir}
                        onChange={(e) => setDir(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground w-10 text-right">
                        {dir}&deg;
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDir(d)}
                          className={`px-2 py-0.5 rounded text-xs border transition-colors ${
                            dir === d
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {d}&deg;
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pattern options */}
                {type === "pattern" && (
                  <>
                    <div className="space-y-2">
                      <Label>패턴 종류</Label>
                      <Select value={pattern} onValueChange={(v) => setPattern(v as PatternType)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dots">도트</SelectItem>
                          <SelectItem value="grid">격자</SelectItem>
                          <SelectItem value="diagonal">대각선</SelectItem>
                          <SelectItem value="waves">물결</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>패턴 크기</Label>
                      <Select value={patternScale} onValueChange={(v) => setPatternScale(v as PatternScale)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">작게</SelectItem>
                          <SelectItem value="md">보통</SelectItem>
                          <SelectItem value="lg">크게</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <ColorPicker
                      id="patternColor"
                      label="패턴 색상 (비우면 자동)"
                      value={patternColor}
                      onChange={setPatternColor}
                      placeholder="3B82F6"
                    />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Label>
                  {type === "solid" ? "배경색" : "색상"}
                </Label>
                {colors.map((c, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <div className="flex-1">
                      <ColorPicker
                        id={`color-${i}`}
                        label={type === "solid" ? undefined : `색상 ${i + 1}`}
                        value={c}
                        onChange={(v) => handleColorChange(i, v)}
                      />
                    </div>
                    {type !== "solid" && colors.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(i)}
                        className="text-muted-foreground hover:text-destructive shrink-0 pb-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {type !== "solid" && colors.length < 4 && (
                  <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                    색상 추가
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Text */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover-text">텍스트</Label>
                  <Input
                    id="cover-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="제목 텍스트 (선택)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover-subtitle">서브 텍스트</Label>
                  <Input
                    id="cover-subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="부제목 (선택)"
                  />
                </div>
                {(text || subtitle) && (
                  <>
                    <ColorPicker
                      id="textColor"
                      label="텍스트 색상"
                      value={textColor}
                      onChange={setTextColor}
                      placeholder="FFFFFF"
                    />
                    <div className="space-y-2">
                      <Label>텍스트 정렬</Label>
                      <Select value={align} onValueChange={(v) => setAlign(v as TextAlign)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">왼쪽</SelectItem>
                          <SelectItem value="center">가운데</SelectItem>
                          <SelectItem value="right">오른쪽</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* URL & Actions */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>커버 이미지 URL</Label>
                  <textarea
                    readOnly
                    value={coverUrl}
                    rows={2}
                    className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopy} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    URL 복사
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(coverUrl, "_blank")}
                    title="새 탭에서 열기"
                    aria-label="새 탭에서 열기"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleReset}
                    title="초기화"
                    aria-label="초기화"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <button
                  type="button"
                  onClick={() => setGuideOpen(!guideOpen)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${guideOpen ? "rotate-180" : ""}`}
                  />
                  노션에 커버 이미지 적용하는 방법
                </button>
                {guideOpen && (
                  <div className="rounded-lg border bg-muted/50 p-4 space-y-2.5 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        1
                      </span>
                      <span>
                        위의 <strong className="text-foreground">URL 복사</strong> 버튼을 클릭합니다.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        2
                      </span>
                      <span>
                        노션 페이지 상단의 <strong className="text-foreground">커버 추가</strong> 또는 기존 커버의 <strong className="text-foreground">커버 변경</strong>을 클릭합니다.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        3
                      </span>
                      <span>
                        <strong className="text-foreground">링크</strong> 탭을 선택하고, 복사한 URL을 붙여넣기한 뒤 <strong className="text-foreground">제출</strong>하면 완료!
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: preview */}
          <div className="md:sticky md:top-8">
            <p className="text-xs text-muted-foreground text-center mb-3">미리보기 (5:2 비율)</p>
            <div
              className="relative rounded-lg overflow-hidden border"
              style={{ aspectRatio: "5/2" }}
            >
              {/* CSS preview (fast, local) */}
              <div
                className="absolute inset-0"
                style={{ background: previewBg }}
              />
              {/* Pattern overlay */}
              {previewPattern && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: previewPattern, backgroundRepeat: "repeat" }}
                />
              )}
              {/* Text overlay */}
              {(text || subtitle) && (
                <div
                  className="absolute inset-0 flex flex-col justify-center gap-1 z-10"
                  style={{
                    alignItems: resolveAlign(align),
                    padding: "12px 20px",
                  }}
                >
                  {text && (
                    <span
                      className="font-bold leading-tight"
                      style={{
                        color: `#${textColor}`,
                        fontSize: type === "text" ? "1.5rem" : "1.25rem",
                        textAlign: align,
                        textShadow:
                          type === "pattern" ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
                      }}
                    >
                      {text}
                    </span>
                  )}
                  {subtitle && (
                    <span
                      className="leading-snug"
                      style={{
                        color: `#${textColor}`,
                        fontSize: type === "text" ? "0.875rem" : "0.75rem",
                        textAlign: align,
                        opacity: 0.85,
                        textShadow:
                          type === "pattern" ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
                      }}
                    >
                      {subtitle}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actual image preview (from API) */}
            <div className="mt-4">
              <p className="text-xs text-muted-foreground text-center mb-2">실제 생성 이미지</p>
              <div className="rounded-lg overflow-hidden border" style={{ aspectRatio: "5/2" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={coverUrl}
                  src={coverUrl}
                  alt="커버 이미지 미리보기"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Size info */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              1500 x 600px PNG - 노션 커버 권장 비율
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
