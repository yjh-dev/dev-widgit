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
          backgroundColor: "#171717",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 24,
            backgroundColor: "#2563EB",
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          W
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginBottom: 16 }}>
          Widgit
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, marginBottom: 8 }}>
          노션 전용 위젯 생성기
        </div>
        <div style={{ fontSize: 18, opacity: 0.5 }}>
          25종 위젯 · 무료 · 서버리스 · 무한 커스터마이징
        </div>
      </div>
    ),
    { ...size },
  );
}
