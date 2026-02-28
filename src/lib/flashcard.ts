export interface FlashCard {
  front: string;
  back: string;
}

export function serializeCards(cards: FlashCard[]): string {
  return cards
    .filter(c => c.front.trim() || c.back.trim())
    .map(c => `${encodeURIComponent(c.front)}~${encodeURIComponent(c.back)}`)
    .join("|");
}

export function deserializeCards(raw: string): FlashCard[] {
  if (!raw) return [];
  return raw.split("|").map(entry => {
    const [front, back] = entry.split("~");
    return {
      front: decodeURIComponent(front || ""),
      back: decodeURIComponent(back || ""),
    };
  });
}

export const SAMPLE_CARDS: FlashCard[] = [
  { front: "Apple", back: "사과" },
  { front: "Book", back: "책" },
  { front: "Water", back: "물" },
];
