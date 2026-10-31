import { afterEach, describe, expect, it, vi } from "vitest";
import { readClientIp, readUtm } from "../lib/attribution";

afterEach(() => vi.unstubAllGlobals());

function browser(search: string, referrer = "") {
  const values = new Map<string, string>();
  vi.stubGlobal("window", { location: { search } });
  vi.stubGlobal("document", { referrer });
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => values.get(key) || null,
    setItem: (key: string, value: string) => values.set(key, value),
  });
}

describe("readUtm", () => {
  it("records direct traffic with explicit attribution", () => {
    browser("");
    expect(readUtm()).toEqual({
      utm_source: "direct", utm_medium: "none", utm_campaign: "none", utm_term: "none", utm_content: "none",
    });
  });

  it("normalizes campaign aliases and keeps every UTM field", () => {
    browser("?utm_source=fb&utm_medium=paid_social&utm_campaign=bootcamp");
    expect(readUtm()).toMatchObject({
      utm_source: "facebook.com", utm_medium: "paid_social", utm_campaign: "bootcamp", utm_term: "", utm_content: "",
    });
  });

  it("returns the public IP reported by the VLS browser fallback", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ip: "203.0.113.10" })));
    await expect(readClientIp()).resolves.toBe("203.0.113.10");
  });
});
