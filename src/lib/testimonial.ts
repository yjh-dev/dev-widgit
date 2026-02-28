export type TestimonialLayout = "card" | "minimal" | "centered";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
}

export const VALID_LAYOUTS: TestimonialLayout[] = ["card", "minimal", "centered"];
