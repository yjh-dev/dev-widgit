"use client";

import type { Preset } from "@/lib/presets";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PresetSelectorProps {
  presets: Preset[];
  onSelect: (data: Record<string, unknown>) => void;
}

export default function PresetSelector({ presets, onSelect }: PresetSelectorProps) {
  if (presets.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">프리셋</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => onSelect(preset.data)}
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
