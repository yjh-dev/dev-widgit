export interface PollOption {
  text: string;
  votes: number;
}

export function parsePollOptions(raw: string): PollOption[] {
  if (!raw) return [];
  return raw.split("|").filter(Boolean).map((text) => ({ text: decodeURIComponent(text), votes: 0 }));
}

export function serializePollOptions(options: string[]): string {
  return options.map((t) => encodeURIComponent(t)).join("|");
}

export function calculatePercentages(options: PollOption[]): { text: string; votes: number; pct: number }[] {
  const total = options.reduce((s, o) => s + o.votes, 0);
  return options.map((o) => ({ ...o, pct: total > 0 ? (o.votes / total) * 100 : 0 }));
}

const LS_KEY = "wiget-tree-poll";

function storageKey(pollId: string): string {
  return `${LS_KEY}-${pollId}`;
}

export function loadPollVotes(pollId: string): number[] {
  try {
    const raw = localStorage.getItem(storageKey(pollId));
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function savePollVotes(pollId: string, votes: number[]): void {
  try {
    localStorage.setItem(storageKey(pollId), JSON.stringify(votes));
  } catch { /* 무시 */ }
}

export function hasVoted(pollId: string): boolean {
  try {
    return localStorage.getItem(`${storageKey(pollId)}-voted`) === "true";
  } catch {
    return false;
  }
}

export function markVoted(pollId: string): void {
  try {
    localStorage.setItem(`${storageKey(pollId)}-voted`, "true");
  } catch { /* 무시 */ }
}
