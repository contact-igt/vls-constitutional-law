import { UTM_KEYS, type Utm } from "./enquiry";

const KEY = "vls-bootcamp-utm";

/** First-touch UTM params: kept for the tab session so a later in-page navigation does not lose them. */
export function readUtm(): Utm {
  const fresh: Utm = {};
  const params = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 120);
  }
  try {
    if (Object.keys(fresh).length) {
      sessionStorage.setItem(KEY, JSON.stringify(fresh));
      return fresh;
    }
    const stored = sessionStorage.getItem(KEY);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    return fresh;
  }
}
