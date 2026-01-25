import type { WatermarkSettings } from "../types";

function applyOpacityToHex(hexColor: string, opacity: number) {
  const clean = hexColor.trim();
  if (!/^#([0-9a-fA-F]{6})$/.test(clean)) {
    return `rgba(128, 128, 128, ${opacity})`;
  }
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${clean}${alpha}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

function drawWatermarkOnCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  settings: WatermarkSettings,
  scaleForPdfPreview: number
) {
  const s = scaleForPdfPreview;

  ctx.font = `${settings.fontSize * s}px Arial`;
  ctx.fillStyle = applyOpacityToHex(settings.color, settings.opacity);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textWidth = ctx.measureText(settings.text).width;
  const xSpacing = textWidth + settings.horizontalSpacing * s;
  const ySpacing = settings.fontSize * s + settings.verticalSpacing * s;

  for (let x = -textWidth; x < canvas.width + textWidth; x += xSpacing) {
    for (let y = -(settings.fontSize * s); y < canvas.height + settings.fontSize * s; y += ySpacing) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((settings.rotation * Math.PI) / 180);

      if (settings.waveEffect) {
        const chars = settings.text.split("");
        let currentX = -ctx.measureText(settings.text).width / 2;

        chars.forEach((char, index) => {
          const charWidth = ctx.measureText(char).width;
          const waveOffset = Math.sin(index * 0.5 + x * 0.01) * (settings.waveAmplitude * s);

          ctx.save();
          ctx.translate(currentX + charWidth / 2, waveOffset);
          ctx.fillText(char, 0, 0);
          ctx.restore();

          currentX += charWidth;
        });
      } else {
        ctx.fillText(settings.text, 0, 0);
      }

      ctx.restore();
    }
  }
}

export async function generateWatermarkedPreviewBlobUrl(inputPreviewUrl: string, file: File, settings: WatermarkSettings) {
  const img = await loadImage(inputPreviewUrl);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create canvas context");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  // PDFs preview are rendered at 2x scale in renderPdfFirstPageToBlobUrl()
  const isPdf = file.type === "application/pdf";
  const scale = isPdf ? 2 : 1;

  drawWatermarkOnCanvas(ctx, canvas, settings, scale);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("canvas.toBlob returned null"))),
      // keep PNG for preview stability
      "image/png"
    );
  });

  return URL.createObjectURL(blob);
}
