import { ImageResponse } from "next/og";
import { widgetMetadata } from "@/lib/widget-metadata";
import { widgetLandings } from "@/lib/widget-landing";

export const alt = "Wiget-Tree Widget";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(widgetLandings).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = widgetMetadata[slug];
  const landing = widgetLandings[slug];

  const name = meta?.name ?? slug;
  const desc = meta?.desc ?? "";
  const features = landing?.features?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #1E1E2E 0%, #2D2B55 50%, #1E1E2E 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366F1, #EC4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            W
          </div>
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#A1A1AA" }}>
            Wiget-Tree
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "52px",
            fontWeight: 700,
            letterSpacing: "-1px",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#A1A1AA",
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {desc}
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.1)",
                fontSize: "16px",
                color: "#D1D5DB",
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
