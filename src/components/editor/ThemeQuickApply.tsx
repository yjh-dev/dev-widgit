"use client";

import { colorThemes, applyThemeToWidget, type ColorTheme, type WidgetType } from "@/lib/templates";

interface ThemeQuickApplyProps {
  widgetType: WidgetType;
  onApply: (colors: Record<string, string>) => void;
}

/** Color-only fields extracted from applyThemeToWidget (excludes borderRadius, padding, fontSize, etc.) */
const NON_COLOR_KEYS = new Set([
  "borderRadius", "padding", "fontSize",
  "showSeconds", "blink", "interactive", "linkable",
]);

function extractColors(
  type: WidgetType,
  theme: ColorTheme,
): Record<string, string> {
  const all = applyThemeToWidget(type, theme);
  const colors: Record<string, string> = {};
  for (const [k, v] of Object.entries(all)) {
    if (!NON_COLOR_KEYS.has(k) && typeof v === "string") {
      colors[k] = v;
    }
  }
  return colors;
}

export default function ThemeQuickApply({ widgetType, onApply }: ThemeQuickApplyProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">색상 테마 빠른 적용</p>
      <div className="flex flex-wrap gap-1.5">
        {colorThemes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onApply(extractColors(widgetType, theme))}
            className="flex items-center gap-1 px-2 py-1 rounded-md border text-xs hover:bg-muted transition-colors"
            title={theme.name}
            aria-label={`${theme.name} 테마 적용`}
          >
            <div className="flex gap-0.5">
              {[theme.bg, theme.accent, theme.text].map((c, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: `#${c}` }}
                />
              ))}
            </div>
            <span className="hidden sm:inline">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
