/**
 * Canonical site origin for metadata, SEO routes, and JSON-LD.
 * Override in deploy with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://summer87.ai"
).replace(/\/$/, "");
