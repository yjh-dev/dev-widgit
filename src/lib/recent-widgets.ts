const LS_KEY = "widgit-recent";
const MAX_RECENT = 5;

export interface RecentWidget {
  type: string;
  timestamp: number;
}

export function getRecentWidgets(): RecentWidget[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentWidget[];
  } catch {
    return [];
  }
}

export function addRecentWidget(type: string): void {
  try {
    const list = getRecentWidgets().filter((w) => w.type !== type);
    list.unshift({ type, timestamp: Date.now() });
    localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  } catch { /* 무시 */ }
}
