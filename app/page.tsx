"use client";

import { useErrorHandler } from "./hooks/useErrorHandler";
import { Toast } from "./components/Toast";
import { validateFiles, formatValidationErrors } from "./lib/validation";
import {
  saveSettingsToStorage,
  loadSettingsFromStorage,
} from "./lib/settingsStorage";
import { useEffect, useMemo, useRef, useState } from "react";

import { Dropzone } from "./components/Dropzone";
import { FileList } from "./components/FileList";
import { WatermarkControls } from "./components/WatermarkControls";
import { PreviewPane } from "./components/PreviewPane";
import { ModalPreview } from "./components/ModalPreview";
import { HeaderBar } from "./components/HeaderBar";
import { FooterBar } from "./components/FooterBar";

import type { PreviewItem, WatermarkSettings } from "./lib/types";
import { renderPdfFirstPageToBlobUrl } from "./lib/pdf/previewFirstPage";
import { generateWatermarkedPreviewBlobUrl } from "./lib/watermark/imagePreview";
import { addVectorWatermarkToPdf } from "./lib/watermark/pdfVector";
import { downloadBlob, sleep } from "./lib/download";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { defaultLocale, defaultWatermarkText } from "./lib/i18n";
import { useLocale } from "./providers/LocaleProvider";

export default function Home() {
  const { locale, setLocale, t } = useLocale();

  const [files, setFiles] = useState<File[]>([]);
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mergePDFs, setMergePDFs] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [settings, setSettings] = useState<WatermarkSettings>({
    text: defaultWatermarkText[defaultLocale],
    opacity: 0.3,
    fontSize: 48,
    rotation: 45,
    color: "#808080",
    waveEffect: false,
    waveAmplitude: 10,
    horizontalSpacing: 100,
    verticalSpacing: 150,
  });

  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const pdfLibRef = useRef<null | typeof import("pdf-lib")>(null);

  // Load persisted settings on mount
  useEffect(() => {
    const stored = loadSettingsFromStorage();
    if (stored) {
      setSettings(stored);
    }
    setSettingsLoaded(true);
  }, []);

  // Persist settings after the initial load
  useEffect(() => {
    if (settingsLoaded) {
      saveSettingsToStorage(settings);
    }
  }, [settings, settingsLoaded]);

  const { errors, addError, clearError } = useErrorHandler();

  // Debounce settings to avoid expensive redraw on every slider tick
  const debouncedSettings = useDebouncedValue(settings, 200);

  // To cancel stale preview renders
  const renderSeq = useRef(0);
  const prevLocale = useRef(locale);

  const revokeItemUrls = (item: PreviewItem) => {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    if (item.previewWithWatermarkUrl)
      URL.revokeObjectURL(item.previewWithWatermarkUrl);
  };

  const canMergePdfs = useMemo(
    () => files.filter((f) => f.type === "application/pdf").length > 1,
    [files],
  );

  // Handle locale changes without overwriting custom text
  useEffect(() => {
    if (!settingsLoaded) return;

    const previous = prevLocale.current;

    // Only update text when the user kept the default value
    if (settings.text === defaultWatermarkText[previous]) {
      setSettings((s) => ({ ...s, text: defaultWatermarkText[locale] }));
    }

    prevLocale.current = locale;
  }, [locale, settings.text, settingsLoaded]);

  // Cleanup object URLs whenever items change and on unmount
  useEffect(() => {
    return () => {
      items.forEach(revokeItemUrls);
    };
  }, [items]);

  const setItemsWithCleanup = (next: PreviewItem[]) => {
    setItems((prev) => {
      prev.forEach(revokeItemUrls);
      return next;
    });
  };

  const onFilesSelected = async (selected: File[]) => {
    const validationErrors = validateFiles(selected);
    if (validationErrors.length > 0) {
      addError(formatValidationErrors(validationErrors), "error");
      const validFiles = selected.filter(
        (file) => !validationErrors.some((err) => err.fileName === file.name),
      );
      if (validFiles.length === 0) return;
      selected = validFiles;
    }
    const filtered = selected.filter(
      (f) => f.type === "application/pdf" || f.type.startsWith("image/"),
    );
    if (!filtered.length) return;

    setFiles(filtered);
    setLoadingPreview(true);
    setSelectedIndex(0);

    const next: PreviewItem[] = [];

    try {
      for (const file of filtered) {
        const isPdf = file.type === "application/pdf";

        const previewUrl = isPdf
          ? await renderPdfFirstPageToBlobUrl(file, 2)
          : URL.createObjectURL(file);

        next.push({
          file,
          previewUrl,
          previewWithWatermarkUrl: "",
          isPdf,
        });
      }

      setItemsWithCleanup(next);
    } catch (error) {
      console.error(error);
      addError(t.processingError, "error");
    } finally {
      setLoadingPreview(false);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newItems = items.filter((_, i) => i !== index);

    const removed = items[index];
    if (removed) revokeItemUrls(removed);

    setFiles(newFiles);
    setItems(newItems);
    setSelectedIndex((prev) =>
      Math.max(0, Math.min(prev, newItems.length - 1)),
    );
  };

  // Re-generate watermark previews (debounced + cancellable)
  useEffect(() => {
    if (!items.length) return;

    const seq = ++renderSeq.current;
    let cancelled = false;

    const run = async () => {
      setLoadingPreview(true);
      try {
        const updated = await Promise.all(
          items.map(async (it) => {
            // revoke previous watermarked preview url
            if (it.previewWithWatermarkUrl)
              URL.revokeObjectURL(it.previewWithWatermarkUrl);

            if (it.isPdf) {
              const watermarkedBlob = await addVectorWatermarkToPdf(
                it.file,
                debouncedSettings,
              );
              const url = await renderPdfFirstPageToBlobUrl(watermarkedBlob, 2);
              return { ...it, previewWithWatermarkUrl: url };
            }

            const url = await generateWatermarkedPreviewBlobUrl(
              it.previewUrl,
              it.file,
              debouncedSettings,
            );
            return { ...it, previewWithWatermarkUrl: url };
          }),
        );

        if (cancelled) return;
        if (renderSeq.current !== seq) return; // ignore stale

        setItems(updated);
      } catch (error) {
        console.error(error);
        if (!cancelled && renderSeq.current === seq) {
          addError(t.previewError, "error");
        }
      } finally {
        if (!cancelled && renderSeq.current === seq) setLoadingPreview(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSettings, items.length, locale]);

  const loadPdfLib = async () => {
    if (pdfLibRef.current) return pdfLibRef.current;
    pdfLibRef.current = await import("pdf-lib");
    return pdfLibRef.current;
  };

  const handleDownload = async () => {
    if (!files.length) return;

    setProcessing(true);
    setProgress(null);

    try {
      const { PDFDocument } = await loadPdfLib();
      const pdfFiles = files.filter((f) => f.type === "application/pdf");

      // Merge PDFs (vector watermark per file, then merge)
      if (mergePDFs && pdfFiles.length > 1) {
        setProgress({ current: 0, total: pdfFiles.length });

        const merged = await PDFDocument.create();

        for (let i = 0; i < pdfFiles.length; i++) {
          const pdfFile = pdfFiles[i];
          setProgress({ current: i + 1, total: pdfFiles.length });

          const watermarkedBlob = await addVectorWatermarkToPdf(
            pdfFile,
            settings,
          );
          const arr = await watermarkedBlob.arrayBuffer();
          const doc = await PDFDocument.load(arr);

          const copied = await merged.copyPages(doc, doc.getPageIndices());
          copied.forEach((p) => merged.addPage(p));
        }

        const out = await merged.save();
        downloadBlob(
          new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }),
          "watermarked-merged.pdf",
        );

        addError(t.mergedSuccess, "info");
        return;
      }

      // Otherwise download each file (PDF vector + images via canvas)
      const total = files.length;
      setProgress({ current: 0, total });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress({ current: i + 1, total });

        if (file.type === "application/pdf") {
          const blob = await addVectorWatermarkToPdf(file, settings);
          downloadBlob(blob, `watermarked-${file.name}`);
        } else if (file.type.startsWith("image/")) {
          // Use existing preview pipeline to generate a final watermarked image:
          // build from object URL of original file (avoids base64)
          const src = URL.createObjectURL(file);
          const watermarkedUrl = await generateWatermarkedPreviewBlobUrl(
            src,
            file,
            settings,
          );
          URL.revokeObjectURL(src);

          const res = await fetch(watermarkedUrl);
          const blob = await res.blob();
          URL.revokeObjectURL(watermarkedUrl);

          downloadBlob(blob, `watermarked-${file.name}`);
        }

        // avoid browser blocking multiple downloads
        await sleep(100);
      }

      addError(t.downloadSuccess(files.length), "info");
    } catch (e) {
      console.error(e);
      addError(t.processingError, "error");
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  };

  const headerDownloadLabel = useMemo(() => {
    const pdfCount = files.filter((f) => f.type === "application/pdf").length;
    if (mergePDFs && pdfCount > 1) return t.downloadMerged;
    if (files.length > 1) return t.downloadMultiple(files.length);
    return t.downloadSingle;
  }, [files, mergePDFs, t]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Toast errors={errors} onClose={clearError} />

      {/* Header */}
      <HeaderBar t={t} locale={locale} onChangeLocale={setLocale} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 md:py-12">
        {/* Privacy Banner */}
        <div className="mb-6 sm:mb-10 md:mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm dark:from-slate-900 dark:to-slate-900 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center dark:bg-green-900/40">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-2 dark:text-green-100">
                {t.privacyTitle}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-green-800 dark:text-green-200">
                {t.privacyItems.map((item) => (
                  <li key={item.strong} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0 dark:bg-green-400"></span>
                    <span className="min-w-0">
                      <strong>{item.strong} :</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/50 p-4 sm:p-6 md:p-8 dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4 md:mb-6 dark:text-slate-100">
                {t.step1Title}
              </h2>

              <Dropzone
                onFilesSelected={onFilesSelected}
                disabled={processing}
                label={t.dropzoneLabel}
                subLabel={t.dropzoneSubLabel}
                dropHereLabel={t.dropzoneDropHere}
                selectedLabel={t.dropzoneSelected}
                ariaLabel={t.dropzoneAria}
                currentCount={files.length}
              />

              <FileList
                files={files}
                onRemove={removeFile}
                removeLabel={t.fileRemoveLabel}
                removeTitle={t.fileRemoveTitle}
              />
            </div>

            <WatermarkControls
              settings={settings}
              onChange={setSettings}
              canMergePdfs={canMergePdfs}
              mergePDFs={mergePDFs}
              onToggleMerge={() => setMergePDFs((v) => !v)}
              labels={{
                title: t.controlsTitle,
                text: t.controlsTextLabel,
                textPlaceholder: t.controlsTextPlaceholder,
                opacity: t.controlsOpacityLabel,
                color: t.controlsColorLabel,
                size: t.controlsSizeLabel,
                rotation: t.controlsRotationLabel,
                spacingH: t.controlsSpacingHLabel,
                spacingV: t.controlsSpacingVLabel,
                wave: t.controlsWaveLabel,
                waveAmplitude: t.controlsWaveAmplitudeLabel,
                merge: t.mergeLabel,
                mergeHint: t.mergeHint,
              }}
            />

            <button
              onClick={handleDownload}
              disabled={!files.length || processing}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-400 dark:hover:to-blue-400 text-sm sm:text-base"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t.processing}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {headerDownloadLabel}
                </span>
              )}
            </button>

            {progress && (
              <div className="text-xs sm:text-sm text-slate-600 text-center dark:text-slate-300">
                {t.progress(progress.current, progress.total)}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="min-w-0">
            <PreviewPane
              items={items}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onOpenModal={() => setIsModalOpen(true)}
              loading={loadingPreview}
              strings={{
                title: t.previewTitle,
                loading: t.previewLoading,
                emptyTitle: t.previewEmptyTitle,
                emptySubtitle: t.previewEmptySubtitle,
                clickToZoom: t.previewClickToZoom,
                page1: t.previewPage1,
                thumbAria: t.previewThumbAria,
                thumbAlt: t.previewThumbAlt,
                imageAlt: t.previewImageAlt,
              }}
            />
          </div>
        </div>
      </div>

      <ModalPreview
        open={isModalOpen}
        items={items}
        selectedIndex={selectedIndex}
        onClose={() => setIsModalOpen(false)}
        onPrev={() =>
          setSelectedIndex((p) => (p > 0 ? p - 1 : items.length - 1))
        }
        onNext={() =>
          setSelectedIndex((p) => (p < items.length - 1 ? p + 1 : 0))
        }
        strings={{
          close: t.modalClose,
          closeTitle: t.modalCloseTitle,
          prev: t.modalPrev,
          next: t.modalNext,
          prevTitle: t.modalPrevTitle,
          nextTitle: t.modalNextTitle,
          scrollHint: t.modalScrollHint,
          imageAlt: t.previewImageAlt,
        }}
      />

      {/* Footer */}
      <FooterBar t={t} />
    </main>
  );
}
