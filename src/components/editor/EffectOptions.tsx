"use client";

import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";
import {
  EFFECT_TYPE_OPTIONS,
  EFFECT_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  GBG_DIR_OPTIONS,
} from "@/lib/widget-effects";

interface EffectOptionsProps {
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string;
  gbgDir: number;
  neonColor: string;
  bshadow: BoxShadowPreset;
  onFxChange: (v: EffectType) => void;
  onFxIntChange: (v: EffectIntensity) => void;
  onGbgChange: (v: string) => void;
  onGbgDirChange: (v: number) => void;
  onNeonColorChange: (v: string) => void;
  onBshadowChange: (v: BoxShadowPreset) => void;
}

export default function EffectOptions({
  fx, fxInt, gbg, gbgDir, neonColor, bshadow,
  onFxChange, onFxIntChange, onGbgChange, onGbgDirChange,
  onNeonColorChange, onBshadowChange,
}: EffectOptionsProps) {
  const gbgColors = gbg ? gbg.split("|") : ["", ""];
  const showNeonColor = fx === "neon" || fx === "glow";

  const updateGbgColor = (index: number, color: string) => {
    const colors = [...gbgColors];
    while (colors.length < 2) colors.push("");
    colors[index] = color;
    onGbgChange(colors.filter(Boolean).join("|"));
  };

  return (
    <div className="space-y-4">
      {/* 효과 타입 */}
      <div className="space-y-2">
        <Label>시각 효과</Label>
        <Select value={fx} onValueChange={(v) => onFxChange(v as EffectType)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {EFFECT_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 효과 강도 */}
      {fx !== "none" && (
        <div className="space-y-2">
          <Label>효과 강도</Label>
          <Select value={String(fxInt)} onValueChange={(v) => onFxIntChange(Number(v) as EffectIntensity)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {EFFECT_INTENSITY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 네온/글로우 색상 */}
      {showNeonColor && (
        <ColorPicker
          id="neonColor"
          label="효과 색상"
          value={neonColor}
          onChange={onNeonColorChange}
          placeholder="6366F1"
        />
      )}

      {/* 그라데이션 배경 */}
      <div className="space-y-2">
        <Label>그라데이션 배경</Label>
        <div className="grid grid-cols-2 gap-2">
          <ColorPicker
            id="gbg1"
            label="색상 1"
            value={gbgColors[0] || ""}
            onChange={(c) => updateGbgColor(0, c)}
            placeholder="비워두면 없음"
          />
          <ColorPicker
            id="gbg2"
            label="색상 2"
            value={gbgColors[1] || ""}
            onChange={(c) => updateGbgColor(1, c)}
            placeholder="비워두면 없음"
          />
        </div>
      </div>

      {/* 그라데이션 방향 */}
      {gbg && (
        <div className="space-y-2">
          <Label>그라데이션 방향</Label>
          <Select value={String(gbgDir)} onValueChange={(v) => onGbgDirChange(Number(v))}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {GBG_DIR_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 그림자 */}
      <div className="space-y-2">
        <Label>그림자</Label>
        <Select value={bshadow} onValueChange={(v) => onBshadowChange(v as BoxShadowPreset)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SHADOW_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
