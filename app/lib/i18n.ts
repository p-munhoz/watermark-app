export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "en";
export const localeStorageKey = "watermark-locale";

export const defaultWatermarkText: Record<Locale, string> = {
  fr: "Filigrane",
  en: "Watermark",
};

type PrivacyItem = { strong: string; text: string };

export type Messages = {
  appName: string;
  appSubtitle: string;
  privateBadge: string;
  languageLabel: string;
  privacyTitle: string;
  privacyItems: PrivacyItem[];
  step1Title: string;
  step2Title: string;
  dropzoneLabel: string;
  dropzoneSubLabel: string;
  dropzoneAria: string;
  dropzoneDropHere: string;
  dropzoneSelected: (count: number) => string;
  downloadMerged: string;
  downloadMultiple: (count: number) => string;
  downloadSingle: string;
  processing: string;
  progress: (current: number, total: number) => string;
  processingError: string;
  previewError: string;
  mergedSuccess: string;
  downloadSuccess: (count: number) => string;
  controlsTitle: string;
  controlsTextLabel: string;
  controlsTextPlaceholder: string;
  controlsOpacityLabel: string;
  controlsColorLabel: string;
  controlsSizeLabel: string;
  controlsRotationLabel: string;
  controlsSpacingHLabel: string;
  controlsSpacingVLabel: string;
  controlsWaveLabel: string;
  controlsWaveAmplitudeLabel: string;
  mergeLabel: string;
  mergeHint: string;
  previewTitle: string;
  previewLoading: string;
  previewEmptyTitle: string;
  previewEmptySubtitle: string;
  previewClickToZoom: string;
  previewPage1: string;
  previewThumbAria: (index: number) => string;
  previewThumbAlt: (index: number) => string;
  previewImageAlt: string;
  fileRemoveLabel: (name: string) => string;
  fileRemoveTitle: string;
  modalClose: string;
  modalCloseTitle: string;
  modalPrev: string;
  modalNext: string;
  modalPrevTitle: string;
  modalNextTitle: string;
  modalScrollHint: string;
  footerNote: string;
  footerAbout: string;
  footerSource: string;
  footerContact: string;
  footerPrivacy: string;
  footerCookies: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundBack: string;
  errorTitle: string;
  errorHeading: string;
  errorBody: string;
  errorDetailsLabel: string;
  errorRetry: string;
  themeToggle: string;
  themeLight: string;
  themeDark: string;
};

export const messages: Record<Locale, Messages> = {
  fr: {
    appName: "Watermark",
    appSubtitle: "Ajoutez un filigrane à vos documents en toute confidentialité",
    privateBadge: "100% privé",
    languageLabel: "Langue",
    privacyTitle: "Confidentialité garantie",
    privacyItems: [
      { strong: "Aucun stockage", text: "Vos fichiers ne sont jamais enregistrés sur nos serveurs" },
      { strong: "Traitement local", text: "Tout le traitement s'effectue directement dans votre navigateur" },
      { strong: "Zéro transfert", text: "Aucune donnée n'est envoyée à un serveur externe" },
    ],
    step1Title: "1. Sélectionnez votre fichier",
    step2Title: "2. Personnalisez le filigrane",
    dropzoneLabel: "Cliquez ou glissez un ou plusieurs fichiers",
    dropzoneSubLabel: "PDF, PNG, JPG • Multi-sélection possible",
    dropzoneAria: "Zone de dépôt de fichiers",
    dropzoneDropHere: "Déposez vos fichiers ici",
    dropzoneSelected: (count) =>
      `${count} fichier${count > 1 ? "s" : ""} sélectionné${count > 1 ? "s" : ""}`,
    downloadMerged: "Télécharger PDF fusionné",
    downloadMultiple: (count) => `Télécharger ${count} fichiers`,
    downloadSingle: "Télécharger avec filigrane",
    processing: "Traitement...",
    progress: (current, total) => `Progression : ${current} / ${total}`,
    processingError: "Erreur lors du traitement. Fichier peut-être trop volumineux ou corrompu ?",
    previewError: "Erreur lors de la génération des aperçus",
    mergedSuccess: "PDF fusionné téléchargé avec succès !",
    downloadSuccess: (count) =>
      `${count} fichier${count > 1 ? "s" : ""} téléchargé${count > 1 ? "s" : ""} !`,
    controlsTitle: "2. Personnalisez le filigrane",
    controlsTextLabel: "Texte du filigrane",
    controlsTextPlaceholder: "Votre texte ici...",
    controlsOpacityLabel: "Opacité",
    controlsColorLabel: "Couleur du texte",
    controlsSizeLabel: "Taille du texte",
    controlsRotationLabel: "Rotation",
    controlsSpacingHLabel: "Espacement horizontal",
    controlsSpacingVLabel: "Espacement vertical",
    controlsWaveLabel: "Effet ondulé (aperçu/images)",
    controlsWaveAmplitudeLabel: "Amplitude",
    mergeLabel: "Fusionner les PDFs",
    mergeHint: "Créer un seul PDF avec tous les documents",
    previewTitle: "Aperçu",
    previewLoading: "Chargement...",
    previewEmptyTitle: "Aucun fichier sélectionné",
    previewEmptySubtitle: "Importez un ou plusieurs fichiers pour voir l'aperçu",
    previewClickToZoom: "Cliquer pour agrandir",
    previewPage1: "Aperçu : page 1",
    previewThumbAria: (index) => `Voir aperçu ${index + 1}`,
    previewThumbAlt: (index) => `Aperçu ${index + 1}`,
    previewImageAlt: "Aperçu avec filigrane",
    fileRemoveLabel: (name) => `Supprimer ${name}`,
    fileRemoveTitle: "Supprimer",
    modalClose: "Fermer",
    modalCloseTitle: "Fermer (Esc)",
    modalPrev: "← Précédent",
    modalNext: "Suivant →",
    modalPrevTitle: "Précédent (←)",
    modalNextTitle: "Suivant (→)",
    modalScrollHint: "Scroll pour voir l'image complète • Esc pour fermer",
    footerNote: "© 2025 Watermark Tool - Open source & privacy-first",
    footerAbout: "À propos",
    footerSource: "Code source",
    footerContact: "Contact",
    footerPrivacy: "Confidentialité",
    footerCookies: "Préférences cookies",
    notFoundTitle: "Page introuvable",
    notFoundBody: "Le lien est peut-être incorrect ou la page a été déplacée. Revenez à l'accueil ou utilisez la navigation.",
    notFoundBack: "Retour à l'accueil",
    errorTitle: "Une erreur est survenue",
    errorHeading: "Oups !",
    errorBody: "Une erreur inattendue s'est produite. Vous pouvez réessayer ou revenir à l'accueil.",
    errorDetailsLabel: "Détails",
    errorRetry: "Réessayer",
    themeToggle: "Thème",
    themeLight: "Clair",
    themeDark: "Sombre",
  },
  en: {
    appName: "Watermark",
    appSubtitle: "Add a watermark to your documents with complete privacy",
    privateBadge: "100% private",
    languageLabel: "Language",
    privacyTitle: "Privacy guaranteed",
    privacyItems: [
      { strong: "No storage", text: "Your files are never saved on our servers" },
      { strong: "Local processing", text: "All processing happens directly in your browser" },
      { strong: "No transfers", text: "No data is sent to any external server" },
    ],
    step1Title: "1. Select your file",
    step2Title: "2. Customize the watermark",
    dropzoneLabel: "Click or drag one or more files",
    dropzoneSubLabel: "PDF, PNG, JPG • Multi-select supported",
    dropzoneAria: "File dropzone",
    dropzoneDropHere: "Drop your files here",
    dropzoneSelected: (count) => `${count} file${count > 1 ? "s" : ""} selected`,
    downloadMerged: "Download merged PDF",
    downloadMultiple: (count) => `Download ${count} files`,
    downloadSingle: "Download with watermark",
    processing: "Processing...",
    progress: (current, total) => `Progress: ${current} / ${total}`,
    processingError: "Processing error. File may be too large or corrupted.",
    previewError: "Error generating previews",
    mergedSuccess: "Merged PDF downloaded successfully!",
    downloadSuccess: (count) => `${count} file${count > 1 ? "s" : ""} downloaded!`,
    controlsTitle: "2. Customize the watermark",
    controlsTextLabel: "Watermark text",
    controlsTextPlaceholder: "Your text here...",
    controlsOpacityLabel: "Opacity",
    controlsColorLabel: "Text color",
    controlsSizeLabel: "Text size",
    controlsRotationLabel: "Rotation",
    controlsSpacingHLabel: "Horizontal spacing",
    controlsSpacingVLabel: "Vertical spacing",
    controlsWaveLabel: "Wave effect (preview/images)",
    controlsWaveAmplitudeLabel: "Amplitude",
    mergeLabel: "Merge PDFs",
    mergeHint: "Create a single PDF with all documents",
    previewTitle: "Preview",
    previewLoading: "Loading...",
    previewEmptyTitle: "No file selected",
    previewEmptySubtitle: "Import one or more files to see the preview",
    previewClickToZoom: "Click to enlarge",
    previewPage1: "Preview: page 1",
    previewThumbAria: (index) => `View preview ${index + 1}`,
    previewThumbAlt: (index) => `Preview ${index + 1}`,
    previewImageAlt: "Preview with watermark",
    fileRemoveLabel: (name) => `Remove ${name}`,
    fileRemoveTitle: "Remove",
    modalClose: "Close",
    modalCloseTitle: "Close (Esc)",
    modalPrev: "← Previous",
    modalNext: "Next →",
    modalPrevTitle: "Previous (←)",
    modalNextTitle: "Next (→)",
    modalScrollHint: "Scroll to see the full image • Esc to close",
    footerNote: "© 2025 Watermark Tool - Open source & privacy-first",
    footerAbout: "About",
    footerSource: "Source code",
    footerContact: "Contact",
    footerPrivacy: "Privacy",
    footerCookies: "Cookie preferences",
    notFoundTitle: "Page not found",
    notFoundBody: "The link may be incorrect or the page has moved. Go back home or use the navigation.",
    notFoundBack: "Back home",
    errorTitle: "An error occurred",
    errorHeading: "Oops!",
    errorBody: "An unexpected error happened. You can retry or go back home.",
    errorDetailsLabel: "Details",
    errorRetry: "Try again",
    themeToggle: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
  },
};

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(localeStorageKey);
    return raw === "fr" || raw === "en" ? raw : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // ignore write errors (private mode, etc.)
  }
}

// Detect browser-preferred locale on client; fallback to defaultLocale.
export function detectBrowserLocale(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const lang = navigator.language?.toLowerCase() || "";
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("fr")) return "fr";
  return null;
}
