export type TemperatureUnit = "celsius" | "fahrenheit";
export type WeatherIconStyle = "emoji" | "minimal";

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  weatherCode: number;
}

export interface AirQualityData {
  aqi: number;
  label: string;
}

export interface UvData {
  index: number;
  label: string;
}

const WMO_CONDITIONS: Record<number, string> = {
  0: "맑음",
  1: "대체로 맑음",
  2: "부분적 흐림",
  3: "흐림",
  45: "안개",
  48: "상고대 안개",
  51: "가벼운 이슬비",
  53: "이슬비",
  55: "강한 이슬비",
  61: "약한 비",
  63: "비",
  65: "강한 비",
  71: "약한 눈",
  73: "눈",
  75: "강한 눈",
  80: "소나기",
  81: "강한 소나기",
  82: "매우 강한 소나기",
  95: "뇌우",
  96: "우박 뇌우",
  99: "강한 우박 뇌우",
};

const WMO_EMOJI: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "🌨️",
  73: "🌨️",
  75: "❄️",
  80: "🌦️",
  81: "🌧️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

export function weatherCodeToCondition(code: number): string {
  return WMO_CONDITIONS[code] ?? "알 수 없음";
}

export function weatherCodeToEmoji(code: number): string {
  return WMO_EMOJI[code] ?? "🌡️";
}

export async function fetchWeather(
  lat: number,
  lon: number,
  unit: TemperatureUnit,
): Promise<WeatherData> {
  const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";
  const windUnit = "kmh";
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);

  const data = await res.json();
  const current = data.current;

  return {
    temp: Math.round(current.temperature_2m),
    condition: weatherCodeToCondition(current.weather_code),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,
  };
}

export async function fetchForecast(
  lat: number,
  lon: number,
  unit: TemperatureUnit,
  days: number = 3,
): Promise<ForecastDay[]> {
  const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=${tempUnit}&forecast_days=${days}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);

  const data = await res.json();
  const daily = data.daily;

  return daily.time.map((date: string, i: number) => ({
    date,
    maxTemp: Math.round(daily.temperature_2m_max[i]),
    minTemp: Math.round(daily.temperature_2m_min[i]),
    weatherCode: daily.weather_code[i],
  }));
}

export async function fetchHourlyForecast(
  lat: number,
  lon: number,
  unit: TemperatureUnit,
): Promise<HourlyForecast[]> {
  const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&temperature_unit=${tempUnit}&forecast_hours=6`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Hourly API error: ${res.status}`);

  const data = await res.json();
  const hourly = data.hourly;

  return hourly.time.map((time: string, i: number) => ({
    time,
    temp: Math.round(hourly.temperature_2m[i]),
    weatherCode: hourly.weather_code[i],
  }));
}

function aqiLabel(aqi: number): string {
  if (aqi <= 20) return "좋음";
  if (aqi <= 40) return "보통";
  if (aqi <= 60) return "나쁨";
  if (aqi <= 80) return "매우 나쁨";
  return "위험";
}

export async function fetchAirQuality(
  lat: number,
  lon: number,
): Promise<AirQualityData> {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`AQI API error: ${res.status}`);

  const data = await res.json();
  const aqi = Math.round(data.current.european_aqi);
  return { aqi, label: aqiLabel(aqi) };
}

function uvLabel(index: number): string {
  if (index <= 2) return "낮음";
  if (index <= 5) return "보통";
  if (index <= 7) return "높음";
  if (index <= 10) return "매우 높음";
  return "위험";
}

export async function fetchUvIndex(
  lat: number,
  lon: number,
): Promise<UvData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&forecast_hours=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`UV API error: ${res.status}`);

  const data = await res.json();
  const index = Math.round(data.hourly.uv_index[0] * 10) / 10;
  return { index, label: uvLabel(index) };
}
