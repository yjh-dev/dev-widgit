"use client";

import { useEffect, useState } from "react";
import {
  fetchWeather,
  fetchForecast,
  weatherCodeToEmoji,
  type WeatherData,
  type ForecastDay,
  type TemperatureUnit,
  type WeatherIconStyle,
} from "@/lib/weather";
import type { FontSizeKey } from "@/lib/common-widget-options";

const TEMP_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const ICON_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface WeatherPreviewProps {
  lat?: number;
  lon?: number;
  city?: string;
  unit?: TemperatureUnit;
  showForecast?: boolean;
  showHumidity?: boolean;
  showWind?: boolean;
  iconStyle?: WeatherIconStyle;
  refresh?: number;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function WeatherPreview({
  lat = 37.5665,
  lon = 126.978,
  city = "서울",
  unit = "celsius",
  showForecast = false,
  showHumidity = false,
  showWind = false,
  iconStyle = "emoji",
  refresh = 30,
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: WeatherPreviewProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [w, f] = await Promise.all([
          fetchWeather(lat, lon, unit),
          showForecast ? fetchForecast(lat, lon, unit) : Promise.resolve([]),
        ]);
        if (cancelled) return;
        setWeather(w);
        setForecast(f);
      } catch {
        if (!cancelled) setError("날씨 정보를 불러올 수 없습니다");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, refresh * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [lat, lon, unit, showForecast, refresh]);

  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

  const renderIcon = (code: number) => {
    if (iconStyle === "emoji") {
      return <span className={ICON_SIZE_MAP[fontSize]}>{weatherCodeToEmoji(code)}</span>;
    }
    // minimal: simple SVG icons
    return <span className={ICON_SIZE_MAP[fontSize]}>{weatherCodeToEmoji(code)}</span>;
  };

  const formatForecastDate = (dateStr: string) => {
    const [, m, d] = dateStr.split("-");
    return `${Number(m)}/${Number(d)}`;
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {loading && (
        <p className={`${LABEL_SIZE_MAP[fontSize]} opacity-50`}>날씨 로딩 중...</p>
      )}

      {error && (
        <p className={`${LABEL_SIZE_MAP[fontSize]} opacity-50`}>{error}</p>
      )}

      {!loading && !error && weather && (
        <>
          <p className={`${LABEL_SIZE_MAP[fontSize]} opacity-60 font-medium`}>{city}</p>

          <div className="flex items-center gap-2">
            {renderIcon(weather.weatherCode)}
            <span className={`${TEMP_SIZE_MAP[fontSize]} font-bold`}>
              {weather.temp}{unitSymbol}
            </span>
          </div>

          <p className={`${LABEL_SIZE_MAP[fontSize]} opacity-70`}>{weather.condition}</p>

          {(showHumidity || showWind) && (
            <div className="flex items-center gap-3 opacity-60">
              {showHumidity && (
                <span className={LABEL_SIZE_MAP[fontSize]}>💧 {weather.humidity}%</span>
              )}
              {showWind && (
                <span className={LABEL_SIZE_MAP[fontSize]}>💨 {weather.windSpeed}km/h</span>
              )}
            </div>
          )}

          {showForecast && forecast.length > 0 && (
            <div className="flex items-center gap-4 mt-2 pt-2 border-t border-current/10 w-full justify-center">
              {forecast.map((day) => (
                <div key={day.date} className="flex flex-col items-center gap-0.5">
                  <span className="text-xs opacity-50">{formatForecastDate(day.date)}</span>
                  <span className="text-sm">{weatherCodeToEmoji(day.weatherCode)}</span>
                  <span className="text-xs">
                    {day.minTemp}° / {day.maxTemp}°
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
