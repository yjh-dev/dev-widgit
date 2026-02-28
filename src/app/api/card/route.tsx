import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

type CardType = "quote" | "stats" | "profile" | "announcement";
type Theme = "light" | "dark";
type Trend = "up" | "down" | "none";

interface ThemeColors {
  bg: string;
  text: string;
  muted: string;
}

const THEMES: Record<Theme, ThemeColors> = {
  light: { bg: "#FFFFFF", text: "#1E1E1E", muted: "#6B7280" },
  dark: { bg: "#1A1A2E", text: "#E0E0E0", muted: "#9CA3AF" },
};

const CARD_SIZES: Record<CardType, { width: number; height: number }> = {
  quote: { width: 800, height: 400 },
  stats: { width: 600, height: 300 },
  profile: { width: 600, height: 200 },
  announcement: { width: 800, height: 200 },
};

function renderQuoteCard(
  text: string,
  author: string,
  color: string,
  theme: ThemeColors,
) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        background: theme.bg,
      }}
    >
      {/* Decorative accent line at top */}
      <div
        style={{
          width: 60,
          height: 4,
          borderRadius: 2,
          background: `#${color}`,
          marginBottom: 24,
        }}
      />
      {/* Quote mark */}
      <div
        style={{
          fontSize: 48,
          color: `#${color}`,
          marginBottom: 16,
          lineHeight: 1,
        }}
      >
        {"\u275D"}
      </div>
      {/* Quote text */}
      <div
        style={{
          fontSize: 24,
          color: theme.text,
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 640,
          wordBreak: "break-word",
        }}
      >
        {text || ""}
      </div>
      {/* Author */}
      {author && (
        <div
          style={{
            fontSize: 16,
            color: theme.muted,
            marginTop: 24,
          }}
        >
          {"— "}{author}
        </div>
      )}
    </div>
  );
}

function renderStatsCard(
  label: string,
  value: string,
  trend: Trend,
  trendValue: string,
  color: string,
  theme: ThemeColors,
) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        background: theme.bg,
      }}
    >
      {/* Label */}
      <div
        style={{
          fontSize: 16,
          color: theme.muted,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label || ""}
      </div>
      {/* Value */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: `#${color}`,
          lineHeight: 1.2,
        }}
      >
        {value || "0"}
      </div>
      {/* Trend */}
      {trend !== "none" && trendValue && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 18,
            color: trend === "up" ? "#22C55E" : "#EF4444",
            marginTop: 16,
          }}
        >
          <span>{trend === "up" ? "\u2191" : "\u2193"}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

function renderProfileCard(
  name: string,
  role: string,
  initials: string,
  color: string,
  theme: ThemeColors,
) {
  const displayInitials = initials || (name ? name.charAt(0) : "?");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "32px 48px",
        background: theme.bg,
        gap: 28,
      }}
    >
      {/* Avatar circle */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          background: `#${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          {displayInitials}
        </span>
      </div>
      {/* Text info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.text,
          }}
        >
          {name || ""}
        </div>
        {role && (
          <div
            style={{
              fontSize: 18,
              color: theme.muted,
            }}
          >
            {role}
          </div>
        )}
      </div>
    </div>
  );
}

function renderAnnouncementCard(
  title: string,
  desc: string,
  badge: string,
  color: string,
  theme: ThemeColors,
) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "28px 48px",
        background: theme.bg,
        gap: 24,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 6,
          height: 80,
          borderRadius: 3,
          background: `#${color}`,
          flexShrink: 0,
        }}
      />
      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {badge && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#FFFFFF",
                background: `#${color}`,
                padding: "4px 12px",
                borderRadius: 4,
                textTransform: "uppercase",
              }}
            >
              {badge}
            </span>
          )}
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            {title || ""}
          </span>
        </div>
        {desc && (
          <div
            style={{
              fontSize: 16,
              color: theme.muted,
              lineHeight: 1.5,
            }}
          >
            {desc}
          </div>
        )}
      </div>
    </div>
  );
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const type = (sp.get("type") || "quote") as CardType;
  const theme = (sp.get("theme") || "light") as Theme;
  const themeColors = THEMES[theme] || THEMES.light;
  const color = sp.get("color") || getDefaultColor(type);

  // Override bg if provided
  const bgOverride = sp.get("bg");
  if (bgOverride) {
    themeColors.bg = `#${bgOverride}`;
  }

  const size = CARD_SIZES[type] || CARD_SIZES.quote;

  let element: React.JSX.Element;

  switch (type) {
    case "quote": {
      const text = sp.get("text") || "";
      const author = sp.get("author") || "";
      element = renderQuoteCard(text, author, color, themeColors);
      break;
    }
    case "stats": {
      const label = sp.get("label") || "";
      const value = sp.get("value") || "0";
      const trend = (sp.get("trend") || "none") as Trend;
      const trendValue = sp.get("trendValue") || "";
      element = renderStatsCard(label, value, trend, trendValue, color, themeColors);
      break;
    }
    case "profile": {
      const name = sp.get("name") || "";
      const role = sp.get("role") || "";
      const initials = sp.get("initials") || "";
      element = renderProfileCard(name, role, initials, color, themeColors);
      break;
    }
    case "announcement": {
      const title = sp.get("title") || "";
      const desc = sp.get("desc") || "";
      const badge = sp.get("badge") || "";
      element = renderAnnouncementCard(title, desc, badge, color, themeColors);
      break;
    }
    default: {
      const text = sp.get("text") || "";
      const author = sp.get("author") || "";
      element = renderQuoteCard(text, author, color, themeColors);
      break;
    }
  }

  return new ImageResponse(element, {
    width: size.width,
    height: size.height,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

function getDefaultColor(type: CardType): string {
  switch (type) {
    case "quote":
      return "6366F1";
    case "stats":
      return "2563EB";
    case "profile":
      return "6366F1";
    case "announcement":
      return "EF4444";
    default:
      return "6366F1";
  }
}
