import type { WatermarkSettings } from "./types";

const KEY = "watermark-settings";

export function saveSettingsToStorage(settings: WatermarkSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to save settings", e);
  }
}

export function loadSettingsFromStorage(): WatermarkSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn("Failed to load settings", e);
    return null;
  }
}