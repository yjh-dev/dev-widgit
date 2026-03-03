"use client";

import { useEffect, useState } from "react";
import {
  fetchWeather,
  fetchForecast,
  fetchHourlyForecast,
  fetchAirQuality,
  fetchUvIndex,
  weatherCodeToEmoji,
  type WeatherData,
  type ForecastDay,
  type HourlyForecast,
  type AirQualityData,
  type UvData,
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
  showHourly?: boolean;
  showAqi?: boolean;
  showUv?: boolean;
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
  showHourly = false,
  showAqi = false,
  showUv = false,
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
  const [hourly, setHourly] = useState<HourlyForecast[]>([]);
  const [aqi, setAqi] = useState<AirQualityData | null>(null);
  const [uv, setUv] = useState<UvData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [w, f, h, a, u] = await Promise.all([
          fetchWeather(lat, lon, unit),
          showForecast ? fetchForecast(lat, lon, unit) : Promise.resolve([]),
          showHourly ? fetchHourlyForecast(lat, lon, unit) : Promise.resolve([]),
          showAqi ? fetchAirQuality(lat, lon) : Promise.resolve(null),
          showUv ? fetchUvIndex(lat, lon) : Promise.resolve(null),
        ]);
        if (cancelled) return;
        setWeather(w);
        setForecast(f);
        setHourly(h);
        setAqi(a);
        setUv(u);
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
  }, [lat, lon, unit, showForecast, showHourly, showAqi, showUv, refresh]);

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

          {(showHumidity || showWind || (showAqi && aqi) || (showUv && uv)) && (
            <div className="flex items-center gap-3 opacity-60 flex-wrap justify-center">
              {showHumidity && (
                <span className={LABEL_SIZE_MAP[fontSize]}>💧 {weather.humidity}%</span>
              )}
              {showWind && (
                <span className={LABEL_SIZE_MAP[fontSize]}>💨 {weather.windSpeed}km/h</span>
              )}
              {showAqi && aqi && (
                <span className={LABEL_SIZE_MAP[fontSize]}>🌬️ AQI {aqi.aqi} ({aqi.label})</span>
              )}
              {showUv && uv && (
                <span className={LABEL_SIZE_MAP[fontSize]}>☀️ UV {uv.index} ({uv.label})</span>
              )}
            </div>
          )}

          {showHourly && hourly.length > 0 && (
            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-current/10 w-full justify-center">
              {hourly.map((h) => {
                const hour = new Date(h.time).getHours();
                return (
                  <div key={h.time} className="flex flex-col items-center gap-0.5">
                    <span className="text-xs opacity-50">{hour}시</span>
                    <span className="text-sm">{weatherCodeToEmoji(h.weatherCode)}</span>
                    <span className="text-xs">{h.temp}°</span>
                  </div>
                );
              })}
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
