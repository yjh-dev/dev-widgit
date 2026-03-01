"use client";

import { EFFECT_PRESETS, type EffectPreset } from "@/lib/effect-presets";

interface EffectPresetSelectorProps {
  onSelect: (preset: Record<string, unknown>) => void;
}

export default function EffectPresetSelector({ onSelect }: EffectPresetSelectorProps) {
  const handleSelect = (preset: EffectPreset) => {
    const values: Record<string, unknown> = {
      fx: preset.fx,
      fxInt: preset.fxInt,
      gbg: preset.gbg,
      gbgDir: preset.gbgDir,
      neonColor: preset.neonColor,
      bshadow: preset.bshadow,
    };
    if (preset.bgOverride) {
      if (preset.bgOverride.bg !== undefined) values.bg = preset.bgOverride.bg;
      if (preset.bgOverride.transparentBg !== undefined) values.transparentBg = preset.bgOverride.transparentBg;
    }
    onSelect(values);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">효과 프리셋</p>
      <div className="flex flex-wrap gap-2">
        {EFFECT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleSelect(preset)}
            className="group flex flex-col items-center gap-1"
            aria-label={`효과 프리셋: ${preset.name}`}
          >
            <div
              className="w-8 h-8 rounded-md border border-border ring-1 ring-transparent group-hover:ring-primary transition-all cursor-pointer"
              style={{ background: preset.swatch }}
            />
            <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
