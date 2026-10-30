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

const post = (body: unknown, headers?: HeadersInit) =>
  handleEnquiry(new Request("http://localhost/api/enquiry", { method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body) }));

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_SERVER", "localhost");
  vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "");
  vi.stubEnv("NEXT_PUBLIC_STAGE_API_URL", "");
  vi.stubEnv("NEXT_PUBLIC_PRODUCTION_API_URL", "");
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
    vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "https://dest.test/api/v1");
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
    vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "https://dest.test/api/v1");
    vi.stubEnv("LEAD_WEBHOOK_TOKEN", "secret");
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await post(valid, { "x-forwarded-for": "203.0.113.10, 10.0.0.1" });
    expect(res.status).toBe(200);
    expect((await res.json()).mode).toBe("saved");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://dest.test/api/v1/vls-constitutional-bootcamp/register");
    expect(init.headers.Authorization).toBe("Bearer secret");
    const sent = JSON.parse(init.body);
    expect(sent.course).toBe("constitutional-law-bootcamp");
    expect(sent.client_key).toBe("vls_law");
    expect(sent.mobile).toBe("9876543210");
    expect(sent.utm).toEqual({ utm_source: "instagram", utm_campaign: "boot" });
    expect(sent.consent.given).toBe(true);
    expect(sent.current_status).toBe("Law student");
    expect(sent.city).toBe("Chennai");
    expect(sent.ip_address).toBe("203.0.113.10");
    expect(sent.token).toBe("secret");
  });

  it("marks a lead paid only after the payment route has trusted it", async () => {
    vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "https://dest.test/api/v1");
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await post({ ...valid, payment_status: "paid", amount: 500 });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).payment_status).toBe("waitlist");

    await handleEnquiry(new Request("http://localhost/api/payment/verify", {
      method: "POST",
      body: JSON.stringify({ ...valid, payment_status: "paid", amount: 500 }),
    }), true);
    const paid = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(paid.payment_status).toBe("paid");
    expect(paid.amount).toBe(500);
  });

  it("reports an error, not success, when the destination fails", async () => {
    vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "https://dest.test/api/v1");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 500 })));
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect((await res.json()).mode).toBe("error");
  });

  it("reports an error when the destination is unreachable and logs no personal data", async () => {
    vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "https://dest.test/api/v1");
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    expect((await post(valid)).status).toBe(502);
    expect(JSON.stringify(log.mock.calls)).not.toMatch(/Asha|9876543210|asha@/);
  });

  it("silently drops honeypot submissions without forwarding", async () => {
    vi.stubEnv("NEXT_PUBLIC_LOCALHOST_API_URL", "https://dest.test/api/v1");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await post({ ...valid, website: "http://spam.test" });
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
