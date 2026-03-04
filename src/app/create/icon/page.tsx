"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, Info } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { useHomePath } from "@/lib/use-home-path";

type IconType = "letter" | "emoji" | "gradient";
type ShapeType = "circle" | "rounded" | "square";

interface Preset {
  label: string;
  type: IconType;
  char?: string;
  emoji?: string;
  bg: string;
  bg2?: string;
  color: string;
  shape: ShapeType;
  bold: boolean;
}

const PRESETS: Preset[] = [
  { label: "블루 W", type: "letter", char: "W", bg: "2563EB", color: "FFFFFF", shape: "rounded", bold: true },
  { label: "퍼플 로켓", type: "emoji", emoji: "\u{1F680}", bg: "7C3AED", color: "FFFFFF", shape: "rounded", bold: true },
  { label: "그린 체크", type: "letter", char: "\u2713", bg: "22C55E", color: "FFFFFF", shape: "rounded", bold: true },
  { label: "레드 하트", type: "emoji", emoji: "\u2764\uFE0F", bg: "EF4444", color: "FFFFFF", shape: "rounded", bold: true },
  { label: "그라데이션", type: "gradient", bg: "6366F1", bg2: "EC4899", color: "FFFFFF", shape: "rounded", bold: true },
  { label: "다크 레터", type: "letter", char: "D", bg: "1A1A2E", color: "E0E0E0", shape: "rounded", bold: true },
  { label: "오렌지 불꽃", type: "emoji", emoji: "\u{1F525}", bg: "F97316", color: "FFFFFF", shape: "rounded", bold: true },
  { label: "서클 이니셜", type: "letter", char: "A", bg: "06B6D4", color: "FFFFFF", shape: "circle", bold: true },
];

export default function CreateIconPage() {
  const homePath = useHomePath();
  const [type, setType] = useState<IconType>("letter");
  const [char, setChar] = useState("W");
  const [emoji, setEmoji] = useState("\u{1F680}");
  const [bg, setBg] = useState("6366F1");
  const [bg2, setBg2] = useState("");
  const [color, setColor] = useState("FFFFFF");
  const [shape, setShape] = useState<ShapeType>("rounded");
  const [bold, setBold] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);

  const iconUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/api/icon`;
    const params = new URLSearchParams();

    if (type !== "letter") params.set("type", type);
    if (type === "letter" && char !== "W") params.set("char", char);
    if (type === "emoji" && emoji !== "\u{1F680}") params.set("emoji", emoji);
    if (bg !== "6366F1") params.set("bg", bg);
    if (color !== "FFFFFF") params.set("color", color);
    if (bg2) params.set("bg2", bg2);
    if (shape !== "rounded") params.set("shape", shape);
    if (!bold) params.set("bold", "false");

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [type, char, emoji, bg, color, bg2, shape, bold]);

  const handleCopy = async () => {
    await copyToClipboard(iconUrl);
    toast.success("아이콘 URL이 클립보드에 복사되었습니다!");
  };

  const applyPreset = (preset: Preset) => {
    setType(preset.type);
    if (preset.char) setChar(preset.char);
    if (preset.emoji) setEmoji(preset.emoji);
    setBg(preset.bg);
    setBg2(preset.bg2 || "");
    setColor(preset.color);
    setShape(preset.shape);
    setBold(preset.bold);
  };

  const handleReset = () => {
    setType("letter");
    setChar("W");
    setEmoji("\u{1F680}");
    setBg("6366F1");
    setBg2("");
    setColor("FFFFFF");
    setShape("rounded");
    setBold(true);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={homePath}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-2xl font-bold mb-1">아이콘 만들기</h1>
        <p className="text-muted-foreground text-sm mb-8">
          노션 페이지 아이콘으로 사용할 280x280 이미지를 URL로 생성합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: Editor */}
          <div className="space-y-4">
            {/* Presets */}
            <Card>
              <CardContent className="pt-6">
                <Label className="text-sm font-medium mb-3 block">프리셋</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="h-8 px-3 rounded-md border text-xs font-medium hover:bg-accent transition-colors flex items-center gap-1.5"
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border"
                        style={{
                          background: preset.bg2
                            ? `linear-gradient(135deg, #${preset.bg}, #${preset.bg2})`
                            : `#${preset.bg}`,
                        }}
                      />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Type & Content */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>아이콘 타입</Label>
                  <Select value={type} onValueChange={(v) => setType(v as IconType)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="letter">글자 (Letter)</SelectItem>
                      <SelectItem value="emoji">이모지 (Emoji)</SelectItem>
                      <SelectItem value="gradient">그라데이션 (배경만)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === "letter" && (
                  <div className="space-y-2">
                    <Label htmlFor="char">글자 (1자)</Label>
                    <Input
                      id="char"
                      value={char}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v.length <= 1) setChar(v);
                      }}
                      maxLength={1}
                      placeholder="W"
                    />
                  </div>
                )}

                {type === "emoji" && (
                  <div className="space-y-2">
                    <Label htmlFor="emoji">이모지</Label>
                    <Input
                      id="emoji"
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                      placeholder="\u{1F680}"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>모양</Label>
                  <Select value={shape} onValueChange={(v) => setShape(v as ShapeType)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">원형 (Circle)</SelectItem>
                      <SelectItem value="rounded">둥근 사각형 (Rounded)</SelectItem>
                      <SelectItem value="square">사각형 (Square)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === "letter" && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bold">굵게 (Bold)</Label>
                    <Switch id="bold" checked={bold} onCheckedChange={setBold} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <ColorPicker
                  id="bg"
                  label="배경 색상"
                  value={bg}
                  onChange={setBg}
                  placeholder="6366F1"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>그라데이션 배경</Label>
                    <Switch
                      checked={!!bg2}
                      onCheckedChange={(checked) => setBg2(checked ? "EC4899" : "")}
                    />
                  </div>
                  {bg2 && (
                    <ColorPicker
                      id="bg2"
                      label="두 번째 색상"
                      value={bg2}
                      onChange={setBg2}
                      placeholder="EC4899"
                    />
                  )}
                </div>

                {type !== "gradient" && (
                  <ColorPicker
                    id="color"
                    label="글자/아이콘 색상"
                    value={color}
                    onChange={setColor}
                    placeholder="FFFFFF"
                  />
                )}
              </CardContent>
            </Card>

            {/* URL & Actions */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>아이콘 URL</Label>
                  <textarea
                    readOnly
                    value={iconUrl}
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
                    onClick={() => window.open(iconUrl, "_blank")}
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
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </div>

                {/* Guide toggle */}
                <button
                  type="button"
                  onClick={() => setGuideOpen(!guideOpen)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  노션에서 아이콘 변경하는 방법
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
                        노션 페이지 상단의 <strong className="text-foreground">아이콘</strong>을 클릭합니다.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        3
                      </span>
                      <span>
                        <strong className="text-foreground">커스텀</strong> 탭에서{" "}
                        <strong className="text-foreground">링크</strong>를 선택하고 URL을 붙여넣습니다.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        4
                      </span>
                      <span>
                        <strong className="text-foreground">제출</strong>을 클릭하면 아이콘이 변경됩니다!
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Preview */}
          <div className="md:sticky md:top-8">
            <p className="text-xs text-muted-foreground text-center mb-3">미리보기</p>
            <div className="flex items-center justify-center">
              <div className="border rounded-lg overflow-hidden bg-muted/30 p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={iconUrl}
                  alt="아이콘 미리보기"
                  width={280}
                  height={280}
                  className="block"
                  style={{
                    borderRadius:
                      shape === "circle"
                        ? "50%"
                        : shape === "rounded"
                          ? "20%"
                          : "0",
                  }}
                />
              </div>
            </div>

            {/* Size reference */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="border rounded-lg overflow-hidden bg-muted/30 p-2 mx-auto w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconUrl}
                    alt="작은 미리보기"
                    width={32}
                    height={32}
                    className="block"
                    style={{
                      borderRadius:
                        shape === "circle"
                          ? "50%"
                          : shape === "rounded"
                            ? "20%"
                            : "0",
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">32px</p>
              </div>
              <div className="text-center">
                <div className="border rounded-lg overflow-hidden bg-muted/30 p-2 mx-auto w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconUrl}
                    alt="중간 미리보기"
                    width={64}
                    height={64}
                    className="block"
                    style={{
                      borderRadius:
                        shape === "circle"
                          ? "50%"
                          : shape === "rounded"
                            ? "20%"
                            : "0",
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">64px</p>
              </div>
              <div className="text-center">
                <div className="border rounded-lg overflow-hidden bg-muted/30 p-2 mx-auto w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconUrl}
                    alt="큰 미리보기"
                    width={128}
                    height={128}
                    className="block"
                    style={{
                      borderRadius:
                        shape === "circle"
                          ? "50%"
                          : shape === "rounded"
                            ? "20%"
                            : "0",
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">128px</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
