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
import CurrencyPreview from "@/components/widget/CurrencyPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { currencyPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { CURRENCIES, serializeTargets } from "@/lib/currency";
import type { FontSizeKey } from "@/lib/common-widget-options";

export default function CreateCurrencyPage() {
  const {
    base, targets, showFlag, refreshMin, accentColor,
    color, bg, transparentBg, borderRadius, padding, fontSize,
    setBase, setTargets, setShowFlag, setRefreshMin, setAccentColor,
    setColor, setBg, setTransparentBg, setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useCurrencyStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("base") && { base: p.get("base")! }),
      ...(p.has("targets") && { targets: p.get("targets")!.split("|").filter(Boolean) }),
      ...(p.has("showFlag") && { showFlag: p.get("showFlag") !== "false" }),
      ...(p.has("refresh") && { refreshMin: Number(p.get("refresh")) }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
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
    const basePath = `${window.location.origin}/widget/currency`;
    const params = new URLSearchParams();
    if (base !== "USD") params.set("base", base);
    const defaultTargets = serializeTargets(["KRW", "JPY"]);
    const currentTargets = serializeTargets(targets);
    if (currentTargets !== defaultTargets) params.set("targets", currentTargets);
    if (!showFlag) params.set("showFlag", "false");
    if (refreshMin !== 60) params.set("refresh", String(refreshMin));
    if (accentColor !== "2563EB") params.set("accent", accentColor);
    if (color !== "1E1E1E") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }, [base, targets, showFlag, refreshMin, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const toggleTarget = (code: string) => {
    if (targets.includes(code)) {
      if (targets.length > 1) {
        setTargets(targets.filter((t) => t !== code));
      }
    } else {
      setTargets([...targets, code]);
    }
  };

  return (
    <EditorLayout title="환율 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={currencyPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>기준 통화</Label>
                      <Select value={base} onValueChange={setBase}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              {c.symbol} {c.name} ({c.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>대상 통화</Label>
                      <div className="flex flex-wrap gap-2">
                        {CURRENCIES.filter((c) => c.code !== base).map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => toggleTarget(c.code)}
                            className={`px-3 py-1.5 rounded-md text-sm border transition-all ${
                              targets.includes(c.code)
                                ? "border-foreground bg-foreground text-background font-medium"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            {c.symbol} {c.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showFlag">통화 기호 표시</Label>
                      <Switch id="showFlag" checked={showFlag} onCheckedChange={setShowFlag} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refreshMin">갱신 주기 (분)</Label>
                      <Input
                        id="refreshMin"
                        type="number"
                        min={5}
                        max={1440}
                        value={refreshMin}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 5 && v <= 1440) setRefreshMin(v);
                        }}
                      />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="강조 색상" value={accentColor} onChange={setAccentColor} placeholder="2563EB" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useCurrencyStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <CurrencyPreview
              base={base}
              targets={targets}
              showFlag={showFlag}
              refreshMin={refreshMin}
              accentColor={accentColor}
              color={color}
              bg={bg}
              transparentBg={transparentBg}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
