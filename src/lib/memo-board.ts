export function parseMemos(raw: string): string[] {
  if (!raw) return [];
  return raw.split("|").filter(Boolean).map((t) => decodeURIComponent(t));
}

export function serializeMemos(memos: string[]): string {
  return memos.map((t) => encodeURIComponent(t)).join("|");
}

const LS_KEY = "wiget-tree-memo-board";

function storageKey(boardId: string): string {
  return `${LS_KEY}-${boardId}`;
}

export function loadMemos(boardId: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey(boardId));
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function saveMemos(boardId: string, memos: string[]): void {
  try {
    localStorage.setItem(storageKey(boardId), JSON.stringify(memos));
  } catch { /* 무시 */ }
}
