import type { WatermarkSettings } from "../types";
import type * as PdfLib from "pdf-lib";

let pdfLib: typeof PdfLib | null = null;

async function getPdfLib() {
  if (pdfLib) return pdfLib;
  pdfLib = await import("pdf-lib");
  return pdfLib;
}

function hexToRgb01(hexColor: string) {
  const clean = hexColor.trim();
  if (!/^#([0-9a-fA-F]{6})$/.test(clean)) {
    return { r: 0.5, g: 0.5, b: 0.5 };
  }
  const hex = clean.slice(1);
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return { r, g, b };
}

/**
 * Vector watermark on the original PDF.
 * - keeps text searchable/selectable
 * - small file size
 *
 * Matches canvas behavior:
 * - repeated tiling
 * - centered text at each tile point
 * - rotation around the tile point
 */
export async function addVectorWatermarkToPdf(pdfFile: File, settings: WatermarkSettings): Promise<Blob> {
  const { PDFDocument, rgb, degrees, StandardFonts } = await getPdfLib();
  const bytes = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const angle = (settings.rotation * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  for (const page of pages) {
    const { width, height } = page.getSize();

    const textWidth = font.widthOfTextAtSize(settings.text, settings.fontSize);
    const { r, g, b } = hexToRgb01(settings.color);

    // Same idea as canvas:
    // xSpacing = textWidth + horizontalSpacing
    // ySpacing = fontSize + verticalSpacing
    const stepX = textWidth + settings.horizontalSpacing;
    const stepY = settings.fontSize + settings.verticalSpacing;

    // Cover area slightly beyond page bounds so rotation still fills edges
    const startX = -width;
    const endX = width * 2;
    const startY = -height;
    const endY = height * 2;

    for (let x = startX; x < endX; x += stepX) {
      for (let y = startY; y < endY; y += stepY) {
        if (settings.waveEffect) {
          const chars = settings.text.split("");
          let currentX = -textWidth / 2;

          chars.forEach((char, index) => {
            const charWidth = font.widthOfTextAtSize(char, settings.fontSize);
            const localX = currentX + charWidth / 2;
            const waveOffset = Math.sin(index * 0.5 + x * 0.01) * settings.waveAmplitude;

            const rotatedX = localX * cos - waveOffset * sin;
            const rotatedY = localX * sin + waveOffset * cos;

            page.drawText(char, {
              x: x + rotatedX - charWidth / 2,
              y: y + rotatedY - settings.fontSize / 2,
              size: settings.fontSize,
              font,
              color: rgb(r, g, b),
              rotate: degrees(settings.rotation),
              opacity: settings.opacity,
            });

            currentX += charWidth;
          });
        } else {
          // Center the text on (x, y), like canvas textAlign="center" & textBaseline="middle"
          page.drawText(settings.text, {
            x: x - textWidth / 2,
            y: y - settings.fontSize / 2,
            size: settings.fontSize,
            font,
            color: rgb(r, g, b),
            rotate: degrees(settings.rotation),
            opacity: settings.opacity,
          });
        }
      }
    }
  }

  const out = await pdfDoc.save();
  // pdf-lib returns a Uint8Array<ArrayBufferLike>; cast the buffer to ArrayBuffer for Blob compatibility
  return new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
}
