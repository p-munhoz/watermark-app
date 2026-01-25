"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { locales, type Locale, type Messages } from "../lib/i18n";
import { useTheme } from "../providers/ThemeProvider";

type Props = {
  t: Messages;
  locale: Locale;
  onChangeLocale: (loc: Locale) => void;
};

export function HeaderBar({ t, locale, onChangeLocale }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10 dark:bg-slate-950/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-3">
          {/* Logo et titre */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            <Link
              href="/"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 dark:bg-indigo-900/60 dark:text-indigo-200"
            >
              <Logo size={22} className="sm:w-[26px] sm:h-[26px]" />
            </Link>
            <div className="min-w-0">
              <Link
                href="/"
                className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent block truncate"
              >
                {t.appName}
              </Link>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 dark:text-slate-300 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Contrôles à droite - empilés sur mobile */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-sm text-slate-600 dark:text-slate-300 flex-shrink-0">
            {/* Badge privé - caché sur très petit écran */}
            <div className="hidden md:flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="font-medium text-xs sm:text-sm">{t.privateBadge}</span>
            </div>

            {/* Container pour langue + thème */}
            <div className="flex items-center gap-2">
              {/* Sélecteur de langue */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {t.languageLabel}
                </span>
                <div className="flex items-center rounded-full border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-800/70">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => onChangeLocale(loc)}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-colors ${
                        locale === loc
                          ? "bg-indigo-600 text-white"
                          : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-200"
                      }`}
                      aria-pressed={locale === loc}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bouton thème */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 bg-white/70 text-slate-700 text-[10px] sm:text-xs font-semibold transition-colors hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-100"
                aria-label={t.themeToggle}
                title={t.themeToggle}
              >
                <span
                  className={`inline-flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    theme === "dark" ? "bg-indigo-400" : "bg-amber-300"
                  }`}
                />
                <span className="hidden sm:inline">
                  {theme === "dark" ? t.themeDark : t.themeLight}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}