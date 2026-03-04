"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Plus, X, ExternalLink, GripVertical, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggle";
import { copyToClipboard } from "@/lib/clipboard";
import { addEffectParams } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";
import { EFFECT_DEFAULTS } from "@/lib/widget-effects";


type Layout = "vertical" | "horizontal" | "grid";

export default function CreateGroupPage() {
  const [urls, setUrls] = useState<string[]>([""]);
  const [layout, setLayout] = useState<Layout>("vertical");
  const [cols, setCols] = useState(2);
  const [gap, setGap] = useState(8);
  const [fx, setFx] = useState<EffectType>(EFFECT_DEFAULTS.fx);
  const [fxInt, setFxInt] = useState<EffectIntensity>(EFFECT_DEFAULTS.fxInt);
  const [gbg, setGbg] = useState(EFFECT_DEFAULTS.gbg);
  const [gbgDir, setGbgDir] = useState(EFFECT_DEFAULTS.gbgDir);
  const [neonColor, setNeonColor] = useState(EFFECT_DEFAULTS.neonColor);
  const [bshadow, setBshadow] = useState<BoxShadowPreset>(EFFECT_DEFAULTS.bshadow);
  const [effectsOpen, setEffectsOpen] = useState(false);

  const addSlot = () => {
    if (urls.length >= 8) { toast.error("최대 8개까지 추가할 수 있습니다."); return; }
    setUrls([...urls, ""]);
  };

  const removeSlot = (idx: number) => {
    setUrls(urls.filter((_, i) => i !== idx));
  };

  const updateUrl = (idx: number, value: string) => {
    const next = [...urls];
    next[idx] = value;
    setUrls(next);
  };

  const validUrls = urls.filter((u) => u.trim());

  const widgetUrl = useMemo(() => {
    if (validUrls.length === 0) return "";
    const base = `${typeof window !== "undefined" ? window.location.origin : ""}/widget/group`;
    const params = new URLSearchParams();
    // 상대 경로로 저장
    const relativeUrls = validUrls.map((u) => {
      try {
        const parsed = new URL(u);
        return parsed.pathname + parsed.search;
      } catch {
        return u.startsWith("/") ? u : `/widget/${u}`;
      }
    });
    params.set("urls", relativeUrls.join("|"));
    if (layout !== "vertical") params.set("layout", layout);
    if (layout === "grid" && cols !== 2) params.set("cols", String(cols));
    if (gap !== 8) params.set("gap", String(gap));
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    return `${base}?${params.toString()}`;
  }, [validUrls, layout, cols, gap, fx, fxInt, gbg, gbgDir, neonColor, bshadow]);

  const handleCopy = async () => {
    if (!widgetUrl) { toast.error("위젯 URL을 하나 이상 추가하세요."); return; }
    await copyToClipboard(widgetUrl);
    toast.success("그룹 위젯 URL이 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="max-w-4xl mx-auto px-6 pt-8 pb-6">
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
        <h1 className="text-2xl font-bold">위젯 그룹 만들기</h1>
        <p className="text-sm text-muted-foreground mt-1">
          여러 위젯을 하나의 URL로 묶어 노션에 한 번에 임베드합니다.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Editor */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>위젯 URL 목록</Label>
              {urls.map((url, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                  <Input
                    value={url}
                    onChange={(e) => updateUrl(i, e.target.value)}
                    placeholder={`위젯 URL ${i + 1} (예: /widget/clock?timezone=Asia/Seoul)`}
                    className="flex-1 text-xs"
                  />
                  {urls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSlot(i)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSlot} disabled={urls.length >= 8} className="w-full">
                <Plus className="w-4 h-4 mr-1" />
                위젯 추가 (최대 8개)
              </Button>
            </div>

            <div className="space-y-3">
              <Label>레이아웃</Label>
              <Select value={layout} onValueChange={(v) => setLayout(v as Layout)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vertical">세로 (위아래)</SelectItem>
                  <SelectItem value="horizontal">가로 (좌우)</SelectItem>
                  <SelectItem value="grid">그리드</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {layout === "grid" && (
              <div className="space-y-2">
                <Label>열 수</Label>
                <Select value={String(cols)} onValueChange={(v) => setCols(Number(v))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2열</SelectItem>
                    <SelectItem value="3">3열</SelectItem>
                    <SelectItem value="4">4열</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>간격 (px)</Label>
              <Select value={String(gap)} onValueChange={(v) => setGap(Number(v))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">없음</SelectItem>
                  <SelectItem value="4">4px</SelectItem>
                  <SelectItem value="8">8px</SelectItem>
                  <SelectItem value="16">16px</SelectItem>
                  <SelectItem value="24">24px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Effects */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setEffectsOpen(!effectsOpen)}
                className="flex items-center gap-1 text-sm font-medium"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${effectsOpen ? "rotate-180" : ""}`}
                />
                효과
              </button>
              {effectsOpen && (
                <div className="space-y-4 pl-1">
                  <EffectPresetSelector
                    onSelect={(preset) => {
                      if (preset.fx !== undefined) setFx(preset.fx as EffectType);
                      if (preset.fxInt !== undefined) setFxInt(preset.fxInt as EffectIntensity);
                      if (preset.gbg !== undefined) setGbg(preset.gbg as string);
                      if (preset.gbgDir !== undefined) setGbgDir(preset.gbgDir as number);
                      if (preset.neonColor !== undefined) setNeonColor(preset.neonColor as string);
                      if (preset.bshadow !== undefined) setBshadow(preset.bshadow as BoxShadowPreset);
                    }}
                  />
                  <EffectOptions
                    fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
                    neonColor={neonColor} bshadow={bshadow}
                    onFxChange={setFx} onFxIntChange={setFxInt}
                    onGbgChange={setGbg} onGbgDirChange={setGbgDir}
                    onNeonColorChange={setNeonColor} onBshadowChange={setBshadow}
                  />
                </div>
              )}
            </div>

            {/* URL output */}
            <div className="space-y-2">
              <Label>그룹 위젯 URL</Label>
              <textarea
                readOnly
                value={widgetUrl}
                rows={3}
                className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
              />
              <div className="flex gap-2">
                <Button onClick={handleCopy} className="flex-1" disabled={!widgetUrl}>
                  <Copy className="w-4 h-4 mr-2" />
                  URL 복사
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!widgetUrl}
                  onClick={() => window.open(widgetUrl, "_blank")}
                  title="새 탭에서 열기"
                  aria-label="새 탭에서 열기"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground text-center">미리보기</p>
            <div className="border rounded-lg overflow-hidden bg-muted min-h-[300px]">
              {validUrls.length > 0 ? (
                <div
                  style={{
                    display: layout === "grid" ? "grid" : "flex",
                    flexDirection: layout === "horizontal" ? "row" : "column",
                    gridTemplateColumns: layout === "grid" ? `repeat(${cols}, 1fr)` : undefined,
                    gap,
                    padding: 8,
                  }}
                >
                  {validUrls.map((url, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden bg-white rounded border"
                      style={{
                        minHeight: 120,
                        flex: layout === "horizontal" ? "1 1 0" : undefined,
                      }}
                    >
                      <iframe
                        src={(() => {
                          try { return new URL(url).pathname + new URL(url).search; } catch { return url.startsWith("/") ? url : `/widget/${url}`; }
                        })()}
                        className="absolute inset-0 w-full h-full border-0"
                        style={{ pointerEvents: "none" }}
                        loading="lazy"
                        title={`Preview ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">
                  위젯 URL을 추가하면 미리보기가 표시됩니다
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
