"use client";

import type { PreviewItem } from "../lib/types";

type Props = {
  items: PreviewItem[];
  selectedIndex: number;
  onSelect: (i: number) => void;
  onOpenModal: () => void;
  loading: boolean;
  strings: {
    title: string;
    loading: string;
    emptyTitle: string;
    emptySubtitle: string;
    clickToZoom: string;
    page1: string;
    thumbAria: (index: number) => string;
    thumbAlt: (index: number) => string;
    imageAlt: string;
  };
};

export function PreviewPane({ items, selectedIndex, onSelect, onOpenModal, loading, strings }: Props) {
  const current = items[selectedIndex];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200/50 p-4 sm:p-6 md:p-8 dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">{strings.title}</h2>
        {items.length > 0 && (
          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{selectedIndex + 1} / {items.length}</span>
        )}
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 sm:p-6 md:p-8 min-h-[280px] sm:min-h-[360px] md:min-h-[480px] lg:min-h-[600px] flex items-center justify-center bg-slate-50 relative overflow-hidden dark:border-slate-700 dark:bg-slate-900">
        {loading ? (
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base text-slate-600 font-medium dark:text-slate-300">{strings.loading}</p>
          </div>
        ) : current?.previewWithWatermarkUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={current.previewWithWatermarkUrl}
              alt={strings.imageAlt}
              className="max-w-full max-h-[240px] sm:max-h-[320px] md:max-h-[420px] lg:max-h-[550px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
              onClick={onOpenModal}
            />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {strings.clickToZoom}
            </div>
            {current.isPdf && (
              <div className="absolute top-2 left-2 bg-red-500/80 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full">
                {strings.page1}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 dark:bg-slate-800">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-300">{strings.emptyTitle}</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 dark:text-slate-400">{strings.emptySubtitle}</p>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-3 sm:mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => onSelect(index)}
                className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg border-2 overflow-hidden transition-all ${
                  selectedIndex === index ? "border-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-900" : "border-slate-300 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-400"
                }`}
                aria-label={strings.thumbAria(index)}
                title={item.file.name}
              >
                <img src={item.previewUrl} alt={strings.thumbAlt(index)} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}