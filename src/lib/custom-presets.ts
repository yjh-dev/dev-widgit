const LS_PREFIX = "widgit-presets-";
const MAX_PRESETS = 5;

export interface CustomPreset {
  id: string;
  name: string;
  url: string;
  createdAt: number;
}

function storageKey(widgetType: string) {
  return `${LS_PREFIX}${widgetType}`;
}

export function getCustomPresets(widgetType: string): CustomPreset[] {
  try {
    const raw = localStorage.getItem(storageKey(widgetType));
    if (!raw) return [];
    return JSON.parse(raw) as CustomPreset[];
  } catch {
    return [];
  }
}

export function saveCustomPreset(
  widgetType: string,
  name: string,
  url: string,
): CustomPreset {
  const presets = getCustomPresets(widgetType);
  const preset: CustomPreset = {
    id: `custom-${Date.now()}`,
    name,
    url,
    createdAt: Date.now(),
  };
  presets.unshift(preset);
  try {
    localStorage.setItem(
      storageKey(widgetType),
      JSON.stringify(presets.slice(0, MAX_PRESETS)),
    );
  } catch { /* 무시 */ }
  return preset;
}

export function deleteCustomPreset(widgetType: string, id: string): void {
  const presets = getCustomPresets(widgetType).filter((p) => p.id !== id);
  try {
    localStorage.setItem(storageKey(widgetType), JSON.stringify(presets));
  } catch { /* 무시 */ }
}
