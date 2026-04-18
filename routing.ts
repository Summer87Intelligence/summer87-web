import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for locales + URL prefix strategy.
 * Must stay aligned with middleware and next-intl request config.
 */
export const routing = defineRouting({
  locales: ["es", "en", "de"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
