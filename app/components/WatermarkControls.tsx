"use client";

import type { WatermarkSettings } from "../lib/types";

type Props = {
  settings: WatermarkSettings;
  onChange: (next: WatermarkSettings) => void;
  canMergePdfs: boolean;
  mergePDFs: boolean;
  onToggleMerge: () => void;
  labels: {
    title: string;
    text: string;
    textPlaceholder: string;
    opacity: string;
    color: string;
    size: string;
    rotation: string;
    spacingH: string;
    spacingV: string;
    wave: string;
    waveAmplitude: string;
    merge: string;
    mergeHint: string;
  };
};

export function WatermarkControls({ settings, onChange, canMergePdfs, mergePDFs, onToggleMerge, labels }: Props) {
  const set = (patch: Partial<WatermarkSettings>) => onChange({ ...settings, ...patch });

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/50 p-4 sm:p-6 md:p-8 dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4 md:mb-6 dark:text-slate-100">{labels.title}</h2>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">{labels.text}</label>
          <input
            type="text"
            value={settings.text}
            onChange={(e) => set({ text: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            placeholder={labels.textPlaceholder}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">
            {labels.opacity}: <span className="text-indigo-600 font-semibold dark:text-indigo-300">{Math.round(settings.opacity * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.opacity}
            onChange={(e) => set({ opacity: parseFloat(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">{labels.color}</label>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="color"
              value={settings.color}
              onChange={(e) => set({ color: e.target.value })}
              className="h-9 w-10 sm:h-10 sm:w-12 cursor-pointer rounded-lg border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-800"
              aria-label="Choisir la couleur du filigrane"
            />
            <input
              type="text"
              value={settings.color}
              onChange={(e) => set({ color: e.target.value })}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              placeholder="#808080"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">
            {labels.size}: <span className="text-indigo-600 font-semibold dark:text-indigo-300">{settings.fontSize}px</span>
          </label>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={settings.fontSize}
            onChange={(e) => set({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">
            {labels.rotation}: <span className="text-indigo-600 font-semibold dark:text-indigo-300">{settings.rotation}°</span>
          </label>
          <input
            type="range"
            min="-90"
            max="90"
            step="5"
            value={settings.rotation}
            onChange={(e) => set({ rotation: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">
            {labels.spacingH}: <span className="text-indigo-600 font-semibold dark:text-indigo-300">{settings.horizontalSpacing}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={settings.horizontalSpacing}
            onChange={(e) => set({ horizontalSpacing: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">
            {labels.spacingV}: <span className="text-indigo-600 font-semibold dark:text-indigo-300">{settings.verticalSpacing}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={settings.verticalSpacing}
            onChange={(e) => set({ verticalSpacing: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
          />
        </div>

        <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">{labels.wave}</label>
            <button
              onClick={() => set({ waveEffect: !settings.waveEffect })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.waveEffect ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
              aria-label="Activer/désactiver l'effet ondulé"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.waveEffect ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {settings.waveEffect && (
            <div className="mt-3 sm:mt-4">
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 dark:text-slate-200">
                {labels.waveAmplitude}: <span className="text-indigo-600 font-semibold dark:text-indigo-300">{settings.waveAmplitude}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                value={settings.waveAmplitude}
                onChange={(e) => set({ waveAmplitude: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-700"
              />
            </div>
          )}
        </div>

        {canMergePdfs && (
          <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">{labels.merge}</label>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1 dark:text-slate-400">{labels.mergeHint}</p>
              </div>
              <button
                onClick={onToggleMerge}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  mergePDFs ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                }`}
                aria-label="Activer/désactiver la fusion des PDFs"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    mergePDFs ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}