"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipboardPaste } from "lucide-react";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCodePreview from "@/components/widget/QRCodePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useQRCodeStore } from "@/store/useQRCodeStore";
import { qrCodePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import type { QRErrorCorrection, QRModuleStyle, QRSize } from "@/lib/qr-code";

export default function CreateQRCodePage() {
  const {
    data, label, fgColor, bgColor, size, ec, module: moduleStyle,
    borderRadius, padding, fontSize,
    setData, setLabel, setFgColor, setBgColor, setSize, setEc, setModule,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useQRCodeStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("data") && { data: p.get("data")! }),
      ...(p.has("label") && { label: p.get("label")! }),
      ...(p.has("fgColor") && { fgColor: p.get("fgColor")! }),
      ...(p.has("bgColor") && { bgColor: p.get("bgColor")! }),
      ...(p.has("size") && { size: p.get("size") as QRSize }),
      ...(p.has("ec") && { ec: p.get("ec") as QRErrorCorrection }),
      ...(p.has("module") && { module: p.get("module") as QRModuleStyle }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/qr-code`;
    const params = new URLSearchParams();
    if (data) params.set("data", data);
    if (label) params.set("label", label);
    if (fgColor !== "1E1E1E") params.set("fgColor", fgColor);
    if (bgColor !== "FFFFFF") params.set("bgColor", bgColor);
    if (size !== "md") params.set("size", size);
    if (ec !== "M") params.set("ec", ec);
    if (moduleStyle !== "square") params.set("module", moduleStyle);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [data, label, fgColor, bgColor, size, ec, moduleStyle, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const charCount = new TextEncoder().encode(data).length;

  return (
    <EditorLayout title="QR 코드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={qrCodePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["data"]}
            sections={[
              {
                id: "data",
                title: "데이터",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="data">URL 또는 텍스트</Label>
                      <Input
                        id="data"
                        value={data}
                        onChange={(e) => {
                          if (new TextEncoder().encode(e.target.value).length <= 300) {
                            setData(e.target.value);
                          }
                        }}
                        placeholder="https://example.com"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{charCount}/300 바이트</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7"
                          onClick={async () => {
                            try {
                              const text = await navigator.clipboard.readText();
                              if (text && new TextEncoder().encode(text).length <= 300) {
                                setData(text);
                                toast.success("클립보드에서 붙여넣었습니다!");
                              } else if (text) {
                                toast.error("300바이트를 초과합니다.");
                              }
                            } catch {
                              toast.error("클립보드 접근이 거부되었습니다.");
                            }
                          }}
                        >
                          <ClipboardPaste className="w-3.5 h-3.5 mr-1" />
                          클립보드에서 붙여넣기
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label">라벨 (선택)</Label>
                      <Input
                        id="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="내 GitHub"
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
                      <Label>크기</Label>
                      <Select value={size} onValueChange={(v) => setSize(v as QRSize)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">작게</SelectItem>
                          <SelectItem value="md">보통</SelectItem>
                          <SelectItem value="lg">크게</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>오류 보정</Label>
                      <Select value={ec} onValueChange={(v) => setEc(v as QRErrorCorrection)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Low (7%)</SelectItem>
                          <SelectItem value="M">Medium (15%)</SelectItem>
                          <SelectItem value="Q">Quartile (25%)</SelectItem>
                          <SelectItem value="H">High (30%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>모듈 스타일</Label>
                      <Select value={moduleStyle} onValueChange={(v) => setModule(v as QRModuleStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">사각형</SelectItem>
                          <SelectItem value="rounded">둥근 사각형</SelectItem>
                          <SelectItem value="dots">점</SelectItem>
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
                    <ColorPicker id="fgColor" label="전경색" value={fgColor} onChange={setFgColor} placeholder="1E1E1E" />
                    <ColorPicker id="bgColor" label="배경색" value={bgColor} onChange={setBgColor} placeholder="FFFFFF" />
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
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useQRCodeStore.setState(c)} />
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
              <QRCodePreview
              data={data}
              label={label}
              fgColor={fgColor}
              bgColor={bgColor}
              size={size}
              ec={ec}
              module={moduleStyle}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
