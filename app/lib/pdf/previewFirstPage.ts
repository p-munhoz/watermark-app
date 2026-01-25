import { ensurePdfWorkerConfigured, pdfjsLib } from "./pdfWorker";

export async function renderPdfFirstPageToBlobUrl(pdfFile: Blob, scale = 2): Promise<string> {
  ensurePdfWorkerConfigured();

  const arrayBuffer = await pdfFile.arrayBuffer();
  const typedarray = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument(typedarray).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create canvas context");

  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({ canvasContext: ctx, viewport }).promise;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas.toBlob returned null"))), "image/png");
  });

  return URL.createObjectURL(blob);
}
