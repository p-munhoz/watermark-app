"use client";

type Props = {
  files: File[];
  onRemove: (index: number) => void;
  removeLabel: (name: string) => string;
  removeTitle: string;
};

export function FileList({ files, onRemove, removeLabel, removeTitle }: Props) {
  if (!files.length) return null;

  return (
    <div className="mt-3 sm:mt-4 space-y-2 max-h-48 overflow-y-auto overflow-x-hidden">
      {files.map((file, index) => (
        <div 
          key={index} 
          className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 min-w-0 dark:bg-slate-900 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-indigo-900/60">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-slate-700 truncate dark:text-slate-200">
                {file.name}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            className="text-slate-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
            aria-label={removeLabel(file.name)}
            title={removeTitle}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}