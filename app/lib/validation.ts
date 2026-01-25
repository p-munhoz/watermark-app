export type ValidationError = {
  fileName: string;
  reason: string;
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function validateFiles(files: File[]): ValidationError[] {
  const errors: ValidationError[] = [];
  
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      errors.push({
        fileName: file.name,
        reason: `Too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max: 50MB`,
      });
    }
    if (file.size === 0) {
      errors.push({ fileName: file.name, reason: "File is empty" });
    }
  });
  
  return errors;
}

export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 1) return `${errors[0].fileName}: ${errors[0].reason}`;
  return `${errors.length} files: ${errors.map(e => e.fileName).join(", ")}`;
}