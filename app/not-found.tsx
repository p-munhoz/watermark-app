"use client";

import Link from "next/link";
import { useLocale } from "./providers/LocaleProvider";
import { HeaderBar } from "./components/HeaderBar";
import { FooterBar } from "./components/FooterBar";

export default function NotFound() {
  const { locale, setLocale, t } = useLocale();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <HeaderBar t={t} locale={locale} onChangeLocale={setLocale} />

      <section className="max-w-3xl mx-auto px-6 py-24 text-center space-y-6">
        <p className="text-sm font-semibold text-indigo-600">404</p>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{t.notFoundTitle}</h1>
        <p className="text-slate-600 dark:text-slate-300">{t.notFoundBody}</p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {t.notFoundBack}
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 rounded-xl border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
          >
            {t.footerContact}
          </Link>
        </div>
      </section>
      <FooterBar t={t} />
    </main>
  );
}
