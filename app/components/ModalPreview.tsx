"use client";

import { useHotkeys } from "../hooks/useHotkeys";
import type { PreviewItem } from "../lib/types";

type Props = {
  open: boolean;
  items: PreviewItem[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  strings: {
    close: string;
    closeTitle: string;
    prev: string;
    next: string;
    prevTitle: string;
    nextTitle: string;
    scrollHint: string;
    imageAlt: string;
  };
};

export function ModalPreview({ open, items, selectedIndex, onClose, onPrev, onNext, strings }: Props) {
  const current = items[selectedIndex];

  useHotkeys(
    {
      Escape: onClose,
      ArrowLeft: onPrev,
      ArrowRight: onNext,
    },
    open
  );

  if (!open || !current?.previewWithWatermarkUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col" onClick={onClose}>
      <div className="flex justify-between items-center p-4">
        <span className="text-white text-sm">
          {current.file.name} ({selectedIndex + 1}/{items.length})
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
          aria-label={strings.close}
          title={strings.closeTitle}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-center min-h-full">
          <img
            src={current.previewWithWatermarkUrl}
            alt={strings.imageAlt}
            className="max-w-full h-auto rounded-lg shadow-2xl"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div className="text-center pb-4">
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-4 mb-2">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label={strings.prev}
              title={strings.prevTitle}
            >
              {strings.prev}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label={strings.next}
              title={strings.nextTitle}
            >
              {strings.next}
            </button>
          </div>
        )}
        <p className="text-white/70 text-sm">{strings.scrollHint}</p>
      </div>
    </div>
  );
}
