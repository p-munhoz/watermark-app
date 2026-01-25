import { useState, useCallback } from "react";

export type ErrorType = {
  message: string;
  type: "error" | "warning" | "info";
  timestamp: number;
};

export function useErrorHandler() {
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const addError = useCallback((message: string, type: ErrorType["type"] = "error") => {
    const error: ErrorType = { message, type, timestamp: Date.now() };
    setErrors((prev) => [...prev, error]);
    setTimeout(() => {
      setErrors((prev) => prev.filter((e) => e.timestamp !== error.timestamp));
    }, 5000);
  }, []);

  const clearError = useCallback((timestamp: number) => {
    setErrors((prev) => prev.filter((e) => e.timestamp !== timestamp));
  }, []);

  return { errors, addError, clearError };
}