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
import { Plus, Trash2 } from "lucide-react";
import ProfileCardPreview from "@/components/widget/ProfileCardPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useProfileCardStore } from "@/store/useProfileCardStore";
import { profileCardPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, buildUrl } from "@/lib/url-builder-utils";
import { serializeSocials, deserializeSocials, SOCIAL_TYPES, SOCIAL_ICONS } from "@/lib/profile-card";
import type { ProfileLayout, AvatarShape, SocialLink } from "@/lib/profile-card";

export default function CreateProfileCardPage() {
  const {
    name, bio, avatarUrl, layout, avatarShape, showBio, socials,
    accentColor, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setName, setBio, setAvatarUrl, setLayout, setAvatarShape, setShowBio, setSocials,
    setAccentColor, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useProfileCardStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("name") && { name: p.get("name")! }),
      ...(p.has("bio") && { bio: p.get("bio")! }),
      ...(p.has("avatar") && { avatarUrl: p.get("avatar")! }),
      ...(p.has("layout") && { layout: p.get("layout") as ProfileLayout }),
      ...(p.has("shape") && { avatarShape: p.get("shape") as AvatarShape }),
      ...(p.has("showBio") && { showBio: p.get("showBio") !== "false" }),
      ...(p.has("socials") && { socials: deserializeSocials(p.get("socials")!) }),
      ...(p.has("accent") && { accentColor: p.get("accent")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/profile-card`;
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (bio) params.set("bio", bio);
    if (avatarUrl) params.set("avatar", avatarUrl);
    if (layout !== "vertical") params.set("layout", layout);
    if (avatarShape !== "circle") params.set("shape", avatarShape);
    if (!showBio) params.set("showBio", "false");
    const serialized = serializeSocials(socials);
    if (serialized) params.set("socials", serialized);
    if (accentColor !== "2563EB") params.set("accent", accentColor);
    if (color !== "1E1E1E") params.set("color", color);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    return buildUrl(base, params);
  }, [name, bio, avatarUrl, layout, avatarShape, showBio, socials, accentColor, color, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const addSocial = () => {
    if (socials.length >= 5) return;
    setSocials([...socials, { type: "github", url: "", label: "GitHub" }]);
  };

  const updateSocial = (index: number, patch: Partial<SocialLink>) => {
    const next = socials.map((s, i) => (i === index ? { ...s, ...patch } : s));
    setSocials(next);
  };

  const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  return (
    <EditorLayout title="프로필 카드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={profileCardPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 정보",
                children: (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">소개</Label>
                      <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="한 줄 소개" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatarUrl">프로필 이미지 URL</Label>
                      <Input id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
                      <p className="text-xs text-muted-foreground">비우면 기본 아이콘이 표시됩니다</p>
                    </div>
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as ProfileLayout)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vertical">세로 (가운데 정렬)</SelectItem>
                          <SelectItem value="horizontal">가로 (좌측 정렬)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>아바타 모양</Label>
                      <Select value={avatarShape} onValueChange={(v) => setAvatarShape(v as AvatarShape)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="circle">원형</SelectItem>
                          <SelectItem value="rounded">둥근 네모</SelectItem>
                          <SelectItem value="square">네모</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showBio">소개 표시</Label>
                      <Switch id="showBio" checked={showBio} onCheckedChange={setShowBio} />
                    </div>
                  </div>
                ),
              },
              {
                id: "socials",
                title: "소셜 링크",
                children: (
                  <div className="space-y-3">
                    {socials.map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Select value={s.type} onValueChange={(v) => updateSocial(i, { type: v, label: SOCIAL_ICONS[v]?.label ?? v })}>
                          <SelectTrigger className="w-[110px] shrink-0"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {SOCIAL_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>{SOCIAL_ICONS[t].label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          value={s.url}
                          onChange={(e) => updateSocial(i, { url: e.target.value })}
                          placeholder={SOCIAL_ICONS[s.type]?.prefix ? "사용자명" : "URL"}
                          className="flex-1"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeSocial(i)} className="shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {socials.length < 5 && (
                      <Button variant="outline" size="sm" onClick={addSocial} className="w-full">
                        <Plus className="w-4 h-4 mr-1" /> 소셜 링크 추가
                      </Button>
                    )}
                    <p className="text-xs text-muted-foreground">최대 5개까지 추가할 수 있습니다</p>
                  </div>
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useProfileCardStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <ProfileCardPreview
              name={name} bio={bio} avatarUrl={avatarUrl}
              layout={layout} avatarShape={avatarShape}
              showBio={showBio} socials={socials}
              accentColor={accentColor} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
