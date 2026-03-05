import { ImageResponse } from "next/og";
import { articles } from "@/lib/blog";

export const alt = "Wiget-Tree Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  const title = article?.title ?? slug;
  const tags = article?.tags?.slice(0, 4) ?? [];
  const readTime = article?.readTime ?? 5;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
              Wiget-Tree Blog
            </span>
          </div>
          <span style={{ fontSize: "18px", color: "#64748B" }}>
            {readTime}min read
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "48px",
            fontWeight: 700,
            letterSpacing: "-1px",
            lineHeight: 1.3,
            maxWidth: "900px",
            flex: 1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {tags.map((tag, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: "6px",
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.3)",
                fontSize: "16px",
                color: "#818CF8",
              }}
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
