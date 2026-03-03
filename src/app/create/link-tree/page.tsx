"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";
import LinkTreePreview from "@/components/widget/LinkTreePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useLinkTreeStore } from "@/store/useLinkTreeStore";
import { linkTreePresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";
import { serializeLinks, deserializeLinks, genLinkId } from "@/lib/link-tree";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import type { LinkStyle, LinkItem } from "@/lib/link-tree";

export default function CreateLinkTreePage() {
  const {
    title, links, linkStyle,
    accentColor, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTitle, setLinks, setLinkStyle,
    setAccentColor, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useLinkTreeStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("links") && { links: deserializeLinks(p.get("links")!) }),
      ...(p.has("style") && { linkStyle: p.get("style") as LinkStyle }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/link-tree`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    const serialized = serializeLinks(links);
    if (serialized) params.set("links", serialized);
    if (linkStyle !== "filled") params.set("style", linkStyle);
    if (accentColor !== "2563EB") params.set("accent", accentColor);
    if (color !== "1E1E1E") params.set("color", color);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [title, links, linkStyle, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const addLink = () => {
    if (links.length >= 8) return;
    setLinks([...links, { id: genLinkId(), title: "", url: "", icon: "" }]);
  };

  const updateLink = (index: number, patch: Partial<LinkItem>) => {
    const next = links.map((l, i) => (i === index ? { ...l, ...patch } : l));
    setLinks(next);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const moveLink = (from: number, to: number) => {
    if (to < 0 || to >= links.length) return;
    const next = [...links];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setLinks(next);
  };

  return (
    <EditorLayout title="링크 트리 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={linkTreePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">제목</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="내 링크" />
                    </div>
                    <div className="space-y-2">
                      <Label>버튼 스타일</Label>
                      <Select value={linkStyle} onValueChange={(v) => setLinkStyle(v as LinkStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="filled">채움</SelectItem>
                          <SelectItem value="outline">테두리</SelectItem>
                          <SelectItem value="ghost">고스트</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ),
              },
              {
                id: "links",
                title: "링크 목록",
                children: (
                  <div className="space-y-3">
                    {links.map((link, i) => (
                      <div key={link.id} className="space-y-2 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-0.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => moveLink(i, i - 1)}
                              disabled={i === 0}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              onClick={() => moveLink(i, i + 1)}
                              disabled={i === links.length - 1}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs"
                            >
                              ▼
                            </button>
                          </div>
                          <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground shrink-0">#{i + 1}</span>
                          <div className="flex-1" />
                          <Button variant="ghost" size="icon" onClick={() => removeLink(i)} className="shrink-0 h-7 w-7">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <Input
                          value={link.title}
                          onChange={(e) => updateLink(i, { title: e.target.value })}
                          placeholder="링크 제목"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => updateLink(i, { url: e.target.value })}
                          placeholder="https://..."
                        />
                        <div className="flex items-center gap-2">
                          <Label className="text-xs shrink-0">아이콘 (이모지)</Label>
                          <Input
                            value={link.icon}
                            onChange={(e) => updateLink(i, { icon: e.target.value })}
                            placeholder="🔗"
                            className="w-16"
                            maxLength={2}
                          />
                        </div>
                      </div>
                    ))}
                    {links.length < 8 && (
                      <Button variant="outline" size="sm" onClick={addLink} className="w-full">
                        <Plus className="w-4 h-4 mr-1" /> 링크 추가
                      </Button>
                    )}
                    <p className="text-xs text-muted-foreground">최대 8개까지 추가할 수 있습니다</p>
                  </div>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="버튼 색상" value={accentColor} onChange={setAccentColor} placeholder="2563EB" />
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
                    tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
                    onTshadowChange={setTshadow} onBwChange={setBw} onBcChange={setBc}
                    onOpacityChange={setOpacity} onLsChange={setLs}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useLinkTreeStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[3/4]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <LinkTreePreview
              title={title} links={links} linkStyle={linkStyle}
              accentColor={accentColor} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
              linkable={false}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
