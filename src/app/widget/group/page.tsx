"use client";

import { Suspense } from "react";
import { useWidgetParams } from "@/lib/use-widget-params";

function GroupContent() {
  const params = useWidgetParams();

  // 위젯 URL들은 파이프(|)로 구분
  const urls = (params.get("urls") || "").split("|").filter(Boolean);
  const layout = params.get("layout") || "vertical"; // vertical | horizontal | grid
  const cols = Number(params.get("cols")) || 2;
  const gap = Number(params.get("gap")) || 8;
  const bg = params.get("bg") || "";

  const gridStyle: React.CSSProperties =
    layout === "horizontal"
      ? { display: "flex", gap, flexWrap: "wrap" }
      : layout === "grid"
        ? { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }
        : { display: "flex", flexDirection: "column", gap };

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background: bg === "transparent" ? "transparent" : bg ? `#${bg}` : "transparent",
      }}
    >
      <div style={gridStyle}>
        {urls.map((url, i) => (
          <iframe
            key={i}
            src={url}
            className="w-full border-0"
            style={{
              minHeight: 200,
              flex: layout === "horizontal" ? "1 1 0" : undefined,
            }}
            loading="lazy"
            title={`Widget ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function GroupWidgetPage() {
  return (
    <Suspense>
      <GroupContent />
    </Suspense>
  );
}
