import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Summer87 — Intelligent Business Engines",
    default: "Summer87 — Intelligent Business Engines",
  },
  description:
    "Summer87 is a disruptive AI consulting firm specializing in Intelligent Business Engines, Neuroventas, and the Summer87 BI Suite. We reimagine how businesses operate.",
  keywords: [
    "intelligent business engines",
    "AI consulting",
    "neuroventas",
    "business intelligence",
    "ERP",
    "summer87",
    "consultora IA",
    "motores inteligentes de negocios",
  ],
  authors: [{ name: "Summer87", url: "https://summer87.ai" }],
  creator: "Summer87",
  publisher: "Summer87",
  metadataBase: new URL("https://summer87.ai"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "de_DE"],
    url: "https://summer87.ai",
    siteName: "Summer87",
    title: "Summer87 — Intelligent Business Engines",
    description:
      "Consultora disruptiva en motores inteligentes de negocios. Neuroventas, IA operativa y Suite BI Summer87.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Summer87 — Intelligent Business Engines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Summer87 — Intelligent Business Engines",
    description:
      "Consultora disruptiva en motores inteligentes de negocios.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-brand-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
