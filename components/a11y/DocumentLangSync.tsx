"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/**
 * Keeps <html lang> aligned with the active next-intl locale (a11y / SEO).
 * Root layout defaults to lang="es"; this updates after hydration for /en and /de.
 */
export default function DocumentLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
