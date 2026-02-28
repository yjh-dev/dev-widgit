"use client";

import { User } from "lucide-react";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { ProfileLayout, AvatarShape, SocialLink } from "@/lib/profile-card";
import { getSocialFaviconUrl, SOCIAL_ICONS } from "@/lib/profile-card";

const NAME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const BIO_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const AVATAR_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 48,
  md: 64,
  lg: 80,
  xl: 96,
};

const AVATAR_RADIUS: Record<AvatarShape, string> = {
  circle: "50%",
  rounded: "16px",
  square: "0px",
};

interface ProfileCardPreviewProps {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  layout?: ProfileLayout;
  avatarShape?: AvatarShape;
  showBio?: boolean;
  socials?: SocialLink[];
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function ProfileCardPreview({
  name = "",
  bio = "",
  avatarUrl = "",
  layout = "vertical",
  avatarShape = "circle",
  showBio = true,
  socials = [],
  accentColor = "2563EB",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: ProfileCardPreviewProps) {
  const displayName = name || "이름";
  const displayBio = bio || "소개를 입력하세요";
  const avatarSize = AVATAR_SIZE_MAP[fontSize];
  const avatarRadius = AVATAR_RADIUS[avatarShape];
  const activeSocials = socials.filter((s) => s.url.trim());

  const avatarEl = (
    <div
      className="shrink-0 flex items-center justify-center overflow-hidden"
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarRadius,
        backgroundColor: avatarUrl ? "transparent" : `#${accentColor}20`,
        border: `2px solid #${accentColor}40`,
      }}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-full h-full object-cover"
          style={{ borderRadius: avatarRadius }}
        />
      ) : (
        <User
          style={{ width: avatarSize * 0.45, height: avatarSize * 0.45, color: `#${accentColor}` }}
        />
      )}
    </div>
  );

  const infoEl = (
    <div className={layout === "vertical" ? "text-center" : "text-left min-w-0"}>
      <p className={`${NAME_SIZE_MAP[fontSize]} font-bold truncate`}>
        {displayName}
      </p>
      {showBio && (
        <p
          className={`${BIO_SIZE_MAP[fontSize]} mt-0.5 line-clamp-2`}
          style={{ opacity: 0.65 }}
        >
          {displayBio}
        </p>
      )}
    </div>
  );

  const socialsEl = activeSocials.length > 0 && (
    <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
      {activeSocials.map((s, i) => {
        const meta = SOCIAL_ICONS[s.type];
        const faviconUrl = getSocialFaviconUrl(s.type, s.url);
        const fullUrl = s.url.startsWith("http") ? s.url : (meta?.prefix ? `${meta.prefix}${s.url}` : `https://${s.url}`);
        return (
          <a
            key={i}
            href={fullUrl}
            target="_top"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-opacity hover:opacity-80"
            style={{
              backgroundColor: `#${accentColor}15`,
              color: `#${accentColor}`,
            }}
          >
            {faviconUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={faviconUrl} alt="" className="w-3.5 h-3.5" />
            )}
            <span className="truncate max-w-[80px]">
              {meta?.label ?? s.url}
            </span>
          </a>
        );
      })}
    </div>
  );

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {layout === "vertical" ? (
        <div className="flex flex-col items-center gap-2">
          {avatarEl}
          {infoEl}
          {socialsEl}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center gap-3">
            {avatarEl}
            {infoEl}
          </div>
          {socialsEl}
        </div>
      )}
    </div>
  );
}
