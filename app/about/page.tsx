"use client";

import { useLocale } from "../providers/LocaleProvider";
import type { Locale } from "../lib/i18n";
import { HeaderBar } from "../components/HeaderBar";
import { FooterBar } from "../components/FooterBar";

const content: Record<Locale, {
  title: string;
  introTitle: string;
  intro: string;
  privacyTitle: string;
  privacyPoints: string[];
  techTitle: string;
  techPoints: string[];
  limitsTitle: string;
  limits: string;
  backHome: string;
  languageLabel: string;
}> = {
  fr: {
    title: "À propos",
    introTitle: "Pourquoi ce projet ?",
    intro: "Watermark est un outil simple pour apposer un filigrane discret sur des PDF et images, sans compromettre la confidentialité.",
    privacyTitle: "Confidentialité & sécurité",
    privacyPoints: [
      "Traitement local : tout se passe dans votre navigateur, sans serveur.",
      "Aucun stockage : vos fichiers ne sont jamais enregistrés.",
      "Zéro transfert : aucune donnée n'est envoyée à un service externe.",
    ],
    techTitle: "Technos clés",
    techPoints: [
      "Next.js + TypeScript pour l'interface.",
      "pdf-lib pour le watermark vectoriel des PDF.",
      "Canvas pour l'aperçu et les images.",
    ],
    limitsTitle: "Limites connues",
    limits: "Les très gros fichiers peuvent être lents selon la mémoire disponible dans le navigateur.",
    backHome: "Retour à l'accueil",
    languageLabel: "Langue",
  },
  en: {
    title: "About",
    introTitle: "Why this project?",
    intro: "Watermark is a simple tool to add a subtle watermark to PDFs and images without compromising privacy.",
    privacyTitle: "Privacy & security",
    privacyPoints: [
      "Local processing: everything runs in your browser, no server required.",
      "No storage: your files are never saved.",
      "No transfers: no data is sent to any external service.",
    ],
    techTitle: "Core tech",
    techPoints: [
      "Next.js + TypeScript for the UI.",
      "pdf-lib for vector PDF watermarking.",
      "Canvas for previews and images.",
    ],
    limitsTitle: "Known limitations",
    limits: "Very large files may feel slow depending on available browser memory.",
    backHome: "Back to home",
    languageLabel: "Language",
  },
};

export default function AboutPage() {
  const { locale, setLocale, t: ui } = useLocale();
  const t = content[locale];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <HeaderBar t={ui} locale={locale} onChangeLocale={setLocale} />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">{t.title}</h1>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 space-y-8 dark:bg-slate-900 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.introTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300">{t.intro}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.privacyTitle}</h2>
            <ul className="list-disc pl-5 text-slate-600 space-y-1 dark:text-slate-300">
              {t.privacyPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.techTitle}</h2>
            <ul className="list-disc pl-5 text-slate-600 space-y-1 dark:text-slate-300">
              {t.techPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.limitsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300">{t.limits}</p>
          </div>
        </div>

        <div className="mt-8">
          <a href="/" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors dark:text-indigo-300 dark:hover:text-indigo-200">
            ← {t.backHome}
          </a>
        </div>
      </section>

      <FooterBar t={ui} />
    </main>
  );
}
