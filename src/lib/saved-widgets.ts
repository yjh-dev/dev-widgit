import type { WidgetType } from "@/lib/templates";

const LS_KEY = "widgit-saved";
const MAX_SAVED = 50;

export interface SavedWidget {
  id: string;
  name: string;
  type: WidgetType;
  widgetUrl: string; // 상대 경로: /widget/dday?title=...
  createdAt: number;
  updatedAt: number;
}

export function getSavedWidgets(): SavedWidget[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedWidget[];
  } catch {
    return [];
  }
}

function persist(widgets: SavedWidget[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(widgets));
  } catch { /* 무시 */ }
}

export function saveWidget(
  name: string,
  type: WidgetType,
  widgetUrl: string,
): SavedWidget {
  const widgets = getSavedWidgets();
  const widget: SavedWidget = {
    id: `sw-${Date.now()}`,
    name,
    type,
    widgetUrl,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  widgets.unshift(widget);
  // 최대 개수 초과 시 오래된 항목 제거
  persist(widgets.slice(0, MAX_SAVED));
  return widget;
}

export function updateWidget(
  id: string,
  patch: Partial<Pick<SavedWidget, "name" | "widgetUrl">>,
): void {
  const widgets = getSavedWidgets();
  const idx = widgets.findIndex((w) => w.id === id);
  if (idx === -1) return;
  if (patch.name !== undefined) widgets[idx].name = patch.name;
  if (patch.widgetUrl !== undefined) widgets[idx].widgetUrl = patch.widgetUrl;
  widgets[idx].updatedAt = Date.now();
  persist(widgets);
}

export function deleteWidget(id: string): void {
  const widgets = getSavedWidgets().filter((w) => w.id !== id);
  persist(widgets);
}

export function duplicateWidget(id: string): SavedWidget | null {
  const widgets = getSavedWidgets();
  const original = widgets.find((w) => w.id === id);
  if (!original) return null;
  const copy: SavedWidget = {
    id: `sw-${Date.now()}`,
    name: `${original.name} (복사)`,
    type: original.type,
    widgetUrl: original.widgetUrl,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  // 원본 바로 뒤에 삽입
  const idx = widgets.findIndex((w) => w.id === id);
  widgets.splice(idx + 1, 0, copy);
  persist(widgets.slice(0, MAX_SAVED));
  return copy;
}
