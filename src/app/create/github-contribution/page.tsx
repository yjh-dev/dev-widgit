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
import GithubContributionPreview from "@/components/widget/GithubContributionPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useGithubContributionStore } from "@/store/useGithubContributionStore";
import { githubContributionPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import EffectOptions from "@/components/editor/EffectOptions";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => String(currentYear - i));

export default function CreateGithubContributionPage() {
  const {
    username, year, showTotal, showUsername, showStreak, showStats, lang, cellSize, cellRadius,
    color, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setUsername, setYear, setShowTotal, setShowUsername, setShowStreak, setShowStats, setLang, setCellSize, setCellRadius,
    setColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useGithubContributionStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("username") && { username: p.get("username")! }),
      ...(p.has("year") && { year: p.get("year")! }),
      ...(p.has("total") && { showTotal: p.get("total") !== "false" }),
      ...(p.has("showUser") && { showUsername: p.get("showUser") !== "false" }),
      ...(p.has("streak") && { showStreak: p.get("streak") === "true" }),
      ...(p.has("stats") && { showStats: p.get("stats") === "true" }),
      ...(p.has("lang") && { lang: p.get("lang") as "ko" | "en" }),
      ...(p.has("cellSize") && { cellSize: p.get("cellSize") as "sm" | "md" | "lg" }),
      ...(p.has("cellRadius") && { cellRadius: p.get("cellRadius") as "square" | "rounded" | "circle" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/github-contribution`;
    const params = new URLSearchParams();
    if (username) params.set("username", username);
    if (year !== "last") params.set("year", year);
    if (!showTotal) params.set("total", "false");
    if (!showUsername) params.set("showUser", "false");
    if (showStreak) params.set("streak", "true");
    if (showStats) params.set("stats", "true");
    if (lang !== "ko") params.set("lang", lang);
    if (cellSize !== "sm") params.set("cellSize", cellSize);
    if (cellRadius !== "rounded") params.set("cellRadius", cellRadius);
    if (color !== "22C55E") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [username, year, showTotal, showUsername, showStreak, showStats, lang, cellSize, cellRadius, color, textColor, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="GitHub 잔디 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={githubContributionPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">GitHub 사용자명</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="예: torvalds"
                      />
                      <p className="text-xs text-muted-foreground">
                        비우면 샘플 데이터가 표시됩니다
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>연도</Label>
                      <Select value={year} onValueChange={setYear}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last">최근 1년</SelectItem>
                          {yearOptions.map((y) => (
                            <SelectItem key={y} value={y}>{y}년</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTotal">기여 수 표시</Label>
                      <Switch id="showTotal" checked={showTotal} onCheckedChange={setShowTotal} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showUsername">사용자명 표시</Label>
                      <Switch id="showUsername" checked={showUsername} onCheckedChange={setShowUsername} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showStreak">연속 기여일 표시</Label>
                      <Switch id="showStreak" checked={showStreak} onCheckedChange={setShowStreak} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showStats">활동 통계 표시</Label>
                      <Switch id="showStats" checked={showStats} onCheckedChange={setShowStats} />
                    </div>
                    <div className="space-y-2">
                      <Label>언어</Label>
                      <Select value={lang} onValueChange={(v) => setLang(v as "ko" | "en")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>셀 크기</Label>
                      <Select value={cellSize} onValueChange={(v) => setCellSize(v as "sm" | "md" | "lg")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">작게 (10px)</SelectItem>
                          <SelectItem value="md">보통 (13px)</SelectItem>
                          <SelectItem value="lg">크게 (16px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>셀 모양</Label>
                      <Select value={cellRadius} onValueChange={(v) => setCellRadius(v as "square" | "rounded" | "circle")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">네모</SelectItem>
                          <SelectItem value="rounded">둥근 네모</SelectItem>
                          <SelectItem value="circle">원형</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="잔디 색상" value={color} onChange={setColor} placeholder="22C55E" />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useGithubContributionStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <EditorEffectsPreview
        fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
        neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
        <GithubContributionPreview
          username={username}
          year={year}
          showTotal={showTotal}
          showUsername={showUsername}
          showStreak={showStreak}
          showStats={showStats}
          lang={lang}
          cellSize={cellSize}
          cellRadius={cellRadius}
          color={color}
          textColor={textColor}
          bg={bg}
          transparentBg={transparentBg}
          borderRadius={borderRadius}
          padding={padding}
          fontSize={fontSize}
        />
      </EditorEffectsPreview>
    </EditorLayout>
  );
}
