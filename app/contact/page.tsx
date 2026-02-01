"use client";

import { HeaderBar } from "../components/HeaderBar";
import { FooterBar } from "../components/FooterBar";
import { useLocale } from "../providers/LocaleProvider";
import type { Locale } from "../lib/i18n";

const content: Record<Locale, {
  title: string;
  intro: string;
  contactTitle: string;
  contactItems: string[];
  contactEmailLabel: string;
  privacyTitle: string;
  privacyText: string;
  responseTitle: string;
  responseText: string;
  backHome: string;
  languageLabel: string;
}> = {
  fr: {
    title: "Contact",
    intro: "Une question, un bug, ou une idée d'amélioration ?",
    contactTitle: "Nous contacter",
    contactItems: [
      "Décrivez le problème et joignez un exemple si possible.",
      "Indiquez votre navigateur et votre OS (Chrome/Firefox/Safari/Edge).",
      "Précisez si le fichier est un PDF ou une image et sa taille.",
    ],
    contactEmailLabel: "Par email :",
    privacyTitle: "Confidentialité",
    privacyText: "Merci de ne jamais envoyer de documents sensibles : nous ne collectons pas les fichiers, mais un exemple anonymisé aide à diagnostiquer.",
    responseTitle: "Délai de réponse",
    responseText: "Nous faisons de notre mieux pour répondre rapidement, selon la disponibilité.",
    backHome: "Retour à l'accueil",
    languageLabel: "Langue",
  },
  en: {
    title: "Contact",
    intro: "Have a question, a bug report, or an improvement idea?",
    contactTitle: "Get in touch",
    contactItems: [
      "Describe the issue and attach a minimal example if possible.",
      "Include your browser and OS (Chrome/Firefox/Safari/Edge).",
      "Specify whether the file is a PDF or an image and its size.",
    ],
    contactEmailLabel: "By email:",
    privacyTitle: "Privacy",
    privacyText: "Please never share sensitive documents: we don't collect files, but a sanitized example helps debugging.",
    responseTitle: "Response time",
    responseText: "We'll do our best to reply quickly depending on availability.",
    backHome: "Back to home",
    languageLabel: "Language",
  },
};

export default function ContactPage() {
  const { locale, setLocale, t: ui } = useLocale();
  const t = content[locale];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <HeaderBar t={ui} locale={locale} onChangeLocale={setLocale} />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-3 dark:text-slate-100">{t.title}</h1>
        <p className="text-slate-600 mb-8 dark:text-slate-300">{t.intro}</p>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 space-y-8 dark:bg-slate-900 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.contactTitle}</h2>
            <ul className="list-disc pl-5 text-slate-600 space-y-1 dark:text-slate-300">
              {t.contactItems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-4 text-slate-700 dark:text-slate-200">
              {t.contactEmailLabel}{" "}
              <a
                href="mailto:pierre.munhoz@gmail.com"
                className="text-indigo-600 font-semibold hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200"
              >
                pierre.munhoz@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.privacyTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300">{t.privacyText}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 dark:text-slate-100">{t.responseTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300">{t.responseText}</p>
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
