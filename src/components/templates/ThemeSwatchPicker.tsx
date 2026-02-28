"use client";

import { colorThemes, type ColorTheme } from "@/lib/templates";

interface ThemeSwatchPickerProps {
  selectedId: string;
  onSelect: (theme: ColorTheme) => void;
}

export default function ThemeSwatchPicker({ selectedId, onSelect }: ThemeSwatchPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {colorThemes.map((theme) => {
        const isSelected = theme.id === selectedId;
        return (
          <button
            key={theme.id}
            onClick={() => onSelect(theme)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${
              isSelected
                ? "ring-2 ring-primary border-primary"
                : "border-border hover:border-foreground/30"
            }`}
          >
            <div className="flex gap-1.5">
              {[theme.bg, theme.text, theme.accent, theme.secondary].map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-black/10"
                  style={{ backgroundColor: `#${color}` }}
                />
              ))}
            </div>
            <span className="text-xs font-medium truncate w-full text-center">
              {theme.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
