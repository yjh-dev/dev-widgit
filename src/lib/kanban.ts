export interface KanbanColumn {
  title: string;
  items: string[];
}

export const DEFAULT_COLUMNS: KanbanColumn[] = [
  { title: "할 일", items: ["새 작업"] },
  { title: "진행 중", items: [] },
  { title: "완료", items: [] },
];

export function serializeColumns(cols: KanbanColumn[]): string {
  return cols.map((c) => `${encodeURIComponent(c.title)}:${c.items.map((i) => encodeURIComponent(i)).join(",")}`).join("^");
}

export function parseColumns(raw: string): KanbanColumn[] {
  if (!raw) return DEFAULT_COLUMNS;
  try {
    return raw.split("^").map((col) => {
      const [title, ...rest] = col.split(":");
      const items = rest.join(":").split(",").filter(Boolean).map((i) => decodeURIComponent(i));
      return { title: decodeURIComponent(title), items };
    });
  } catch {
    return DEFAULT_COLUMNS;
  }
}

const LS_KEY = "widgit-kanban";

function storageKey(boardId: string): string {
  return `${LS_KEY}-${boardId}`;
}

export function loadKanban(boardId: string): KanbanColumn[] | null {
  try {
    const raw = localStorage.getItem(storageKey(boardId));
    if (!raw) return null;
    return JSON.parse(raw) as KanbanColumn[];
  } catch {
    return null;
  }
}

export function saveKanban(boardId: string, columns: KanbanColumn[]): void {
  try {
    localStorage.setItem(storageKey(boardId), JSON.stringify(columns));
  } catch { /* 무시 */ }
}
