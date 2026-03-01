"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import ProfileCardPreview from "@/components/widget/ProfileCardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeSocials } from "@/lib/profile-card";
import type { ProfileLayout, AvatarShape } from "@/lib/profile-card";

function ProfileCardWidgetContent() {
  const searchParams = useWidgetParams();

  const name = searchParams.get("name") || "";
  const bio = searchParams.get("bio") || "";
  const avatarUrl = searchParams.get("avatar") || "";
  const layout = (searchParams.get("layout") || "vertical") as ProfileLayout;
  const avatarShape = (searchParams.get("shape") || "circle") as AvatarShape;
  const showBio = searchParams.get("showBio") !== "false";
  const socials = deserializeSocials(searchParams.get("socials") || "");
  const accentColor = parseHexColor(searchParams.get("accent"), "2563EB");

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <ProfileCardPreview
        name={name}
        bio={bio}
        avatarUrl={avatarUrl}
        layout={layout}
        avatarShape={avatarShape}
        showBio={showBio}
        socials={socials}
        accentColor={accentColor}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetProfileCardPage() {
  return (
    <WidgetPage>
      <ProfileCardWidgetContent />
    </WidgetPage>
  );
}
