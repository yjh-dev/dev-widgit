export interface TimelineEvent {
  title: string;
  date: string; // YYYY-MM-DD
}

export interface TimelineEventWithDday extends TimelineEvent {
  dday: number;
  ddayLabel: string;
  isPast: boolean;
}

function todayStr(): string {
  const n = new Date();
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function toLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function calculateTimeline(events: TimelineEvent[]): TimelineEventWithDday[] {
  const today = toLocalDate(todayStr());

  return events
    .map((e) => {
      const target = toLocalDate(e.date);
      const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const isPast = diff < 0;
      const ddayLabel =
        diff === 0 ? "D-Day" : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
      return { ...e, dday: diff, ddayLabel, isPast };
    })
    .sort((a, b) => a.dday - b.dday);
}

export function parseEvents(raw: string): TimelineEvent[] {
  if (!raw) return [];
  try {
    return raw.split("|").map((item) => {
      const [title, date] = item.split("~");
      return { title: decodeURIComponent(title || ""), date: date || "" };
    }).filter((e) => e.title && e.date);
  } catch {
    return [];
  }
}

export function serializeEvents(events: TimelineEvent[]): string {
  return events
    .map((e) => `${encodeURIComponent(e.title)}~${e.date}`)
    .join("|");
}
