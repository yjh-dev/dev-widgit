const LS_KEY = "wiget-tree-favorites";

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(type: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(type);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(type);
  }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(favs));
  } catch { /* 무시 */ }
  return idx < 0; // true if added
}

export function isFavorite(type: string): boolean {
  return getFavorites().includes(type);
}
