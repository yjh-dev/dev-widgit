export type TestimonialLayout = "card" | "minimal" | "centered";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
}

export const VALID_LAYOUTS: TestimonialLayout[] = ["card", "minimal", "centered"];

/* ── Star rating (absorbed from rating-card) ── */

export type StarType = "full" | "half" | "empty";

/**
 * rating(0.5 단위)을 기반으로 각 별의 상태를 반환한다.
 */
export function renderStars(rating: number, maxStars: number): StarType[] {
  const clamped = Math.max(0, Math.min(rating, maxStars));
  const result: StarType[] = [];

  for (let i = 1; i <= maxStars; i++) {
    if (clamped >= i) {
      result.push("full");
    } else if (clamped >= i - 0.5) {
      result.push("half");
    } else {
      result.push("empty");
    }
  }

  return result;
}
