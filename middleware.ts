import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // /es/... or /en/... (default locale without prefix)
});

export const config = {
  matcher: [
    // Skip static files and API routes
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};
