import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleEnquiry } from "../lib/enquiry";

const valid = {
  name: "Asha K",
  mobile: "+91 98765 43210",
  email: "asha@example.in",
  status: "Law student",
  city: "Chennai",
  consent: true,
  utm: { utm_source: "instagram", utm_campaign: "boot", evil: "x" },
  pageUrl: "https://example.test/?utm_source=instagram",
};

const post = (body: unknown) =>
  handleEnquiry(new Request("http://localhost/api/enquiry", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) }));

beforeEach(() => {
  vi.stubEnv("LEAD_WEBHOOK_URL", "");
  vi.stubEnv("LEAD_WEBHOOK_TOKEN", "");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/enquiry", () => {
  it("rejects malformed JSON and non-object bodies", async () => {
    expect((await post("{nope")).status).toBe(400);
    expect((await post("[1,2]")).status).toBe(400);
  });

  it("rejects invalid data with field errors and never calls the destination", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://dest.test/hook");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await post({ ...valid, mobile: "12345", consent: false });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.mode).toBe("invalid");
    expect(Object.keys(body.errors).sort()).toEqual(["consent", "mobile"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("tells the client to use WhatsApp when no destination is configured", async () => {
    const res = await post(valid);
    expect(res.status).toBe(501);
    expect((await res.json()).mode).toBe("whatsapp");
  });

  it("forwards a normalized payload with course id and only known UTM keys", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://dest.test/hook");
    vi.stubEnv("LEAD_WEBHOOK_TOKEN", "secret");
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect((await res.json()).mode).toBe("saved");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://dest.test/hook");
    expect(init.headers.Authorization).toBe("Bearer secret");
    const sent = JSON.parse(init.body);
    expect(sent.course).toBe("constitutional-law-bootcamp");
    expect(sent.mobile).toBe("9876543210");
    expect(sent.utm).toEqual({ utm_source: "instagram", utm_campaign: "boot" });
    expect(sent.consent.given).toBe(true);
  });

  it("reports an error, not success, when the destination fails", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://dest.test/hook");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 500 })));
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect((await res.json()).mode).toBe("error");
  });

  it("reports an error when the destination is unreachable and logs no personal data", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://dest.test/hook");
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    expect((await post(valid)).status).toBe(502);
    expect(JSON.stringify(log.mock.calls)).not.toMatch(/Asha|9876543210|asha@/);
  });

  it("silently drops honeypot submissions without forwarding", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://dest.test/hook");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await post({ ...valid, website: "http://spam.test" });
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
