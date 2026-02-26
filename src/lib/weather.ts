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
