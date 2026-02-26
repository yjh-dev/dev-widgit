import { create } from "zustand";
import type { TemperatureUnit, WeatherIconStyle } from "@/lib/weather";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface WeatherState {
  lat: number;
  lon: number;
  city: string;
  unit: TemperatureUnit;
  showForecast: boolean;
  showHumidity: boolean;
  showWind: boolean;
  iconStyle: WeatherIconStyle;
  refresh: number;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setLat: (v: number) => void;
  setLon: (v: number) => void;
  setCity: (v: string) => void;
  setUnit: (v: TemperatureUnit) => void;
  setShowForecast: (v: boolean) => void;
  setShowHumidity: (v: boolean) => void;
  setShowWind: (v: boolean) => void;
  setIconStyle: (v: WeatherIconStyle) => void;
  setRefresh: (v: number) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  reset: () => void;
}

const initialState = {
  lat: 37.5665,
  lon: 126.978,
  city: "서울",
  unit: "celsius" as TemperatureUnit,
  showForecast: false,
  showHumidity: false,
  showWind: false,
  iconStyle: "emoji" as WeatherIconStyle,
  refresh: 30,
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useWeatherStore = create<WeatherState>((set) => ({
  ...initialState,

  setLat: (lat) => set({ lat }),
  setLon: (lon) => set({ lon }),
  setCity: (city) => set({ city }),
  setUnit: (unit) => set({ unit }),
  setShowForecast: (showForecast) => set({ showForecast }),
  setShowHumidity: (showHumidity) => set({ showHumidity }),
  setShowWind: (showWind) => set({ showWind }),
  setIconStyle: (iconStyle) => set({ iconStyle }),
  setRefresh: (refresh) => set({ refresh }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  reset: () => set(initialState),
}));
