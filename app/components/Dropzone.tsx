"use client";

import { useState } from "react";

type Props = {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  disabled?: boolean;
  label: string;
  subLabel: string;
  dropHereLabel: string;
  selectedLabel: (count: number) => string;
  ariaLabel: string;
  currentCount: number;
};

export function Dropzone({
  onFilesSelected,
  accept = ".pdf,.png,.jpg,.jpeg",
  disabled,
  label,
  subLabel,
  dropHereLabel,
  selectedLabel,
  ariaLabel,
  currentCount,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const pickFiles = async () => {
    if (disabled) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = true;

    input.onchange = () => {
      const selected = Array.from(input.files || []);
      if (selected.length) onFilesSelected(selected);
      // ensure re-select same file triggers
      input.value = "";
    };

    input.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const dropped = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf" || f.type.startsWith("image/")
    );
    if (dropped.length) onFilesSelected(dropped);
  };

  return (
    <div
      onClick={pickFiles}
      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
      onDrop={handleDrop}
      className={`w-full border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer ${
        currentCount > 0 
          ? "p-4 sm:p-6" 
          : "p-6 sm:p-8 md:p-10 lg:p-12"
      } ${
        isDragging
          ? "border-indigo-500 bg-indigo-50 scale-105 dark:bg-indigo-900/30"
          : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:border-indigo-400 dark:bg-slate-900/50"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      role="button"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div className="text-center pointer-events-none">
        <div
          className={`rounded-2xl flex items-center justify-center mx-auto transition-all ${
            currentCount > 0
              ? "w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3"
              : "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4"
          } ${
            isDragging ? "bg-indigo-200 scale-110 dark:bg-indigo-800" : "bg-indigo-100 dark:bg-indigo-900/60"
          }`}
        >
          <svg className={`text-indigo-600 dark:text-indigo-300 ${
            currentCount > 0 ? "w-5 h-5 sm:w-6 sm:h-6" : "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium mb-1">
          {currentCount > 0
            ? selectedLabel(currentCount)
            : isDragging
              ? dropHereLabel
              : label}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{subLabel}</p>
      </div>
    </div>
  );
}