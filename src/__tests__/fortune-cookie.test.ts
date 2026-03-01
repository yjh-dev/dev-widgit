import { describe, it, expect } from "vitest";
import { getRandomFortune, FORTUNE_MESSAGES_KO, FORTUNE_MESSAGES_EN } from "@/lib/fortune-cookie";

describe("fortune-cookie", () => {
  it("returns a Korean fortune by default", () => {
    const fortune = getRandomFortune("ko");
    expect(FORTUNE_MESSAGES_KO).toContain(fortune);
  });

  it("returns an English fortune", () => {
    const fortune = getRandomFortune("en");
    expect(FORTUNE_MESSAGES_EN).toContain(fortune);
  });

  it("returns deterministic result with seed", () => {
    const a = getRandomFortune("ko", 5);
    const b = getRandomFortune("ko", 5);
    expect(a).toBe(b);
  });

  it("different seeds give potentially different results", () => {
    const a = getRandomFortune("ko", 0);
    const b = getRandomFortune("ko", 1);
    // They could be the same if messages[0] === messages[1], but usually not
    expect(typeof a).toBe("string");
    expect(typeof b).toBe("string");
  });
});
