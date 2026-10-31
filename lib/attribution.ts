import { UTM_KEYS, type Utm } from "./enquiry";

const KEY = "vls-bootcamp-utm";
const SOURCE_ALIASES: Record<string, string> = {
  fb: "facebook.com", ig: "instagram.com", yt: "youtube.com", li: "linkedin.com", tw: "twitter.com", gads: "google.com",
};
const DIRECT: Utm = {
  utm_source: "direct", utm_medium: "none", utm_campaign: "none", utm_term: "none", utm_content: "none",
};

/** First-touch attribution, matching the other VLS landing pages. */
export function readUtm(): Utm {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) return JSON.parse(stored) as Utm;

    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 120);
    }

    if (utm.utm_source) utm.utm_source = SOURCE_ALIASES[utm.utm_source.toLowerCase()] || utm.utm_source;
    else if (document.referrer) {
      try { utm.utm_source = new URL(document.referrer).hostname.replace(/^www\./, ""); } catch { utm.utm_source = "direct"; }
    } else utm.utm_source = "direct";

    const result = utm.utm_source === "direct" || utm.utm_source.includes("localhost") || utm.utm_source.includes("127.0.0.1")
      ? DIRECT
      : Object.fromEntries(UTM_KEYS.map((key) => [key, utm[key] || ""])) as Utm;
    localStorage.setItem(KEY, JSON.stringify(result));
    return result;
  } catch {
    return DIRECT;
  }
}

/** Browser public-IP fallback, matching the existing VLS landing pages. */
export async function readClientIp(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json", { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) return "";
    const body = await response.json() as { ip?: unknown };
    return typeof body.ip === "string" ? body.ip.trim().slice(0, 45) : "";
  } catch {
    return "";
  }
}
