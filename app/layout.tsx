import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LocaleProvider } from "./providers/LocaleProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { defaultLocale } from "./lib/i18n";

const inter = Inter({ subsets: ["latin"] });

const preferenceScript = `
(() => {
  try {
    const themeKey = 'watermark-theme';
    const localeKey = 'watermark-locale';
    const root = document.documentElement;

    const storedTheme = localStorage.getItem(themeKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : prefersDark ? 'dark' : 'light';

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.dataset.theme = theme;

    const storedLocale = localStorage.getItem(localeKey);
    const browserLang = navigator.language ? navigator.language.toLowerCase() : '';
    const guessed = browserLang.startsWith('en') ? 'en' : browserLang.startsWith('fr') ? 'fr' : null;
    const locale = storedLocale === 'en' || storedLocale === 'fr' ? storedLocale : (guessed || '${defaultLocale}');
    root.setAttribute('lang', locale);
    root.dataset.locale = locale;

    root.removeAttribute('data-preload');
  } catch (e) {
    // ignore
  }
})();
`;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://watermark.example.com";
const openGraphLocale = defaultLocale === "fr" ? "fr_FR" : "en_US";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Watermark - Private watermark tool for PDFs & images",
  description:
    "Add watermarks to PDFs and images privately in your browser. 100% free, no uploads, local processing only.",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      fr: `${siteUrl}/?lang=fr`,
    },
  },
  openGraph: {
    title: "Watermark - Private watermark tool for PDFs & images",
    description:
      "Add watermarks to PDFs and images privately in your browser. 100% free, no uploads, local processing only.",
    url: siteUrl,
    siteName: "Watermark",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Watermark - private watermarking tool",
      },
    ],
    locale: openGraphLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark - Private watermark tool for PDFs & images",
    description:
      "Add watermarks to PDFs and images privately in your browser. 100% free, no uploads, local processing only.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "script:type": "application/ld+json",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eef2ff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale} data-preload="true" suppressHydrationWarning>
      <head>
        <style id="preload-style">{`html[data-preload=\"true\"] body { opacity: 0; }`}</style>
        <Script id="preference-init" strategy="beforeInteractive">
          {preferenceScript}
        </Script>
        <Script id="ldjson" type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Watermark",
            "applicationCategory": "Utility",
            "operatingSystem": "Web",
            "description": "Add watermarks to PDFs and images privately in your browser. 100% free, no uploads, local processing only.",
            "url": "${siteUrl}",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "inLanguage": ["en", "fr"]
          }
          `}
        </Script>
        <link rel="stylesheet" href="/vendor/cookieconsent/cookieconsent.css" />
        <Script
          id="cookieconsent-lib"
          strategy="beforeInteractive"
          src="/vendor/cookieconsent/cookieconsent.js"
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
      >
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
            </Script>
          </>
        ) : null}
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
