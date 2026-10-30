const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const onProductionDeploy = process.env.VERCEL_ENV === "production";

if (onProductionDeploy) {
  // A production deploy must never publish a localhost (or missing) canonical URL.
  if (!raw) throw new Error("NEXT_PUBLIC_SITE_URL must be set for a production deployment.");
  if (new URL(raw).protocol !== "https:") throw new Error("NEXT_PUBLIC_SITE_URL must be an https URL in production.");
}

/** Canonical origin, without a trailing slash. Falls back to localhost for local development only. */
export const siteUrl = (raw || "http://localhost:3000").replace(/\/+$/, "");

/**
 * Only a production deployment (or an explicit opt-in on other hosts) is indexable.
 * Staging and previews stay out of search results.
 */
export const indexable = onProductionDeploy || process.env.ALLOW_INDEXING === "true";
