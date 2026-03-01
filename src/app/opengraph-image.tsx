import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Widgit — 노션 위젯 생성기";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6366F1, #EC4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            W
          </div>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            Widgit
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#A1A1AA",
            marginBottom: "12px",
          }}
        >
          노션 전용 위젯 생성기
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#71717A",
          }}
        >
          53종의 무료 위젯 · URL 하나로 동작 · 서버 없이 무한 커스터마이징
        </div>
      </div>
    ),
    { ...size },
  );
}
