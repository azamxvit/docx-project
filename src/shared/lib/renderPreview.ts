export function renderPreview(file: File): string {
  return `Файл: ${file.name} (${Math.round(file.size / 1024)} KB)`;
}