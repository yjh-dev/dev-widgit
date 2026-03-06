export type StickyPinType = "none" | "pin" | "tape";
export type StickyLineHeight = "tight" | "normal" | "relaxed";
export type StickyNoteMode = "single" | "board";

export const NOTE_COLOR_PRESETS = [
  { value: "FBBF24", label: "노랑" },
  { value: "F9A8D4", label: "핑크" },
  { value: "86EFAC", label: "초록" },
  { value: "93C5FD", label: "파랑" },
  { value: "C4B5FD", label: "보라" },
  { value: "FED7AA", label: "주황" },
];

/* ─── Board mode helpers (absorbed from memo-board.ts) ─── */

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
