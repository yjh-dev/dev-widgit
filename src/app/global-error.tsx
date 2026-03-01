"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif" }}>
          <h2 style={{ marginBottom: 16 }}>문제가 발생했습니다</h2>
          <button onClick={reset} style={{ padding: "8px 16px", cursor: "pointer" }}>
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
