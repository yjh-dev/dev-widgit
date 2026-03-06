"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WeatherPreview from "@/components/widget/WeatherPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useWeatherStore } from "@/store/useWeatherStore";
import { weatherPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { TemperatureUnit, WeatherIconStyle } from "@/lib/weather";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, addEntranceParams, buildUrl } from "@/lib/url-builder-utils";
import EffectOptions from "@/components/editor/EffectOptions";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";

const CITY_PRESETS = [
  { label: "서울", lat: 37.5665, lon: 126.978 },
  { label: "부산", lat: 35.1796, lon: 129.0756 },
  { label: "대구", lat: 35.8714, lon: 128.6014 },
  { label: "인천", lat: 37.4563, lon: 126.7052 },
  { label: "대전", lat: 36.3504, lon: 127.3845 },
  { label: "광주", lat: 35.1595, lon: 126.8526 },
  { label: "제주", lat: 33.4996, lon: 126.5312 },
  { label: "도쿄", lat: 35.6762, lon: 139.6503 },
  { label: "뉴욕", lat: 40.7128, lon: -74.006 },
  { label: "런던", lat: 51.5074, lon: -0.1278 },
  { label: "파리", lat: 48.8566, lon: 2.3522 },
  { label: "시드니", lat: -33.8688, lon: 151.2093 },
];

export default function CreateWeatherPage() {
  const {
    lat, lon, city, unit, showForecast, showHumidity, showWind,
    showHourly, showAqi, showUv,
    iconStyle, refresh, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setLat, setLon, setCity, setUnit, setShowForecast, setShowHumidity, setShowWind,
    setShowHourly, setShowAqi, setShowUv,
    setIconStyle, setRefresh, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    entrance, entranceDelay, setEntrance, setEntranceDelay,
    loadPreset, reset,
  } = useWeatherStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("lat") && { lat: Number(p.get("lat")) }),
      ...(p.has("lon") && { lon: Number(p.get("lon")) }),
      ...(p.has("city") && { city: p.get("city")! }),
      ...(p.has("unit") && { unit: p.get("unit") as TemperatureUnit }),
      ...(p.has("forecast") && { showForecast: p.get("forecast") === "true" }),
      ...(p.has("humidity") && { showHumidity: p.get("humidity") === "true" }),
      ...(p.has("wind") && { showWind: p.get("wind") === "true" }),
      ...(p.has("hourly") && { showHourly: p.get("hourly") === "true" }),
      ...(p.has("aqi") && { showAqi: p.get("aqi") === "true" }),
      ...(p.has("uv") && { showUv: p.get("uv") === "true" }),
      ...(p.has("icon") && { iconStyle: p.get("icon") as WeatherIconStyle }),
      ...(p.has("refresh") && { refresh: Number(p.get("refresh")) }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
      ...(p.has("entrance") && { entrance: p.get("entrance")! }),
      ...(p.has("ed") && { entranceDelay: p.get("ed")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/weather`;
    const params = new URLSearchParams();
    if (lat !== 37.5665) params.set("lat", String(lat));
    if (lon !== 126.978) params.set("lon", String(lon));
    if (city !== "서울") params.set("city", city);
    if (unit !== "celsius") params.set("unit", unit);
    if (showForecast) params.set("forecast", "true");
    if (showHumidity) params.set("humidity", "true");
    if (showWind) params.set("wind", "true");
    if (showHourly) params.set("hourly", "true");
    if (showAqi) params.set("aqi", "true");
    if (showUv) params.set("uv", "true");
    if (iconStyle !== "emoji") params.set("icon", iconStyle);
    if (refresh !== 30) params.set("refresh", String(refresh));
    if (color !== "1E1E1E") params.set("color", color);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    addEntranceParams(params, entrance, entranceDelay);
    return buildUrl(base, params);
  }, [lat, lon, city, unit, showForecast, showHumidity, showWind, showHourly, showAqi, showUv, iconStyle, refresh, color, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls, entrance, entranceDelay]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const handleCityPreset = (value: string) => {
    const preset = CITY_PRESETS.find((c) => c.label === value);
    if (preset) {
      setCity(preset.label);
      setLat(preset.lat);
      setLon(preset.lon);
    }
  };

  return (
    <EditorLayout title="날씨 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={weatherPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["location"]}
            sections={[
              {
                id: "location",
                title: "위치 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>도시 프리셋</Label>
                      <Select value={city} onValueChange={handleCityPreset}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CITY_PRESETS.map((c) => (
                            <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">도시명</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="서울" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="lat">위도</Label>
                        <Input id="lat" type="number" step="0.0001" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lon">경도</Label>
                        <Input id="lon" type="number" step="0.0001" value={lon} onChange={(e) => setLon(Number(e.target.value))} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>온도 단위</Label>
                      <Select value={unit} onValueChange={(v) => setUnit(v as TemperatureUnit)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celsius">섭씨 (°C)</SelectItem>
                          <SelectItem value="fahrenheit">화씨 (°F)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showForecast">3일 예보</Label>
                      <Switch id="showForecast" checked={showForecast} onCheckedChange={setShowForecast} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showHumidity">습도 표시</Label>
                      <Switch id="showHumidity" checked={showHumidity} onCheckedChange={setShowHumidity} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showWind">풍속 표시</Label>
                      <Switch id="showWind" checked={showWind} onCheckedChange={setShowWind} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showHourly">6시간 예보</Label>
                      <Switch id="showHourly" checked={showHourly} onCheckedChange={setShowHourly} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showAqi">대기질 지수</Label>
                      <Switch id="showAqi" checked={showAqi} onCheckedChange={setShowAqi} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showUv">자외선 지수</Label>
                      <Switch id="showUv" checked={showUv} onCheckedChange={setShowUv} />
                    </div>
                    <div className="space-y-2">
                      <Label>아이콘 스타일</Label>
                      <Select value={iconStyle} onValueChange={(v) => setIconStyle(v as WeatherIconStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emoji">이모지</SelectItem>
                          <SelectItem value="minimal">미니멀</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refresh">새로고침 간격 (분)</Label>
                      <Input
                        id="refresh" type="number" min={5} max={60}
                        value={refresh}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 5 && v <= 60) setRefresh(v);
                        }}
                      />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="글자 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch id="transparent" checked={transparentBg} onCheckedChange={setTransparentBg} />
                    </div>
                    {!transparentBg && (
                      <ColorPicker id="bg" label="배경색" value={bg} onChange={setBg} placeholder="FFFFFF" />
                    )}
                  </>
                ),
              },
              {
                id: "effects",
                title: "효과",
                children: (
                  <>
                    <EffectPresetSelector onSelect={loadPreset} />
                    <EffectOptions
                      fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
                      neonColor={neonColor} bshadow={bshadow}
                      onFxChange={setFx} onFxIntChange={setFxInt}
                      onGbgChange={setGbg} onGbgDirChange={setGbgDir}
                      onNeonColorChange={setNeonColor} onBshadowChange={setBshadow}
                    />
                  </>
                ),
              },
              {
                id: "style",
                title: "스타일",
                children: (
                  <CommonStyleOptions
                    borderRadius={borderRadius} padding={padding} fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius} onPaddingChange={setPadding} onFontSizeChange={setFontSize}
                    tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
                    onTshadowChange={setTshadow} onBwChange={setBw} onBcChange={setBc}
                    onOpacityChange={setOpacity} onLsChange={setLs}
                    entrance={entrance} entranceDelay={entranceDelay}
                    onEntranceChange={setEntrance} onEntranceDelayChange={setEntranceDelay}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useWeatherStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <EditorEffectsPreview
              fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
              neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
              tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
            >
              <WeatherPreview
              lat={lat} lon={lon} city={city} unit={unit}
              showForecast={showForecast} showHumidity={showHumidity} showWind={showWind}
              showHourly={showHourly} showAqi={showAqi} showUv={showUv}
              iconStyle={iconStyle} refresh={refresh} color={color} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize}
            />
            </EditorEffectsPreview>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
