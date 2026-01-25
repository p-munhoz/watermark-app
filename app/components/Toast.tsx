"use client";
import type { ErrorType } from "../hooks/useErrorHandler";

type Props = {
  errors: ErrorType[];
  onClose: (timestamp: number) => void;
};

export function Toast({ errors, onClose }: Props) {
  if (!errors.length) return null;

  const getColors = (type: ErrorType["type"]) => {
    switch (type) {
      case "error": return "bg-red-50 border-red-200 text-red-600";
      case "warning": return "bg-yellow-50 border-yellow-200 text-yellow-600";
      case "info": return "bg-blue-50 border-blue-200 text-blue-600";
    }
  };

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 space-y-2 max-w-md sm:max-w-md">
      {errors.map((error) => (
        <div
          key={error.timestamp}
          className={`${getColors(error.type)} border rounded-lg p-3 sm:p-4 shadow-lg animate-slide-in-right flex items-start gap-2 sm:gap-3`}
        >
          <p className="text-xs sm:text-sm text-slate-800 flex-1 break-words">{error.message}</p>
          <button 
            onClick={() => onClose(error.timestamp)} 
            className="text-slate-400 hover:text-slate-600 flex-shrink-0"
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