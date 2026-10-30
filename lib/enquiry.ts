import { COURSE_ID } from "./content";
import { constitutionalRegistrationUrl } from "./api";
import { programConfig } from "./program";
import { normalizeIndianMobile, validateEnquiry, type EnquiryErrors, type EnquiryInput } from "./validation";

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export const CONSENT_TEXT =
  "I agree to be contacted by VLS Law Academy about this enquiry, as described in the Privacy Policy.";

/** What the browser sends to /api/enquiry. */
export type EnquiryRequest = EnquiryInput & {
  utm?: Utm; pageUrl?: string; website?: string; payment_status?: "waitlist" | "paid";
  amount?: number | ""; razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string;
};

/**
 * Responses:
 *  200 saved       lead forwarded to the configured destination
 *  400 invalid     field errors
 *  501 whatsapp    no destination configured; client must use the WhatsApp handoff
 *  502 error       destination configured but delivery failed
 */
export type EnquiryResponse =
  | { ok: true; mode: "saved" }
  | { ok: false; mode: "invalid"; errors: EnquiryErrors }
  | { ok: false; mode: "whatsapp" }
  | { ok: false; mode: "error" };

const MAX_BODY = 8_000;

function clean(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function cleanUtm(raw: unknown): Utm {
  const out: Utm = {};
  if (raw && typeof raw === "object") {
    for (const k of UTM_KEYS) {
      const v = clean((raw as Record<string, unknown>)[k], 120);
      if (v) out[k] = v;
    }
  }
  return out;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return clean(forwarded?.split(",")[0], 45) || clean(request.headers.get("x-real-ip"), 45);
}

function json(body: EnquiryResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function handleEnquiry(request: Request, trustedPayment = false): Promise<Response> {
  const text = await request.text();
  if (text.length > MAX_BODY) return json({ ok: false, mode: "invalid", errors: {} }, 400);

  let raw: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, mode: "invalid", errors: {} }, 400);
  }

  // Honeypot: real users never see or fill this field. Pretend success, store nothing.
  if (clean(raw.website, 200)) return json({ ok: true, mode: "saved" }, 200);

  const input: EnquiryInput = {
    name: clean(raw.name, 120),
    mobile: clean(raw.mobile, 40),
    email: clean(raw.email, 260),
    status: clean(raw.status, 40),
    city: clean(raw.city, 100),
    consent: raw.consent === true,
  };
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length) return json({ ok: false, mode: "invalid", errors }, 400);

  const paymentStatus = raw.payment_status === "paid" && trustedPayment ? "paid" : "waitlist";

  const url = constitutionalRegistrationUrl();
  if (!url) return json({ ok: false, mode: "whatsapp" }, 501);

  const utm = cleanUtm(raw.utm);
  const token = process.env.LEAD_WEBHOOK_TOKEN;
  const payload = {
    course: COURSE_ID,
    client_key: "vls_law",
    name: input.name,
    mobile: normalizeIndianMobile(input.mobile),
    email: input.email,
    status: input.status,
    current_status: input.status,
    city: input.city || null,
    consent: { given: true, text: CONSENT_TEXT },
    utm,
    ...utm,
    pageUrl: clean(raw.pageUrl, 500) || null,
    submittedAt: new Date().toISOString(),
    registered_date: new Date().toISOString(),
    programme_date: programConfig.classStartAt || programConfig.date || "",
    programm_date: programConfig.classStartAt || programConfig.date || "",
    page_name: programConfig.pageName,
    ip_address: clientIp(request) || null,
    payment_status: paymentStatus,
    amount: paymentStatus === "paid" ? Number(raw.amount) || 0 : "",
    razorpay_order_id: paymentStatus === "paid" ? clean(raw.razorpay_order_id, 120) : "",
    razorpay_payment_id: paymentStatus === "paid" ? clean(raw.razorpay_payment_id, 120) : "",
    razorpay_signature: paymentStatus === "paid" ? clean(raw.razorpay_signature, 200) : "",
    ...(token ? { token } : {}),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`destination responded ${res.status}`);
    return json({ ok: true, mode: "saved" }, 200);
  } catch (err) {
    // No personal data in logs: only the failure reason.
    console.error("[enquiry] delivery failed:", err instanceof Error ? err.message : "unknown");
    return json({ ok: false, mode: "error" }, 502);
  }
}
