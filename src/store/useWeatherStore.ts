import { create } from "zustand";
import type { TemperatureUnit, WeatherIconStyle } from "@/lib/weather";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  lat: 37.5665,
  lon: 126.978,
  city: "서울",
  unit: "celsius" as TemperatureUnit,
  showForecast: false,
  showHumidity: false,
  showWind: false,
  showHourly: false,
  showAqi: false,
  showUv: false,
  iconStyle: "emoji" as WeatherIconStyle,
  refresh: 30,
  color: "1E1E1E",
};

interface WeatherState extends CommonStyleState {
  lat: number;
  lon: number;
  city: string;
  unit: TemperatureUnit;
  showForecast: boolean;
  showHumidity: boolean;
  showWind: boolean;
  showHourly: boolean;
  showAqi: boolean;
  showUv: boolean;
  iconStyle: WeatherIconStyle;
  refresh: number;
  color: string;
  setLat: (v: number) => void;
  setLon: (v: number) => void;
  setCity: (v: string) => void;
  setUnit: (v: TemperatureUnit) => void;
  setShowForecast: (v: boolean) => void;
  setShowHumidity: (v: boolean) => void;
  setShowWind: (v: boolean) => void;
  setShowHourly: (v: boolean) => void;
  setShowAqi: (v: boolean) => void;
  setShowUv: (v: boolean) => void;
  setIconStyle: (v: WeatherIconStyle) => void;
  setRefresh: (v: number) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useWeatherStore = create<WeatherState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setLat: (v: number) => set({ lat: v }),
    setLon: (v: number) => set({ lon: v }),
    setCity: (v: string) => set({ city: v }),
    setUnit: (v: TemperatureUnit) => set({ unit: v }),
    setShowForecast: (v: boolean) => set({ showForecast: v }),
    setShowHumidity: (v: boolean) => set({ showHumidity: v }),
    setShowWind: (v: boolean) => set({ showWind: v }),
    setShowHourly: (v: boolean) => set({ showHourly: v }),
    setShowAqi: (v: boolean) => set({ showAqi: v }),
    setShowUv: (v: boolean) => set({ showUv: v }),
    setIconStyle: (v: WeatherIconStyle) => set({ iconStyle: v }),
    setRefresh: (v: number) => set({ refresh: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
