export type WatermarkSettings = {
  text: string;
  opacity: number;        // 0..1
  fontSize: number;       // px
  rotation: number;       // degrees
  color: string;          // hex color, e.g. #808080
  horizontalSpacing: number;
  verticalSpacing: number;
  waveEffect: boolean;
  waveAmplitude: number;
};

export type PreviewItem = {
  file: File;
  previewUrl: string;              // blob/object URL for display (original)
  previewWithWatermarkUrl: string; // blob/object URL for display (watermarked)
  isPdf: boolean;
};
