"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WeatherPreview from "@/components/widget/WeatherPreview";
import type { TemperatureUnit, WeatherIconStyle } from "@/lib/weather";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_UNITS: TemperatureUnit[] = ["celsius", "fahrenheit"];
const VALID_ICON_STYLES: WeatherIconStyle[] = ["emoji", "minimal"];

function WeatherWidgetContent() {
  const searchParams = useSearchParams();

  const lat = Number(searchParams.get("lat")) || 37.5665;
  const lon = Number(searchParams.get("lon")) || 126.978;
  const city = searchParams.get("city") || "서울";

  const rawUnit = searchParams.get("unit");
  const unit: TemperatureUnit = VALID_UNITS.includes(rawUnit as TemperatureUnit)
    ? (rawUnit as TemperatureUnit)
    : "celsius";

  const showForecast = searchParams.get("forecast") === "true";
  const showHumidity = searchParams.get("humidity") === "true";
  const showWind = searchParams.get("wind") === "true";

  const rawIcon = searchParams.get("icon");
  const iconStyle: WeatherIconStyle = VALID_ICON_STYLES.includes(rawIcon as WeatherIconStyle)
    ? (rawIcon as WeatherIconStyle)
    : "emoji";

  const rawRefresh = Number(searchParams.get("refresh"));
  const refresh = rawRefresh >= 5 && rawRefresh <= 60 ? rawRefresh : 30;

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <WeatherPreview
        lat={lat}
        lon={lon}
        city={city}
        unit={unit}
        showForecast={showForecast}
        showHumidity={showHumidity}
        showWind={showWind}
        iconStyle={iconStyle}
        refresh={refresh}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetWeatherPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <WeatherWidgetContent />
    </Suspense>
  );
}
