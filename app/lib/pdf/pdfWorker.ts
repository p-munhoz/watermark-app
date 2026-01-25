import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker without CDN.
// Works in modern bundlers with ESM worker file.
export function ensurePdfWorkerConfigured() {
  if (typeof window === "undefined") return;
  if (pdfjsLib.GlobalWorkerOptions.workerSrc) return;

  // Always use the locally bundled worker to avoid external network calls.
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

export { pdfjsLib };
