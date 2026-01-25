"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, messages, readStoredLocale, storeLocale, detectBrowserLocale, type Locale, type Messages } from "../lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  t: Messages;
  setLocale: (loc: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Start with the server-rendered locale to avoid hydration mismatches, then
  // hydrate with the stored preference (localStorage) on the client.
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useLayoutEffect(() => {
    const stored = readStoredLocale();
    if (stored && stored !== locale) {
      setLocale(stored);
      return;
    }

    const browser = detectBrowserLocale();
    if (!stored && browser && browser !== locale) {
      setLocale(browser);
    }
  }, []);

  useEffect(() => {
    storeLocale(locale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dataset.locale = locale;
      // Update cookie banner text if present
      (window as any)?.cookieconsent?.updateLocale?.();
    }
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: messages[locale], setLocale }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
