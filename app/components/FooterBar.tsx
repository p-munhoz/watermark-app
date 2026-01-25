"use client";

import Link from "next/link";
import type { Messages } from "../lib/i18n";

type Props = {
  t: Messages;
};

export function FooterBar({ t }: Props) {
  return (
    <footer className="mt-12 sm:mt-16 border-t border-slate-200 bg-white/50 backdrop-blur-sm dark:bg-slate-950/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col gap-4">
          {/* Note de copyright */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center sm:text-left">
            {t.footerNote}
          </p>

          {/* Liens - empilés sur mobile, en ligne sur desktop */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <Link 
              href="/about" 
              className="hover:text-indigo-600 transition-colors dark:hover:text-indigo-300 whitespace-nowrap"
            >
              {t.footerAbout}
            </Link>
            <Link 
              href="/privacy" 
              className="hover:text-indigo-600 transition-colors dark:hover:text-indigo-300 whitespace-nowrap"
            >
              {t.footerPrivacy}
            </Link>
            <button
              type="button"
              onClick={() => (window as any)?.cookieconsent?.show?.()}
              className="hover:text-indigo-600 transition-colors dark:hover:text-indigo-300 whitespace-nowrap"
            >
              {t.footerCookies}
            </button>
            <a
              href="https://github.com/p-munhoz/watermark-app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 transition-colors dark:hover:text-indigo-300 whitespace-nowrap"
            >
              {t.footerSource}
            </a>
            <Link 
              href="/contact" 
              className="hover:text-indigo-600 transition-colors dark:hover:text-indigo-300 whitespace-nowrap"
            >
              {t.footerContact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}