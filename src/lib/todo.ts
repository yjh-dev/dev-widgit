export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

const LS_KEY = "wiget-tree-todo";

function storageKey(widgetId: string): string {
  return `${LS_KEY}-${widgetId}`;
}

export function loadTodos(widgetId: string): TodoItem[] {
  try {
    const raw = localStorage.getItem(storageKey(widgetId));
    if (!raw) return [];
    return JSON.parse(raw) as TodoItem[];
  } catch {
    return [];
  }
}

export function saveTodos(widgetId: string, items: TodoItem[]): void {
  try {
    localStorage.setItem(storageKey(widgetId), JSON.stringify(items));
  } catch { /* 무시 */ }
}

export function parseTodoItems(raw: string): TodoItem[] {
  if (!raw) return [];
  return raw.split("|").filter(Boolean).map((entry, i) => {
    const done = entry.startsWith("!");
    const text = done ? entry.slice(1) : entry;
    return { id: `t${i}`, text: decodeURIComponent(text), done };
  });
}

export function serializeTodoItems(items: TodoItem[]): string {
  return items
    .map((item) => `${item.done ? "!" : ""}${encodeURIComponent(item.text)}`)
    .join("|");
}

export function generateId(): string {
  return `t${Date.now().toString(36)}`;
}
