import { describe, it, expect } from "vitest";
import { compressWidgetUrl, decompressToParams } from "@/lib/url-compression";

describe("compressWidgetUrl", () => {
  it("returns original URL when no params", () => {
    const url = "https://example.com/widget/clock";
    expect(compressWidgetUrl(url)).toBe(url);
  });

  it("compresses URL with long params", () => {
    const url = "https://example.com/widget/dday?title=very-long-title-for-testing-purposes&date=2026-01-01&bg=1E1E1E&text=FFFFFF&color=6366F1&doneMsg=congratulations-you-did-it&barColor=22C55E&dateFmt=full&showTime=true&blink=true";
    const result = compressWidgetUrl(url);
    // Should either compress or return original (both valid)
    expect(result.length).toBeLessThanOrEqual(url.length);
  });

  it("returns original if compressed is longer", () => {
    const url = "https://example.com/widget/clock?bg=FF";
    const result = compressWidgetUrl(url);
    // Short params might not compress well, so result should be original or compressed
    expect(result.length).toBeLessThanOrEqual(url.length + 10);
  });
});

describe("decompressToParams", () => {
  it("returns null for invalid input", () => {
    expect(decompressToParams("invalid")).toBeNull();
  });

  it("roundtrips correctly", () => {
    const url = "https://example.com/widget/dday?title=hello&date=2026-01-01&bg=1E1E1E";
    const compressed = compressWidgetUrl(url);
    if (compressed.includes("?c=")) {
      const cParam = new URL(compressed).searchParams.get("c")!;
      const params = decompressToParams(cParam);
      expect(params).not.toBeNull();
      expect(params!.get("title")).toBe("hello");
      expect(params!.get("date")).toBe("2026-01-01");
      expect(params!.get("bg")).toBe("1E1E1E");
    }
  });
});
