"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Code } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type BadgeType = "status" | "progress" | "version";
type BadgeStyle = "flat" | "rounded";

interface BadgeState {
  type: BadgeType;
  label: string;
  value: string;
  color: string;
  labelColor: string;
  logo: string;
  style: BadgeStyle;
  percent: number;
}

const DEFAULT_STATE: BadgeState = {
  type: "status",
  label: "상태",
  value: "활성",
  color: "22C55E",
  labelColor: "555555",
  logo: "",
  style: "flat",
  percent: 75,
};

interface Preset {
  name: string;
  state: Partial<BadgeState>;
}

const PRESETS: Preset[] = [
  {
    name: "활성 상태",
    state: { type: "status", label: "상태", value: "활성", color: "22C55E", labelColor: "555555" },
  },
  {
    name: "진행중",
    state: { type: "status", label: "상태", value: "진행중", color: "F59E0B", labelColor: "555555" },
  },
  {
    name: "완료 100%",
    state: { type: "progress", label: "진행률", percent: 100, color: "22C55E", labelColor: "555555" },
  },
  {
    name: "75% 진행",
    state: { type: "progress", label: "완료율", percent: 75, color: "3B82F6", labelColor: "555555" },
  },
  {
    name: "버전",
    state: { type: "version", value: "v2.1.0", color: "6366F1" },
  },
  {
    name: "중요",
    state: { type: "status", label: "우선순위", value: "높음", color: "EF4444", labelColor: "555555" },
  },
  {
    name: "배포",
    state: { type: "status", label: "배포", value: "Production", color: "22C55E", labelColor: "1A1A2E" },
  },
  {
    name: "빌드 성공",
    state: { type: "status", label: "빌드", value: "성공", color: "22C55E", labelColor: "555555", logo: "" },
  },
];

export default function CreateBadgePage() {
  const homePath = useHomePath();
  const [state, setState] = useState<BadgeState>({ ...DEFAULT_STATE });

  const update = useCallback(<K extends keyof BadgeState>(key: K, val: BadgeState[K]) => {
    setState((prev) => ({ ...prev, [key]: val }));
  }, []);

  const badgeUrl = useMemo(() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}/api/badge`
        : "/api/badge";
    const params = new URLSearchParams();

    if (state.type !== "status") params.set("type", state.type);

    if (state.type === "version") {
      // version only uses value + color + style
      if (state.value !== "활성") params.set("value", state.value);
      if (state.color !== "22C55E") params.set("color", state.color);
    } else {
      if (state.label !== "상태") params.set("label", state.label);
      if (state.type === "progress") {
        params.set("percent", String(state.percent));
      } else {
        if (state.value !== "활성") params.set("value", state.value);
      }
      if (state.color !== "22C55E") params.set("color", state.color);
      if (state.labelColor !== "555555") params.set("labelColor", state.labelColor);
    }

    if (state.logo) params.set("logo", state.logo);
    if (state.style !== "flat") params.set("style", state.style);

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [state]);

  const handleCopy = async () => {
    await copyToClipboard(badgeUrl);
    toast.success("뱃지 URL이 클립보드에 복사되었습니다!");
  };

  const handleCopyMarkdown = async () => {
    const md = `![badge](${badgeUrl})`;
    await copyToClipboard(md);
    toast.success("Markdown이 클립보드에 복사되었습니다!");
  };

  const applyPreset = (preset: Preset) => {
    setState({ ...DEFAULT_STATE, ...preset.state });
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
        <h1 className="text-2xl font-bold mb-1">뱃지 만들기</h1>
        <p className="text-muted-foreground text-sm mb-8">
          shields.io 스타일의 SVG 뱃지를 생성합니다. 노션에서 이미지 블록으로 삽입하세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: Editor */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Presets */}
              <div className="space-y-2">
                <Label>프리셋</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <Button
                      key={p.name}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => applyPreset(p)}
                    >
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label>뱃지 타입</Label>
                <Select
                  value={state.type}
                  onValueChange={(v) => update("type", v as BadgeType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status">상태 뱃지</SelectItem>
                    <SelectItem value="progress">진행률 뱃지</SelectItem>
                    <SelectItem value="version">버전 뱃지</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Label (not for version) */}
              {state.type !== "version" && (
                <div className="space-y-2">
                  <Label htmlFor="badge-label">라벨 (왼쪽)</Label>
                  <Input
                    id="badge-label"
                    value={state.label}
                    onChange={(e) => update("label", e.target.value)}
                    placeholder="상태"
                  />
                </div>
              )}

              {/* Value (status) */}
              {state.type === "status" && (
                <div className="space-y-2">
                  <Label htmlFor="badge-value">값 (오른쪽)</Label>
                  <Input
                    id="badge-value"
                    value={state.value}
                    onChange={(e) => update("value", e.target.value)}
                    placeholder="활성"
                  />
                </div>
              )}

              {/* Percent (progress) */}
              {state.type === "progress" && (
                <div className="space-y-2">
                  <Label htmlFor="badge-percent">진행률: {state.percent}%</Label>
                  <input
                    id="badge-percent"
                    type="range"
                    min={0}
                    max={100}
                    value={state.percent}
                    onChange={(e) => update("percent", Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              )}

              {/* Value (version) */}
              {state.type === "version" && (
                <div className="space-y-2">
                  <Label htmlFor="badge-version">버전</Label>
                  <Input
                    id="badge-version"
                    value={state.value}
                    onChange={(e) => update("value", e.target.value)}
                    placeholder="v2.1.0"
                  />
                </div>
              )}

              {/* Colors */}
              <ColorPicker
                id="badge-color"
                label={state.type === "version" ? "배경색" : "오른쪽 배경색"}
                value={state.color}
                onChange={(v) => update("color", v)}
                placeholder="22C55E"
              />
              {state.type !== "version" && (
                <ColorPicker
                  id="badge-label-color"
                  label="왼쪽 배경색"
                  value={state.labelColor}
                  onChange={(v) => update("labelColor", v)}
                  placeholder="555555"
                />
              )}

              {/* Style */}
              <div className="space-y-2">
                <Label>스타일</Label>
                <Select
                  value={state.style}
                  onValueChange={(v) => update("style", v as BadgeStyle)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="rounded">Rounded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Logo */}
              <div className="space-y-2">
                <Label htmlFor="badge-logo">로고 이모지 (선택)</Label>
                <Input
                  id="badge-logo"
                  value={state.logo}
                  onChange={(e) => update("logo", e.target.value)}
                  placeholder="예: ✅ 🚀 📦"
                  maxLength={4}
                />
              </div>

              {/* URL Display */}
              <div className="space-y-2">
                <Label>뱃지 URL</Label>
                <textarea
                  readOnly
                  value={badgeUrl}
                  rows={2}
                  className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleCopy} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  URL 복사
                </Button>
                <Button variant="outline" onClick={handleCopyMarkdown} className="flex-1">
                  <Code className="w-4 h-4 mr-2" />
                  Markdown 복사
                </Button>
              </div>

              {/* Usage guide */}
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2.5 text-sm text-muted-foreground">
                <p className="font-medium text-foreground text-xs">노션에 삽입하는 방법</p>
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
                    노션 페이지에서{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">
                      /image
                    </kbd>{" "}
                    또는{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">
                      /이미지
                    </kbd>
                    를 입력합니다.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">링크 삽입</strong>을 선택하고 복사한 URL을 붙여넣으면 완료!
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Preview */}
          <div className="md:sticky md:top-8 space-y-6">
            <p className="text-xs text-muted-foreground text-center">미리보기</p>

            {/* Actual size */}
            <div className="border rounded-lg p-8 bg-card flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground">실제 크기</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={badgeUrl}
                src={badgeUrl}
                alt="badge preview"
                className="max-w-full"
              />
            </div>

            {/* 2x size */}
            <div className="border rounded-lg p-8 bg-card flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground">2x 확대</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`${badgeUrl}-2x`}
                src={badgeUrl}
                alt="badge preview 2x"
                className="max-w-full"
                style={{ transform: "scale(2)", transformOrigin: "center" }}
              />
            </div>

            {/* Dark/Light background comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-6 bg-white flex items-center justify-center">
                <p className="sr-only">밝은 배경</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badgeUrl} alt="badge on light" className="max-w-full" />
              </div>
              <div className="border rounded-lg p-6 bg-[#191919] flex items-center justify-center">
                <p className="sr-only">어두운 배경</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badgeUrl} alt="badge on dark" className="max-w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
