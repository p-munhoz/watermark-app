"use client";

import Link from "next/link";
import { useLocale } from "../providers/LocaleProvider";
import { HeaderBar } from "../components/HeaderBar";
import { FooterBar } from "../components/FooterBar";
import type { Locale } from "../lib/i18n";

const content: Record<Locale, { title: string; intro: string; points: { title: string; text: string }[]; legal: string; backHome: string }> = {
  fr: {
    title: "Confidentialité & Mentions légales",
    intro: "Watermark fonctionne entièrement dans votre navigateur : aucun fichier n'est envoyé ni conservé.",
    points: [
      { title: "Traitement local", text: "Les PDF et images sont traités côté client (canvas / pdf-lib). Aucun upload serveur." },
      { title: "Stockage minimal", text: "Seules vos préférences (langue, réglages du filigrane) sont enregistrées dans localStorage." },
      { title: "Cookies tiers", text: "Aucun tracker tiers n'est chargé par défaut. Si vous activez Google Analytics, des cookies/mesures d'audience tiers pourront être déposés." },
      { title: "Code source", text: "Le code est ouvert : vous pouvez vérifier et auto-héberger l'outil." },
      { title: "Fichiers volumineux", text: "Des fichiers très lourds ou très longs (ex. >50 Mo ou milliers de pages) peuvent saturer la mémoire du navigateur et faire planter l'onglet." },
    ],
    legal: "Responsable de publication : Watermark. Hébergement : Vercel (UE/US). Contact : page Contact.",
    backHome: "Retour à l'accueil",
  },
  en: {
    title: "Privacy & Legal",
    intro: "Watermark runs fully in your browser: no files are uploaded or stored.",
    points: [
      { title: "Local processing", text: "PDFs and images are processed client-side (canvas / pdf-lib). No server upload." },
      { title: "Minimal storage", text: "Only your preferences (language, watermark settings) are kept in localStorage." },
      { title: "Third-party cookies", text: "No ad network or tracker is loaded by default. If you enable Google Analytics, third-party measurement cookies may be set." },
      { title: "Open source", text: "Code is public: you can audit and self-host the tool." },
      { title: "Large files", text: "Very heavy or long documents (e.g., >50 MB or thousands of pages) can exhaust browser memory and crash the tab." },
    ],
    legal: "Publisher: Watermark. Hosting: Vercel (EU/US). Contact: see Contact page.",
    backHome: "Back to home",
  },
};

export default function PrivacyPage() {
  const { locale, setLocale, t } = useLocale();
  const c = content[locale];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <HeaderBar t={t} locale={locale} onChangeLocale={setLocale} />

      <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 space-y-6 dark:bg-slate-900 dark:border-slate-800">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-[0.2em]">{c.title}</p>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{c.title}</h1>
            <p className="text-slate-600 dark:text-slate-300">{c.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {c.points.map((p) => (
              <div key={p.title} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/60">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 dark:text-slate-100">{p.title}</h3>
                <p className="text-slate-600 text-sm dark:text-slate-300">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 text-slate-700 text-sm dark:bg-indigo-900/30 dark:border-indigo-900 dark:text-slate-200">
            {c.legal}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link href="/" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors dark:text-indigo-300 dark:hover:text-indigo-200">
            ← {c.backHome}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-indigo-700 border border-indigo-200 rounded-xl px-4 py-2 hover:bg-indigo-50 transition-colors font-semibold dark:text-indigo-200 dark:border-indigo-900 dark:hover:bg-indigo-900/30"
          >
            Contact
          </Link>
        </div>
      </section>

      <FooterBar t={t} />
    </main>
  );
}
