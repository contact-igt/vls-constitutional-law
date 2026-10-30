import { afterEach, describe, expect, it, vi } from "vitest";

async function load() {
  vi.resetModules();
  return import("../lib/site");
}

afterEach(() => vi.unstubAllEnvs());

describe("site url guard", () => {
  it("falls back to localhost and stays noindex outside production", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_ENV", "");
    const site = await load();
    expect(site.siteUrl).toBe("http://localhost:3000");
    expect(site.indexable).toBe(false);
  });

  it("refuses a production deploy without an https site URL", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    await expect(load()).rejects.toThrow(/must be set/);
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://insecure.test");
    await expect(load()).rejects.toThrow(/https/);
  });

  it("is indexable in production and strips a trailing slash", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://bootcamp.example.test/");
    const site = await load();
    expect(site.siteUrl).toBe("https://bootcamp.example.test");
    expect(site.indexable).toBe(true);
  });

  it("allows indexing on non-Vercel hosts only by explicit opt-in", async () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("ALLOW_INDEXING", "true");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://bootcamp.example.test");
    expect((await load()).indexable).toBe(true);
  });
});
