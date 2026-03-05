export interface SeasonEvent {
  name: string;
  emoji: string;
  getDate: (year: number) => Date;
}

function toLocalDate(y: number, m: number, d: number) {
  return new Date(y, m, d);
}

export const SEASON_EVENTS: SeasonEvent[] = [
  { name: "새해", emoji: "🎉", getDate: (y) => toLocalDate(y, 0, 1) },
  { name: "설날", emoji: "🧧", getDate: (y) => toLocalDate(y, 0, 29) }, // approximate
  { name: "벚꽃 시즌", emoji: "🌸", getDate: (y) => toLocalDate(y, 3, 5) },
  { name: "어린이날", emoji: "🎈", getDate: (y) => toLocalDate(y, 4, 5) },
  { name: "여름 휴가", emoji: "🏖️", getDate: (y) => toLocalDate(y, 6, 20) },
  { name: "추석", emoji: "🌕", getDate: (y) => toLocalDate(y, 8, 17) }, // approximate
  { name: "할로윈", emoji: "🎃", getDate: (y) => toLocalDate(y, 9, 31) },
  { name: "빼빼로데이", emoji: "🍫", getDate: (y) => toLocalDate(y, 10, 11) },
  { name: "크리스마스", emoji: "🎄", getDate: (y) => toLocalDate(y, 11, 25) },
  { name: "연말", emoji: "✨", getDate: (y) => toLocalDate(y, 11, 31) },
];

export function getNextEvent(events?: SeasonEvent[]): { event: SeasonEvent; daysLeft: number; targetDate: Date } {
  const list = events || SEASON_EVENTS;
  const now = new Date();
  const today = toLocalDate(now.getFullYear(), now.getMonth(), now.getDate());

  let closest: { event: SeasonEvent; daysLeft: number; targetDate: Date } | null = null;

  for (const evt of list) {
    // Try this year first
    let target = evt.getDate(now.getFullYear());
    if (target < today) {
      target = evt.getDate(now.getFullYear() + 1);
    }
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff >= 0 && (!closest || diff < closest.daysLeft)) {
      closest = { event: evt, daysLeft: diff, targetDate: target };
    }
  }

  return closest || { event: list[0], daysLeft: 0, targetDate: today };
}
